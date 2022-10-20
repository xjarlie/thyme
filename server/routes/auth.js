const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const crypto = require('crypto');
const { checkToken } = require("../lib/checkToken");

const cookieOptions = { secure: true, httpOnly: false, maxAge: 5184000000 /* 60 days */, sameSite: 'none' };

router.post('/signup', async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ error: { message: 'Need all fields' } })
        return false;
    }

    const authToken = generateAuthToken();
    const { hashed, salt } = hashData(password);

    try {
        const data = { name, email, password: hashed, salt, authToken: authToken.token, tokenExpires: authToken.expires };

        const pushedData = await prisma.user.create({
            data: data
        });

        res.status(200).cookie('AUTH_TOKEN', authToken.token, cookieOptions).cookie('AUTH_ID', pushedData.id, cookieOptions).json({ result: { name: pushedData.name, email: pushedData.email } });
        await prisma.$disconnect();
        return true;
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
        await prisma.$disconnect();
        return false;
    }
})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: { message: 'Need all fields' } });
        return false;
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        const hashedPassword = hashData(password, user.salt);

        if (user.password === hashedPassword.hashed) {

            const newToken = generateAuthToken();

            const updateUser = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    authToken: newToken.token,
                    tokenExpires: newToken.expires
                }
            });

            res.status(200).cookie('AUTH_TOKEN', newToken.token, cookieOptions).cookie('AUTH_ID', user.id, cookieOptions).json({ result: { name: user.name, email: user.email } });
            await prisma.$disconnect();
            return true;
        }

    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
        await prisma.$disconnect();
        return false;
    }

});

router.get('/checktoken', async (req, res) => {
    const { AUTH_TOKEN: token, AUTH_ID: id } = req.cookies;
    console.log('checking token');

    if (token && id && await checkToken(token, id)) {
        res.status(200).json({ result: true});
        return true;
    } else {
        res.status(200).json({ result: false });
        return false;

    }
});

function hashData(string, salt) {
    let salto = salt || crypto.randomBytes(16).toString('hex');
    const hashed = crypto.pbkdf2Sync(string, salto, 1000, 64, 'sha512').toString('hex');
    return { hashed, salt: salto };
}

function generateAuthToken(lasts = 2592000000 /* 30 days */) {
    const tokenData = crypto.randomBytes(64).toString('hex');
    const expires = Date.now() + lasts;
    return { token: tokenData, expires };
}

module.exports = router;