<template>

    <v-layout align-start>
        <v-flex>
            <v-data-table
            :headers="headers"
            :items="estudiantes"
            class="mx-auto"
            >
            <template v-slot:top>
                <v-toolbar
                flat
                >
                <v-toolbar-title>estudiantes</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="dialog"
                    max-width="650px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        Ingresar nueva entrada
                    </v-btn>
                    </template>
                    <v-card>
                    <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
        
                    <v-card-text>
                        <v-container>
                        <v-row>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.dni"
                                label="DNI"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.nombres"
                                label="Nombres"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.apellidos"
                                label="Apellidos"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.fecha_nac"
                                label="Fecha Nac."
                                type="date"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.a_ingreso"
                                label="Fecha Ingreso"
                                type="date"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-autocomplete
                                v-model="editedItem.carrera"
                                :items="carreras"
                                dense
                                filled
                                label="Carrera"
                            ></v-autocomplete>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.correo"
                                label="Email"
                                type="email"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.contra"
                                label="Contraseña"
                                type="password"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-file-input
                            accept="image/*"
                            label="Foto"
                            prepend-icon="face"
                            v-model="imgface"
                            ></v-file-input>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-card-text>
        
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                        >
                        Cancel
                        </v-btn>
                        <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                        >
                        Save
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
                >
                mode_edit
                </v-icon>
                <v-icon
                small
                @click="deleteItem(item)"
                >
                delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn
                color="primary"
                @click="initialize"
                >
                Reset
                </v-btn>
            </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
    
    <script>
    import axios from 'axios'
    export default{    
        data(){ 
            return { 
                test:{},
                postURL2: 'http://localhost:5002',
                postURL: 'http://localhost:5000',
                
                dialog: false,
                dialogDelete: false,
                imgface: '',
                carreras: ['Ing. Software', 'Adm. Empresas', 'Ing. Comercial', 'Derecho'],
                imgface: "",
                headers: [
                {
                    text: 'DNI',
                    align: 'start',
                    value: 'dni',
                },
                { text: 'Nombres', value: 'nombres' },
                { text: 'Apellidos', value: 'apellidos' },
                { text: 'Fecha Nac.', value: 'fecha_nac' },
                { text: 'Fecha Ingreso.', value: 'a_ingreso' },
                { text: 'Carrera', value: 'carrera' },
                { text: 'Correo', value: 'correo'},
                
                { text: 'Acciones', value: 'actions', sortable: false },
                ],
                estudiantes: [],
                editedIndex: -1,
                editedItem: {
                dni: '',
                nombres: '',
                apellidos: '',
                fecha_nac: '',
                a_ingreso: '',
                estado:'',
                carrera: '',
                correo: '',
                contra: '',
                },
                defaultItem: {
                dni: '',
                nombres: '',
                apellidos: '',
                fecha_nac: '',
                a_ingreso: '',
                estado:'cursando',
                carrera: '',
                correo: '',
                contra: '',
                },
                vectorcarac:'',
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },

        watch: {
            dialog (val) {
            val || this.close()
            },
            dialogDelete (val) {
            val || this.closeDelete()
            },
        },

        created () {
            this.initialize()
        },
        methods:{
            
            initialize () {
                axios.post(this.postURL + '/estudiantes').then((res) => {  
                    console.log(res.data);
                    this.estudiantes = res.data;            
                })
                .catch((error) => {
                    console.log(error)
                })
                },

                editItem (item) {
                this.editedIndex = this.estudiantes.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.editedItem.estado = 'cursando'
                this.dialog = true
                },

                deleteItem (item) {
                this.editedIndex = this.estudiantes.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
                },

                deleteItemConfirm () {
                    var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }          
                    axios.post(this.postURL + '/delete_estudiante', this.editedItem,{config_request})
                        .then(res => {                      
                            console.log(res.data);
                            
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                    this.estudiantes.splice(this.editedIndex, 1)
                
                this.closeDelete()
                },

                close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
                },
                closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
                },
                async save () {
                if (this.editedIndex > -1) {
                    var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                    axios.patch(this.postURL + '/update_estudiante', this.editedItem, { config_request })
                    .then(res => {                                         
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                    Object.assign(this.estudiantes[this.editedIndex], this.editedItem)
                    this.editedItem = Object.assign({}, this.defaultItem)
                } else {
                    var formData = new FormData();
                    formData.append("file", this.imgface);
                    formData.append("dni", this.editedItem.dni);
                    console.log(this.imgface)
                    var config_request2={
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                    for (let step = 0; step < 2; step++) {
                        if(step==0){
                            await axios.post(this.postURL2 + '/upload_photo', formData,{ config_request2 })
                            .then(res => {                                         
                                console.log(res.data);
                                this.vectorcarac = res.data;
                            })
                            .catch((error) => {
                                console.log(error)
                            });
                            this.editedItem.estado = this.vectorcarac
                        } else{
                            axios.put(this.postURL + '/create_estudiante', this.editedItem, { config_request })
                                .then(res2 => {                                         
                                    console.log(res2.data);
                                    
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                    });
                            this.estudiantes.push(this.editedItem)        
                            this.editedItem = Object.assign({}, this.defaultItem)
                        }
                    }
                }
                this.close()
                },
        },

    
    }
    </script>
    
    <style>
        .tasks{
            background-color: #cccccc;
        }
    </style>