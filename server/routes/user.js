const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { checkToken } = require('../lib/checkToken');

router.get('/:userID/details', async (req, res) => {

    const { requestedUserID } = req.params;
    const { AUTH_TOKEN: token, AUTH_ID: userID } = req.cookies;
    if (requestedUserID !== userID || !(await checkToken(token, userID))) {
        res.status(401).json({error: {message: 'Incorrect credentials'}});
    }

    try {

        const user = prisma.user.findUnique({
            where: {
                id: userID
            }
        });

        const data = { email: user.email, name: user.name };

        res.status(200).json({result: data});
        await prisma.$disconnect();

    } catch (e) {
        console.log(e);
        res.status(400).json({error: e});
        await prisma.$disconnect();
        return false;
    }

});

module.exports = router;