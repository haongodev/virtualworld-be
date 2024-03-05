// import { matchPath } from 'react-router-dom';

// ----------------------------------------------------------------------

export { default as NavSectionVertical } from './Vertical';
export { default as NavSectionHorizontal } from './Horizontal';

export function isExternalLink(path) {
  return path.includes('http');
}

export function getActive(path, pathname) {
  return pathname === path;
}
