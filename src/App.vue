<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  mounted() {
    if (firebase.auth().currentUser) this.$router.push({ name: "Mainlk" });
    else this.$router.push({ name: "Signup" });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap");
* {
  font-family: "Rubik", sans-serif;
  margin: 0;
  box-sizing: border-box;
}
#app{
  background: transparent;
}
</style>
