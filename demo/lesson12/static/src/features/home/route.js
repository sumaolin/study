import { DefaultPage, User } from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    {
      path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    { path: 'user', name: 'User', component: User },
  ],
};
