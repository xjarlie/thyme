import { global } from './global';

async function post(path, data) {

    const token = localStorage.getItem('AUTH_TOKEN');
    const id = localStorage.getItem('AUTH_ID');


    try {
        const response = await fetch(`${global.serverAddr}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${id}----${token}`
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
    
        console.log('POSTING', `${global.serverAddr}${path}`);
    
        return { status: response.status, json: await response.json() };
    } catch (e) {
        console.error(e);
        return null;
    }

    
}

async function get(path) {

    const token = localStorage.getItem('AUTH_TOKEN');
    const id = localStorage.getItem('AUTH_ID');

    console.log(path)

    const response = await fetch(`${global.serverAddr}${path}`, {
        credentials: 'include',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${id}----${token}`,
            'Content-Type': 'application/json'
        }
    });

    return { status: response.status, json: await response.json() };
}

export { get, post };