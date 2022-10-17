const prisma = require('../lib/prisma');


async function checkToken(token, id) {
    if (!token || !id)
        return false;
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        if (user.authToken === token) {
            return true;
        } else {
            return false;
        }

    } catch (e) {
        console.log('error', e);
        return false;
    }
}
exports.checkToken = checkToken;
