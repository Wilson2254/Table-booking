<template>
    <div class="email">Почта: {{email}}</div>
    <div class="name">{{name}}</div>
    <div class="exit" @click="signout">Выйти</div>
    <div class="footer"><lk-footer></lk-footer></div>
</template>

<script>
import firebase from "firebase";
import LkFooter from '../components/Lk-Footer'
export default {
    components:{
        LkFooter
    },
    data(){
        return{
            email: firebase.auth().currentUser.email,
            name: null,
        }
    },
    methods:{
        signout(){
            firebase.auth().signOut().then((response) => {
                this.$router.push({ name: "Home" });
            });
        }
    },
    created(){
        firebase
        .firestore()
        .collection("Users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            this.name =
              doc.data().email == firebase.auth().currentUser.email
                ? doc.data().name
                : null;
          });
        })
    }
}
</script>

<style lang="scss" scoped>
    .email, .name, .exit{
        color: white;
        font-size: 30px;
        
    }
</style>