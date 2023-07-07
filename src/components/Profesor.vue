<template>

    <v-layout align-start>
        <v-flex>
            <v-data-table
            :headers="headers"
            :items="profesores"
            class="mx-auto"
            >
            
            <template v-slot:top>
                <v-toolbar
                flat
                >
                <v-toolbar-title>Profesores</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                    v-model="dialog"
                    max-width="500px"
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
                                v-model="editedItem.fecha_contra"
                                label="Fecha Contr."
                                type="date"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.estado"
                                label="Estado"
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-text-field
                                v-model="editedItem.fecha_fin"
                                label="Fecha Fin"
                                type="date"
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
                postURL: 'http://localhost:5000',
                dialog: false,
                dialogDelete: false,
                headers: [
                {
                    text: 'DNI',
                    align: 'start',
                    value: 'dni',
                },
                { text: 'Nombres', value: 'nombres' },
                { text: 'Apellidos', value: 'apellidos' },
                { text: 'Fecha Nac.', value: 'fecha_nac' },
                { text: 'Fecha Contr.', value: 'fecha_contra' },
                { text: 'Estado', value: 'estado' },
                { text: 'Fecha Fin', value: 'fecha_fin'},
                { text: 'Contraseña', value: 'contra',show:false},
                { text: 'Acciones', value: 'actions', sortable: false },
                ],
                profesores: [],
                editedIndex: -1,
                editedItem: {
                dni: '',
                nombres: '',
                apellidos: '',
                fecha_nac: '',
                fecha_contra: '',
                estado: '',
                fecha_fin: '',
                contra: '',
                },
                defaultItem: {
                dni: '',
                nombres: '',
                apellidos: '',
                fecha_nac: '',
                fecha_contra: '',
                estado: '',
                fecha_fin: '',
                contra: '',
                },
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
                axios.post(this.postURL + '/profesores').then((res) => {  
                    console.log(res.data);
                    this.profesores = res.data;            
                })
                .catch((error) => {
                    console.log(error)
                })
                },

                editItem (item) {
                this.editedIndex = this.profesores.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
                },

                deleteItem (item) {
                this.editedIndex = this.profesores.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
                },

                deleteItemConfirm () {
                    var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }          
                    axios.post(this.postURL + '/delete_profesor', this.editedItem,{config_request})
                        .then(res => {                      
                            console.log(res.data);
                            
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                    this.profesores.splice(this.editedIndex, 1)
                
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

                save () {
                if (this.editedIndex > -1) {
                    var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                    axios.patch(this.postURL + '/update_profesor', this.editedItem, { config_request })
                    .then(res => {                                         
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                    Object.assign(this.profesores[this.editedIndex], this.editedItem)
                    this.editedItem = Object.assign({}, this.defaultItem)
                } else {
                    var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                    axios.put(this.postURL + '/create_profesor', this.editedItem, { config_request })
                        .then(res => {                                         
                            console.log(res.data);

                        })
                        .catch((error) => {
                            console.log(error)
                        });
                    
        
                    this.profesores.push(this.editedItem)
                    
                    this.editedItem = Object.assign({}, this.defaultItem)
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