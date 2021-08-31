export default function({ $auth }) {
  $auth.onRedirect((to, from) => {
    if (to === '/login' && from === '/' && $auth.loggedIn) {
      return '/';
    }
    if (to === '/' && !$auth.loggedIn) {
      return '/login';
    }
  });
}
