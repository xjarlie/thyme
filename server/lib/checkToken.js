const prisma = require('./prisma');


async function checkToken(token, id) {
    if (!token || !id) {
        return false;
    }
        
    try {

        console.log(id, '198f951e-6ada-40e2-b949-f9faa8a9916c', id === '198f951e-6ada-40e2-b949-f9faa8a9916c');

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        

        if (user && user.authToken === token) {
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
