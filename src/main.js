import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import firebase from "firebase"


var firebaseConfig = {
    apiKey: "AIzaSyCI9OXLvkoMDVFx_DabIzBUDEinmwaNRrQ",
    authDomain: "hokah-loft.firebaseapp.com",
    projectId: "hokah-loft",
    storageBucket: "hokah-loft.appspot.com",
    messagingSenderId: "272006314502",
    appId: "1:272006314502:web:ca64c8cfb964688311a187"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let app;

  firebase.auth().onAuthStateChanged(() =>{
    if (!app){
      firebase.firestore().settings({
        timestampsInSnapshots: true,
      })
      app = createApp(App).use(VueAxios, axios).use(store).use(router).mount('#app')      
    }
  })


