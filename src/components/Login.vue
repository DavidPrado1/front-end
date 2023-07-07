<template>
    <v-container class="fill-height">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="headline">Inicio de sesión</v-card-title>
            <v-card-text>
              <v-form @submit="login">
                <v-text-field v-model="dni" label="dni"></v-text-field>
                <v-text-field v-model="password" label="Contraseña" type="password"></v-text-field>
                <v-btn type="submit" color="primary">Iniciar sesión</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  
  
  <script>
  export default {
    data() {
      return {
        dni: '',
        password: '',
      };
    },
  
    
  
    methods: {
      login() { //funcion para loguearse
        if (this.dni === 'admin' && this.password === 'admin') {
          // Guardar informacio de usuario
          const usuario = {
            dni: this.dni,
            password: this.password,
            rol: 'usuario'
          };
  
          // Guardar información de autenticación en cookies
          document.cookie = 'authenticated=true';
          document.cookie = 'usuario=' + JSON.stringify(usuario);
  
          // Redireccion
          this.$router.push('/');
        } 
        else {
          // mostrar alerta si no existe usuario o contraseña incorrecta
          alert('Usuario o contraseña erronea');
        }
      },
  
        setCookie(name, value) {
          const date = new Date();
          date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // Dar tiempo de expiracion al toekn
          const expires = 'expires=' + date.toUTCString();
          document.cookie = name + '=' + value + ';' + expires + ';path=/';
        }
  
    },
  
  };
  </script>