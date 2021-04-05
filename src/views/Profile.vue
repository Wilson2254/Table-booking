<template>
    <div class="email">Почта: {{email}}</div>
    <div class="name">Имя: Иванов Иван</div>
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
            email: firebase.auth().currentUser.email
        }
    },
    methods:{
        signout(){
            firebase.auth().signOut().then((response) => {
                this.$router.push({ name: "Home" });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .email, .name, .exit{
        color: white;
        font-size: 30px;
        
    }
</style>