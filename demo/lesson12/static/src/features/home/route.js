import { User } from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    {
      path: 'default-page',
      name: 'Default page',
      component: User,
      isIndex: true,
    },
    { path: 'user', name: 'User', component: User },
  ],
};
