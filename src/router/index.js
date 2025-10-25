// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './auth.routes'
import HomeView from '@/views/HomeView.vue'
import CatalogoView from '../views/CatalogoView.vue'
import CarritoView from '../views/CarritoView.vue'
import UserView from '../views/UserView.vue'


// Configurar rutas principales
const routes = [
  authRoutes,
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/Catalogue',
    name: 'Catalogue',
    component: CatalogoView
  },
  {
    path: '/Shop',
    name: 'Shopping',
    component: CarritoView
  },
  {
    path: '/UserInfo',
    name: 'User',
    component: UserView
  },
]

// Crear el router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
