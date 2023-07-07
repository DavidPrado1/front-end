<template>
    <div class='container'>
        <div class="card">
            <div clas="card-header">
                Profesores
            </div>
            <div class="card-body">
                <form v-on:submit='addTask'>
                    <div class="form-group">
                      <label for="dni">DNI</label>
                      <input type="text"
                        class="form-control" v-model='newProfesor.dni' name="dni" id="dni" placeholder="dni">
 
                    </div>
                    <div class="form-group">
                      <label for="nombres">Nombres</label>
                      <input type="text"
                        class="form-control" v-model='newProfesor.nombres' name="nombres" id="nombres"  placeholder="nombres">

                    </div>
                    <div class="form-group">
                      <label for="apellidos">Apellidos</label>
                      <input type="text"
                        class="form-control" v-model='newProfesor.apellidos' name="apellidos" id="apellidos"  placeholder="apellidos">

                    </div>
                    <div class="form-group">
                      <label for="fecha_nac">Fecha Nacimiento</label>
                      <input type="date"
                        class="form-control" v-model='newProfesor.fecha_nac' name="fecha_nac" id="fecha_nac"  placeholder="fecha_nac">
 
                    </div>
                    <div class="form-group">
                      <label for="fecha_contra">Fecha Contratacion</label>
                      <input type="date"
                        class="form-control" v-model='newProfesor.fecha_contra' name="fecha_contra" id="fecha_contra" placeholder="fecha_contra">

                    </div>
                    <div class="form-group">
                      <label for="estado">Estado</label>
                      <input type="text"
                        class="form-control" v-model='newProfesor.estado' name="estado" id="estado"  placeholder="estado">

                    </div>
                    <div class="form-group">
                      <label for="fecha_fin">Fecha Termino</label>
                      <input type="date"
                        class="form-control" v-model='newProfesor.fecha_fin' placeHolder='fecha_fin' name="fecha_fin" id="fecha_fin">

                    </div>
                    <div class="form-group">
                      <label for="contra">Contraseña </label>
                      <input type="text"
                        class="form-control" v-model='newProfesor.contra' name="contra" id="contra"  placeholder="contra">

                    </div>
                    <div class = "btn-group" role = "group" aria-label="">
                        <button type="submit" class="btn btn-success">Crear</button>
                        <a class="btn btn-outline-danger" href="#/read" role="button" >Cancelar</a>
                    </div>                
                </form>
            </div>
        </div>
        
    </div>
    </template>
    
    <script>
    import axios from 'axios'
    export default{    
        data(){ 
            return { 
                newProfesor: {},
                postURL: 'http://localhost:5000'
                
            }
        },
        methods:{
            addTask(e){            
                e.preventDefault(); // cancela el comportamiento por defecto, en este caso evitar que se vuelva a cargar la pagina luego del submit
                var config_request={
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
                // with vue-resources            
                /*this.$http.post(this.postURL + '/create_task', this.newTask, config_request)
                    .then(res => {
                        this.tasks.push(res.body);                    
                    }, res => {
                        console.error(res.body);
                    });  */
    
                // with axios
                axios.put(this.postURL + '/create_profesor', this.newProfesor, { config_request })
                    .then(res => {                                         
                        console.log(res.data);
                        window.location.href="#/read"
                    })
                    .catch((error) => {
                        console.log(error)
                    });
    
                this.newTask = {};
            },
            deleteTask(profesor){  
                var config_request={
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }          
                axios.post(this.postURL + '/delete_profesor', {dni:profesor.dni}, { config_request })
                    .then(res => {                      
                        this.tasks.splice(this.tasks.indexOf(task), 1);
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });  
            }
        },
        
    
    }
    </script>
    
