import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import signin from '@/components/account/signin'
import signup from '@/components/account/signup'
import edit from '@/components/account/edit'
import channel from '@/components/channel/channel'
import store from '@/store/index'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: '/:channel_id',
          name: 'channel',
          component: channel
        },
        {
          path: '/edit',
          name: 'edit',
          component: edit
        }
      ],
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      name: 'signup',
      path: '/signup',
      component: signup
    }
  ]
})


router.beforeEach((to, from, next) => {
    if(to.name != 'signin' && to.name != 'signup' && ! store.getters['account/isConnected']) {
      console.log(to.name)
      next({name: 'signin'})
    }
    else if(to.name == 'signin' && store.getters['account/isConnected']) {
      console.log("test test test")
      next({name: 'home'})
    }
    else {
      next()
    }
  })
