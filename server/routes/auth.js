const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const crypto = require('crypto');

// router.get('/', async (req, res) => {

//     const getUser = async () => {
//         return await prisma.user.findUnique({
//             where: { id: 1 }
//         })
//     };

//     getUser().then(async (user) => {
//         console.log(user);
//         res.status(200).send(user);
//         await prisma.$disconnect();
//     }).catch(async e => {
//         console.log(e);
//         res.status(400).send(e);
//         await prisma.$disconnect();
//     });
// });

const cookieOptions = { secure: true, httpOnly: true, maxAge: 5184000000 /* 60 days */, sameSite: 'none' };

router.post('/signup', async (req, res) => {

    console.log(req.cookies);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({error: {message: 'Need all fields'}})
        return false;
    }

    const authToken = generateAuthToken();

    const { hashed, salt } = hashData(password);

    try {
        const data = { name, email, password: hashed, salt };
        console.log('DATA HEREEE', data);

        const pushData = async () => {
            return await prisma.user.create({data: {...data, authToken: {
                create: authToken
            }}});
        }

        const pushedData = await pushData();

        console.log(pushedData);
        console.log('AUTH_TOKEN', authToken.token, cookieOptions)
        res.status(200).cookie('AUTH_TOKEN', authToken.token, cookieOptions).json({result: {name: pushedData.name, email: pushedData.email}});
        await prisma.$disconnect();
        return true;
    } catch (e) {
        console.log(e);
        res.status(400).json({error: e});
        await prisma.$disconnect();
        return false;
    }

    

    
});

function hashData(string, salt) {
    let salto = salt || crypto.randomBytes(16).toString('hex');
    const hashed = crypto.pbkdf2Sync(string, salto, 1000, 64, 'sha512').toString('hex');
    return { hashed, salt: salto };
}

function generateAuthToken(lasts=2592000000 /* 30 days */) {
    const tokenData = crypto.randomBytes(64).toString('hex');
    const expires = Date.now() + lasts;
    return { token: tokenData, expires };
}

module.exports = router;