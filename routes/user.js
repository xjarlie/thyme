const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const { checkToken } = require('../lib/checkToken');
const authCheck = require('../lib/authCheck');

router.use(authCheck);

router.get('/details', async (req, res) => {

    const { userID } = req;

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