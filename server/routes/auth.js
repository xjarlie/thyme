const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const crypto = require('crypto');

const cookieOptions = { secure: true, httpOnly: true, maxAge: 5184000000 /* 60 days */, sameSite: 'none' };

router.post('/signup', async (req, res) => {

    console.log(req.cookies);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ error: { message: 'Need all fields' } })
        return false;
    }

    const authToken = generateAuthToken();

    const { hashed, salt } = hashData(password);

    try {
        const data = { name, email, password: hashed, salt };
        console.log('DATA HEREEE', data);

        const pushData = async () => {
            return await prisma.user.create({
                data: {
                    ...data, authToken: {
                        create: authToken
                    }
                }
            });
        }

        const pushedData = await pushData();

        console.log(pushedData);
        console.log('AUTH_TOKEN', authToken.token, cookieOptions)
        res.status(200).cookie('AUTH_TOKEN', authToken.token, cookieOptions).json({ result: { name: pushedData.name, email: pushedData.email } });
        await prisma.$disconnect();
        return true;
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e });
        await prisma.$disconnect();
        return false;
    }
});

router.get('/login', async (req, res) => {
    const token = 'b35e23230b04902d110baa91fbf5b099fe5971ecb2a723e5d29b556f10db74073aa13e4873d2e64e3f79e37608f048b0c1caf2126425d254978d5415b7590bc5';
    const result = await getUserIDFromToken(token);

    res.status(200).json(result)
});

router.get('/checktoken', async (req, res) => {
    const { AUTH_TOKEN: token } = req.cookies;

    console.log(token);
    console.log(await getUserIDFromToken(token));
    if (token && await getUserIDFromToken(token)) {
        res.status(200).cookie('AUTH_TOKEN', token, cookieOptions).json({ result: true })
    } else {
        res.status(200).json({ result: false })
    }
});

async function getUserIDFromToken(token) {
    if (!token) return false;

    try {

        const fetchedToken = await prisma.authToken.findUnique({
            where: {
                token: token
            }
        });

        if (!fetchedToken || fetchedToken.expires <= Date.now()) {
            return false;
        }

        const result = await prisma.user.findUnique({
            where: {
                tokenID: fetchedToken.id
            },
            select: {
                id: true
            }
        });

        return result.id
    } catch (e) {
        console.log(e);
        return false;
    }
}

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