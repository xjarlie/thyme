import { global } from './global';

async function post(path, data) {
    const response = await fetch(`${global.serverAddr}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });
    return { status: response.status, json: await response.json() };
}

async function get(path) {
    const response = await fetch(`${global.serverAddr}/${path}`, {
        credentials: 'include'
    });
    return { status: response.status, json: await response.json() };
}

export { get, post };