<template>
    <div class = "web-camera-container">
        <div class="dni-put">
            <v-text-field
                v-model="estudiante.dni"
                label="DNI Estudiante"
            ></v-text-field>
            <v-btn
                olor="primary"
                dark
                class="mb-2"
                v-on="on"
                @click="cargarDatos()"
                >
                Cargar Datos
            </v-btn>
        </div>
        <div class ="camera-button">
            <button type="button" class ="button is-rounded" @click="toggleCamera">
                <span v-if="!isCameraOpen">open camera</span>
                <span v-else>close camera</span>
            </button>
        </div>
        <v-dialog
            v-model="dialogCompose"
            width="700">
        >
            <v-card>
            <v-card-text>
                <v-text-field
                    v-model="texto"
                    label="Mensaje final"
                    clearable
                    hide-details="auto"
                    readonly 
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="cerrarDialog">Close Dialog</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        


        <div class ="camera-loading" v-show="isCameraOpen && isLoading">

        </div>

        <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{'flash': isShotPhoto}">
            <div class="camera-shutter" :class="{'flash': isShotPhoto}"></div>
            <video v-show="!isPhotoTaken" ref="camera" :width="300" :height="400" autoplay></video>
            <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="300" :height="400"></canvas>
        </div>

        <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
            <button type="button" class ="button" @click="takePhoto">
                <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
            </button>
        </div>
        <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
            <a id="downloadPhoto" download="my-photo.jpg" class ="button" role="button" @click="downloadImage">
                Download
            </a>
        </div>

    </div>
</template>


<script>
    import axios from 'axios'
    
    export default{
        data(){
           return{
                isCameraOpen: false,
                isPhotoTaken:false,
                isShotPhoto:false,
                isLoading: false,
                link:'#',
                photo:'',
                estudiante:{},
                postURL: 'http://localhost:5000',
                postURL2: 'http://localhost:5002',
                resultvector:{},
                compr:'',
                hola:'',
                cont: [],
                texto: '',
           }
           

        },
        methods: {
            cargarDatos(){
                var config_request={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                }
                    
                axios.post(this.postURL + '/estudiante',this.estudiante,{config_request}).then((res) => {  
                    console.log(res.data);
                    this.resultvector = res.data;            
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            toggleCamera(){
                if(this.isCameraOpen){
                    this.isCameraOpen = false;
                    this.isPhotoTaken = false;
                    this.isShotPhoto = false;
                    this.stopCameraStream();
                }
                else{
                    this.isCameraOpen=true;
                    this.createCameraElement();
                }

            },
            createCameraElement(){
                this.isLoading=true;
                const constraints = (window.constraints={
                    audio: false,
                    video:true
                });
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(stream =>{
                        this.isLoading=false;
                        this.$refs.camera.srcObject = stream;
                    }).catch(error =>{
                        this.isLoading=false;
                        alert("hola"+error);
                    });
            },
            stopCameraStream(){
                let tracks = this.$refs.camera.srcObject.getTracks();
                tracks.forEach(track=>{
                    track.stop();
                });
            },
            
            async takePhoto(){
                
                if (!this.isPhotoTaken){
                    this.isPhotoTaken=true;
                    const FLASH_TIMEOUT = 50;
                    setTimeout( ()=>{
                        this.isShotPhoto=false;
                    },FLASH_TIMEOUT);
                    
                }
                this.isPhotoTaken=!this.isPhotoTaken;
                var context = this.$refs.canvas.getContext("2d");
                context.drawImage(this.$refs.camera, 0,0,300,400);
                this.photo = this.$refs.canvas.toDataURL();

                var arr = this.photo.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
                while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
                }
                this.hola= new File([u8arr], this.estudiante.dni+"asistencia"+".jpg", {type:mime});
                
               


                var formData = new FormData();

                formData.append("file", this.hola);
                formData.append("ubicacion", this.resultvector.vector);
                var config_request={
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
                await axios.post(this.postURL2 + '/asistencia_opencv', formData,{ config_request })
                .then(res => {                                         
                    console.log(res.data);
                    console.log("hola 1");
                    this.compr = res.data;
       
                })
                .catch((error) => {
                    console.log(error)
                });

                
                if (this.compr=="True"){
                    var config_request2={
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                    await axios.post(this.postURL + '/estudiante_asistencia', this.estudiante,{ config_request2 })
                    .then(res => {                                         
                        console.log(res.data);
                        console.log("hola 2");
                        this.cont= res.data;
                        
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                    if(this.cont.length != 0){
                        var config_request3={
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                        await axios.put(this.postURL + '/asistencia', this.cont[0],{ config_request3 })
                        .then(res => {                                         
                            console.log(res.data);
                            console.log("hola 3");  
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                        this.texto = "Se realizo el marcado de asistencia correctamente"
                    }
                    else{
                        this.texto = "No tienes ningun curso para tomar asistencia"
                    }

                } else{
                    this.texto = "No eres la persona del DNI"
                      
                }
                this.dialogCompose = true    
                
            },
            downloadImage(){
                const download = document.getElementById("downloadPhoto");
                const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
                    .replace("image/jpeg","image/octet-stream");
                download.setAttribute("href",canvas);

            },
            cerrarDialog(){
                this.dialogCompose = false  
            }
        }
    }
</script>