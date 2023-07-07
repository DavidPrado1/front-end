<template>
    
    <v-layout align-start>
        
        <v-flex>
            <v-text-field
                v-model="test.dni"
                label="DNI Estudiante"
            ></v-text-field>
            <v-autocomplete
                v-model="test.semestre"
                label="Semestre"
                :items="semestres"
                dense
                filled
            ></v-autocomplete>
            <v-btn
                olor="primary"
                dark
                class="mb-2"
                v-on="on"
                @click="cargarTabla()"
                >
                Filtrar por DNI
            </v-btn>

            <v-divider></v-divider>
            
            <template>
            
            <v-row>
                <v-col>
                    <v-sheet height="64">
                    <v-toolbar
                    flat
                    >
                    <v-btn
                        outlined
                        class="mr-4"
                        color="grey darken-2"
                        @click="setToday"
                    >
                        Today
                    </v-btn>
                    <v-btn
                        fab
                        text
                        small
                        color="grey darken-2"
                        @click="prev"
                    >
                        <v-icon small>
                        arrow_back_ios
                        </v-icon>
                    </v-btn>
                    <v-btn
                        fab
                        text
                        small
                        color="grey darken-2"
                        @click="next"
                    >
                        <v-icon small>
                        arrow_forward_ios
                        
                        </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                </v-sheet>
                <v-sheet height="400">
                    <v-calendar
                    ref="calendar"
                    v-model="focus"
                    :events="events"
                    color="primary"
                    type="week"
                    @change="fetchEvents"
                    ></v-calendar>
                </v-sheet>
                </v-col>
            </v-row>
            </template>
        </v-flex>
    </v-layout>
</template>
    
    <script>
    import axios from 'axios'
    export default{    
        data(){ 
            return { 
                focus: '',
                test:{},
                events: [],
                postURL: 'http://localhost:5000',
            }
        },
        mounted () {
            this.$refs.calendar.scrollToTime('08:00')
            this.$refs.calendar.checkChange()
        },
        

        created () {
            this.initialize()
        },
        methods:{
            setToday () {
                this.focus = ''
            },
            prev () {
                this.$refs.calendar.prev()
            },
            next () {
                this.$refs.calendar.next()
            },
        
            initialize () {
                axios.post(this.postURL + '/semestres').then((res) => {  
                    console.log(res.data);
                    this.semestres = res.data;            
                })
                .catch((error) => {
                    console.log(error)
                })

                },
            
            cargarTabla () {
                var config_request={
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }  
                axios.post(this.postURL + '/estudiante_horario',this.test,{config_request}).then((res) => {  
                    console.log(res.data);
                    this.events = res.data;            
                })
                .catch((error) => {
                    console.log(error)
                })
            },
        },

    
    }
    </script>
    
    <style>
        .tasks{
            background-color: #cccccc;
        }
    </style>