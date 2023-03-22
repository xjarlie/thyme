const global = {};

const devAddr = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_SERVER_PORT || 4000}`;
global.serverAddr = process.env.NODE_ENV !== 'production' ? devAddr : '';

global.refreshSeed = Math.random();
global.refresh = () => { global.refreshSeed = Math.random() };


export { global };