const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { checkToken } = require('../lib/checkToken');

router.get('/:userTimetableIndex', async (req, res) => {

    const { AUTH_TOKEN: token, AUTH_ID: id } = req.cookies;
    const { userTimetableIndex } = req.params;

    if (!token || !id || !(await checkToken(token, id))) {
        res.status(401).json({ error: { message: 'Incorrect credentials' } });
        return false;
    }

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
                timetables: true
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
                }
            })
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

    const { AUTH_TOKEN: token, AUTH_ID: id } = req.cookies;
    const { userTimetableIndex } = req.params;
    

    if (!token || !id || !(await checkToken(token, id))) {
        res.status(401).json({ error: { message: 'Incorrect credentials' } });
        return false;
    }

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

        console.log(timetable);

        if (!(timetable.subjects && timetable.subjects.some(e => e.id === eventData.subject.toLowerCase()))) {
            const subject = await prisma.subject.create({
                data: {
                    name: eventData.subject,
                    id: eventData.subject.toLowerCase(),
                    color: randomColor(),
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
                        id: eventData.subject.toLowerCase()
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

function randomColor() {
    return `#${(Math.round(Math.random() * 16777215)).toString(16)}`;
}

module.exports = router;