const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const authCheck = require('../lib/authCheck');

router.use(authCheck);

router.get('/:userTimetableIndex', async (req, res) => {

    const { userTimetableIndex } = req.params;
    const id = req.userID;


    try {
        //rs
        // let timetable = await prisma.timetable.findUnique({
        //     where: {
        //         id: user.timetables[0].id
        //     }
        // });

        let timetable;

        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                timetables: {
                    include: {
                        subjects: true,
                        weeks: {
                            orderBy: {
                                number: 'asc'
                            },
                            include: {
                                events: {
                                    orderBy: {
                                        startTime: 'asc'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        timetable = user.timetables[userTimetableIndex];

        if (!timetable) {
            timetable = await prisma.timetable.create({
                data: {
                    weeks: {
                        create: [
                            { number: 0 }
                        ]
                    },
                    user: {
                        connect: {
                            id: id
                        }
                    }
                },
                include: {
                    subjects: true,
                    weeks: {
                        orderBy: {
                            number: 'asc'
                        },
                        include: {
                            events: {
                                orderBy: {
                                    startTime: 'asc'
                                }
                            }
                        }
                    }
                }
            });
        }

        if (timetable.userID !== id) {
            res.status(401).json({ error: { message: 'Unauthorized' } });
            return false;
        }

        res.json({ result: { message: 'Success', timetable: timetable } });
        await prisma.$disconnect();
        return true;
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
        await prisma.$disconnect();
        return false;
    }

});

router.post('/:userTimetableIndex/events', async (req, res) => {

    const { userTimetableIndex } = req.params;
    const id = req.userID;
    const eventData = req.body;

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                timetables: {
                    include: {
                        subjects: true,
                        weeks: true
                    }
                }
            }
        });
        const timetable = user.timetables[userTimetableIndex];

        if (!(timetable.subjects && timetable.subjects.some(e => e.lowerCaseName === eventData.subject.toLowerCase()))) {
            const subject = await prisma.subject.create({
                data: {
                    name: eventData.subject,
                    lowerCaseName: eventData.subject.toLowerCase(),
                    color: eventData.color,
                    user: {
                        connect: {
                            id: id
                        }
                    },
                    timetable: {
                        connect: {
                            id: timetable.id
                        }
                    }
                }
            });
            console.log('creating subject', subject);
        }

        const event = await prisma.event.create({
            data: {
                day: eventData.day,
                startTime: eventData.startTime,
                endTime: eventData.endTime,
                room: eventData.room,
                subject: {
                    connect: {
                        userID_lowerCaseName: {
                            userID: id,
                            lowerCaseName: eventData.subject.toLowerCase()
                        }
                    }
                },
                week: {
                    connect: {
                        id: timetable.weeks[0].id
                    }
                }
            },
        });

        res.json({ result: { message: 'Success', event: event } });
        await prisma.$disconnect();
        return true;

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
        await prisma.$disconnect();
        return false;
    }

});

router.post('/:userTimetableIndex/events/:eventID/edit', async (req, res) => {

    console.log('here');
    const { userTimetableIndex, eventID } = req.params;
    const id = req.userID;
    const { event: updated } = req.body;
    console.log(req.body);


    try {

        const event = await prisma.event.findUnique({
            where: {
                id: eventID
            },
            include: {
                week: {
                    include: {
                        timetable: true
                    }
                }
            }
        });

        if (event.week.timetable.userID !== id) {
            console.log('Unauthorised event edit');
            res.status(401).json({ error: 'Unauthorised' });
            await prisma.$disconnect();
            return false;
        }

        // TODO: Check new subject and link, or create if doesn't exist:

        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                timetables: {
                    include: {
                        subjects: true,
                        weeks: true
                    }
                }
            }
        });

        const timetable = user.timetables[userTimetableIndex];
        const subjectID = updated.subject.trim().toLowerCase();

        let subject = await prisma.subject.findUnique({
            where: {
                userID_lowerCaseName: {
                    userID: id,
                    lowerCaseName: subjectID
                }
            }
        });

        if (!(timetable.subjects && timetable.subjects.some(e => e.lowerCaseName === subjectID))) {
            subject = await prisma.subject.create({
                data: {
                    name: updated.subject,
                    lowerCaseName: subjectID,
                    color: updated.color,
                    user: {
                        connect: {
                            id: id
                        }
                    },
                    timetable: {
                        connect: {
                            id: timetable.id
                        }
                    }
                }
            });
            console.log('creating subject', subject);
        }

        console.log(event, updated);

        const updateEvent = await prisma.event.update({
            where: {
                id: eventID
            },
            data: {
                ...updated,
                subject: {
                    connect: {
                        id: subject.id
                    }
                },
                week: {
                    connect: {
                        id: timetable.weeks[0].id
                    }
                }
            }
        });

        console.log(updateEvent);
        res.status(200).json({ result: updateEvent });
        await prisma.$disconnect();
        return true;

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
        await prisma.$disconnect();
        return false;
    }

})

router.delete('/:userTimetableIndex/events/:eventID', async (req, res) => {

    const { userTimetableIndex, eventID } = req.params;
    const id = req.userID;

    try {

        // const deleteEvent = prisma.event.delete({
        //     where: {
        //         id: eventID
        //     }
        // });

        const event = prisma.event.findUnique({
            where: {
                id: eventID
            },
            include: {
                week: {
                    include: {
                        timetable: true
                    }
                }
            }
        });

        if (!event) {
            res.status(404).json({ result: { message: 'Not found' } });
            await prisma.$disconnect();
            return false;
        }

        console.log(event.week.timetable.userID);

        res.status(200).json({ result: { message: 'Success', eventID: eventID } });
        await prisma.$disconnect();
        return true;

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
        await prisma.$disconnect();
        return false;
    }

});

function randomColor() {
    return `#${(Math.round(Math.random() * 16777215)).toString(16)}`;
}

module.exports = router;