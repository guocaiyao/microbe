import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Submission from '@/components/Submission'
import Introduction from '@/components/Introduction'
import Browser from '@/components/Browser'
import Services from '@/components/Services'
import Search from '@/components/Search'
import Tool from '@/components/Tool'

Vue.use(Router)
export default new Router({
  routes: [ 
    {
      path: '/',
      redirect:'/home'
    },{
      path: '/home', 
      name: 'Home',
      component: Home
    },{ 
      path: '/search',
      name: 'Search',
      component: Search
    },{ 
      path: '/browser',
      name: 'Browser',
      component: Browser
    },{ 
      path: '/tool',
      name: 'Tool',
      component: Tool
    },{ 
      path: '/services',
      name: 'Services',
      component: Services
    },{ 
      path: '/submission',
      name: 'Submission',
      component: Submission
    },{ 
      path: '/introduction',
      name: 'Introduction',
      component: Introduction
    }
  ]
})
