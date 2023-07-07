import Vue from 'vue'
import Router from 'vue-router'
import Estudiante from '../components/Estudiante.vue'
import Profesor from '../components/Profesor.vue'
import Curso from '../components/Curso.vue'
import Abandono from '../components/Abandono.vue'
import Matriculados from '../components/Matriculados.vue'
import Retirados from '../components/Retirados.vue'
import Semestre from '../components/Semestre.vue'
import Asistencia from '../components/Asistencia.vue'
import Horario from '../components/Horario.vue'
import Participaciones from '../components/Participaciones.vue'
import Login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/asistencia',
      name: 'Asistencia',
      component: Asistencia,
      meta: { requiresAuth: true } 
    },
    {
      path: '/abandono',
      name: 'Abandono',
      component: Abandono,
      meta: { requiresAuth: true } 
    },

    {
      path: '/matriculados',
      name: 'Matriculados',
      component: Matriculados,
      meta: { requiresAuth: true } 
    },
    {
      path: '/retirados',
      name: 'Retirados',
      component: Retirados,
      meta: { requiresAuth: true } 
    },
    {
      path: '/semestre',
      name: 'Semestre',
      component: Semestre,
      meta: { requiresAuth: true } 
    },
    {
      path: '/estudiante',
      name: 'Estudiante',
      component: Estudiante,
      meta: { requiresAuth: true } 
    },
    {
      path: '/profesor',
      name: 'Profesor',
      component: Profesor,
      meta: { requiresAuth: true } 
    },
    
    {
      path: '/curso',
      name: 'Curso',
      component: Curso,
      meta: { requiresAuth: true } 
    },
    {
      path: '/horario',
      name: 'Horario',
      component: Horario,
      meta: { requiresAuth: true } 
    },
    {
      path: '/participaciones',
      name: 'Participaciones',
      component: Participaciones,
      meta: { requiresAuth: true } 
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    
  ]
})


