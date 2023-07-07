<template>
    
    <v-layout align-start>
        
        <v-flex>
            <v-text-field
                v-model="test.estudiante"
                label="DNI Estudiante"
            ></v-text-field>
            <v-btn
                olor="primary"
                dark
                class="mb-2"
                v-on="on"
                @click="cargarTabla(test)"
                >
                Filtrar por DNI
            </v-btn>

            <v-divider></v-divider>
            <v-data-table
            :headers="headers"
            :items="lista"
            class="mx-auto"
            >
            <template v-slot:top>
                <v-toolbar
                flat
                >
                <v-toolbar-title>Estudiantes Retirados</v-toolbar-title>
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
                                v-model="editedItem.estudiante"
                                label="DNI Estudiante"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.motivo"
                                label="Motivo"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.fecha"
                                label="Fecha"
                                type = "date"
                            ></v-text-field>
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
                postURL: 'http://localhost:5000',
                dialog: false,
                dialogDelete: false,
                test: {},
                carreras: ['Ing. Software', 'Adm. Empresas', 'Ing. Comercial', 'Derecho'],
                imgface: "",
                headers: [
                {
                    text: 'DNI Estudiante',
                    align: 'start',
                    value: 'estudiante',
                },
                { text: 'Motivo', value: 'motivo' },
                { text: 'Fecha', value: 'fecha' },
                { text: 'Acciones', value: 'actions', sortable: false },
                ],
                semestres: [],
                lista: [],
                cursossemestres: [],
                editedIndex: -1,
                editedItem: {
                estudiante: '',
                motivo: '',
                fecha: ''
                },
                defaultItem: {
                estudiante: '',
                motivo: '',
                fecha: ''
                },
                options: []
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
                axios.post(this.postURL + '/estudiantesRetirados').then((res) => {  
                    console.log(res.data);
                    this.lista = res.data;            
                })
                .catch((error) => {
                    console.log(error)
                })

                },

                cargarTabla () {
                this.editedItem.semestre = this.test.semestre;
                var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                }
                    
                axios.post(this.postURL + '/estudianteRetirado',this.test,{config_request}).then((res) => {  
                    console.log(res.data);
                    this.lista = res.data;            
                })
                .catch((error) => {
                    console.log(error)
                })
                },

                editItem (item) {
                this.editedIndex = this.semestres.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                },

                deleteItem (item) {
                this.editedIndex = this.semestres.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
                },

                deleteItemConfirm () {
                    var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }          
                    axios.post(this.postURL + '/delete_cursoDeSemestre', this.editedItem,{config_request})
                        .then(res => {                      
                            console.log(res.data);
                            
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                    this.cursossemestres.splice(this.editedIndex, 1)
                
                this.closeDelete()
                },

                close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedItem.semestre = this.test.semestre;
                    this.editedIndex = -1
                })
                },

                closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedItem.semestre = this.test.semestre;
                    this.editedIndex = -1
                })
                },

                save () {
                if (this.editedIndex > -1) {
                    var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                    axios.patch(this.postURL + '/update_cursoDeSemestre', this.editedItem, { config_request })
                    .then(res => {                                         
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                    Object.assign(this.semestres[this.editedIndex], this.editedItem)
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedItem.semestre = this.test.semestre;
                } else {
                    var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                    axios.put(this.postURL + '/create_estudianteRetirado', this.editedItem, { config_request })
                        .then(res => {                                         
                            console.log(res.data);

                        })
                        .catch((error) => {
                            console.log(error)
                        });
                    
        
                    this.cursossemestres.push(this.editedItem)
                    
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedItem.semestre = this.test.semestre;
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