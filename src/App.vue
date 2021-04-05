<template>
    <router-view />
    <!-- <div class="footer"><bottom-footer></bottom-footer></div> -->
  <!-- <div id="nav">
    <div><top-header></top-header></div>
    <div><router-link to="/home">Домашняя страница</router-link></div>
    <div><router-link to="/booking"> Бронь столика </router-link></div>
  </div> -->
</template>

<script>
// import TopHeader from "./components/Top-Header";
// import BottomFooter from "./components/Bottom-Footer";
import firebase from "firebase";
export default {
  // components: {
  //   "top-header": TopHeader,
  //   "bottom-footer": BottomFooter,
  // },
  mounted(){
    if (firebase.auth().currentUser)
    this.$router.push({ name: "Mainlk" })
    else
    this.$router.push({ name: "Home" });
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  background: url("./files/logo.png") 100% no-repeat;
  height: 100vh;
  background-size: cover;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      text-decoration: none;
      color: orange;
    }
  }
}

.footer {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-around;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
