const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { checkToken } = require('../lib/checkToken');

router.get('/details', async (req, res) => {

    const { AUTH_TOKEN: token, AUTH_ID: userID } = req.cookies;
    if (!(await checkToken(token, userID))) {
        res.status(401).json({error: {message: 'Incorrect credentials'}});
        return false;
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userID
            }
        });

        const data = { email: user.email, name: user.name };

        res.status(200).json({result: data});
        await prisma.$disconnect();
        return true;
    } catch (e) {
        console.log(e);
        res.status(400).json({error: e});
        await prisma.$disconnect();
        return false;
    }

});

module.exports = router;