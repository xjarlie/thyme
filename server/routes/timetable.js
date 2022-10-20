const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const checkToken = require('../lib/checkToken');

router.get('/:timetableID', async (req, res) => {

    const {AUTH_TOKEN: token, AUTH_ID: id} = req.cookies;
    const {timetableID} = req.params;

    if (!token || !id || !(await checkToken(token, id))) {
        res.status(401).json({error: {message: 'Incorrect credentials'}});
        return false;
    }

    try {

        const timetable = prisma.timetable.findUnique({
            where: {
                id: timetableID
            }
        });

        if (timetable.userID !== id) {
            res.status(401).json({error: {message: 'Unauthorized'}});
            return false;    
        }

        res.status(200).json({result: { message: 'Success', timetable: timetable }});
        await prisma.$disconnect();
        
    } catch (e) {
        console.log(e);
        res.status(400).json({error: e});
        await prisma.$disconnect();
        return false;
    }

});

module.exports = router;