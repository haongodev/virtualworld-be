
function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/management';
const API = '/api/backend';
  
export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    movies: path(ROOTS_DASHBOARD, '/movies')
};
export const PATH_AUTH = {
  login:path(ROOTS_DASHBOARD, '/authenticate'),
}
  