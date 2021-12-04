import Vue from 'vue';
import Router from 'vue-router';
import analytics from '@/firebase/analytics'; // src以下に設置してある自作部分のfirebase用ライブラリ

import Search from '@/views/Search.vue';
import Favorite from '@/views/Favorite.vue';
import About from '@/views/About.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', redirect: '/search' },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ],
  scrollBehavior() {
    return {x: 0, y: 0};
  }
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  analytics.screenView(to.path);
  window.scrollTo(0, 0);
});

export default router;