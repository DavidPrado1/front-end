<template>
  <v-app id="app">
    
      <v-navigation-drawer 
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Sistema Academico
            </v-list-item-title>
            <v-list-item-subtitle>
              Construccion de Software
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
        <v-btn icon @click="logout">
          <v-icon>mdi-close</v-icon>
          Logout
        </v-btn>
      </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-container fluid fill-height>

            <router-view/>

        </v-container>
      </v-content>
      <v-footer padless>
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-footer>
    
    
    
    
  </v-app>
</template>

<script>



export default {
    name: "App",

    data () {
      return {
        items: [
          { title: 'Profesor', icon: 'mdi-view-dashboard',link:'/profesor' },
          { title: 'Alumnos', icon: 'mdi-image',link:'/estudiante' },
          { title: 'Cursos', icon: 'mdi-help-box' ,link:'/curso'},
          { title: 'Semestre', icon: 'mdi-help-box' ,link:'/semestre'},
          { title: 'Retirados', icon: 'mdi-help-box' ,link:'/retirados'},
          { title: 'Matriculados', icon: 'mdi-help-box' ,link:'/matriculados'},
          { title: 'Abandono', icon: 'mdi-help-box' ,link:'/abandono'},
          { title: 'Asistencia', icon: 'mdi-help-box' ,link:'/asistencia'},
          { title: 'Horario', icon: 'mdi-help-box' ,link:'/horario'},
          { title: 'Participaciones', icon: 'mdi-help-box' ,link:'/participaciones'},
        ],
        right: null,
      }
    },
    methods: {
      logout() {
      // Limpiar cookies de autenticación
      document.cookie = 'authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Redirigir al inicio de sesión
      this.$router.push('/login');
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
