export function isProtectedRoute(path) {
  return path === '/missions' || /^\/missions\/[^/]+$/.test(path);
}

export function redirectForAuth(path, authenticated) {
  return isProtectedRoute(path) && !authenticated ? '/login' : null;
}
