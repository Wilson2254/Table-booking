<template>
    <div>Вошли как</div>
    <span v-if="loggedIn">{{email}}</span>
    <span v-else>No</span>
    <div>
        <button @click="signOut">Выйти</button>
    </div>
</template>

<script>
import firebase from 'firebase'
// import 'firebase/auth'
export default {
    data(){
        return{
            email: null,           
            loggedIn: false
        }
    },

    methods:{
        async signOut(){
            try{
                const data = firebase.auth().signOut()
                console.log(data)
                this.$router.push({ name: 'Home' })
            }
            catch(err){
                console.log(err)
            }
            

        }
    },

    mounted(){
        firebase.auth().onAuthStateChanged(user =>{
            this.loggedIn = !!user
            this.email = user.email
        //     if (user){
        //         this.loggedIn = true;
        //     }
        //     else {
        //         this.loggedIn = false
        //     }
        })
    }

}
</script>

<style lang="scss" scoped>
    div,span{
        background-color: white;
    }
</style>