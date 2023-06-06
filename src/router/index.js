import { createRouter, createWebHistory } from 'vue-router'
import useAuthStore from '../modules/auth/store/useAuthStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: '',
          name: 'auth-login',
          component: () => import('@/modules/auth/views/LoginView.vue')
        }
      ]
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('@/modules/usuarios/layouts/UsuariosLayout.vue'),
      children: [
        {
          path: '',
          name: 'usuarios-listado',
          component: () => import('@/modules/usuarios/views/UsuariosView.vue')
        }
      ]
    },
    {
      path: '/modulos',
      name: 'modulos',
      component: () => import('@/modules/modulos/layouts/ModulosLayout.vue'),
      children: [
        {
          path: '',
          name: 'modulos-listado',
          component: () => import('@/modules/modulos/views/ModulosView.vue')
        },
        {
          path: ':id',
          name: 'modulos-detalle',
          component: () => import('@/modules/modulos/views/DetallesView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if(!authStore.usuarioAutenticado && to.name !== 'auth-login')
    next({ name: 'auth-login' });
  else 
    next();
})

export default router
