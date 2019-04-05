import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () =>
        import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/logout",
      name: "logout",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Logout.vue")
    },
    {
      path: "/profile",
      name: "profile",
    
      component: () =>
        import(/* webpackChunkName: "profile" */ "./views/Profile.vue")
    },
    {
      path: "/library",
      name: "library",
    
      component: () =>
        import(/* webpackChunkName: "library" */ "./views/Library.vue")
    },
    {
      path: "/book/:id",
      component: () =>
        import(/* webpackChunkName: "library" */ "./views/Library.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
