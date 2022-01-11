import Vue from 'vue'
import VueRouter from 'vue-router'
import PackageSearch from '../views/PackageSearch'
import PackageDetails from '../views/PackageDetails'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PackageSearch',
    component: PackageSearch,
    children: [
      {
        path: '/package/:name',
        name: 'PackageDetails',
        component: PackageDetails
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
