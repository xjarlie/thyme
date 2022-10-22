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

module.exports = router;