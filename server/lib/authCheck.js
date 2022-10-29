const { checkToken } = require('./checkToken');

async function authCheck(req, res, next) {
    const { id, token } = parseAuth(req.headers.authorization);

    if (!id  || !token || !(await checkToken(token, id))) {
        
        return res.status(403).json({ error: 'Incorrect credentials' });
    }

    req.userID = id;

    next();
}

function parseAuth(auth) {

    const x = auth?.split('Bearer')[1];
    const token = x?.split('----')[1];
    const id = x?.split('----')[0];

    return {id: id?.trim(), token: token?.trim()};
}

module.exports = authCheck;