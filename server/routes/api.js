const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

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

router.get('/dashboard', (req, res) => {
    res.json({
        data: {
            hello: 'world',
            array: ['lol', 'lmao']
        }
    });
});

module.exports = router;