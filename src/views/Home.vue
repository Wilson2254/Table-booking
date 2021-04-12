<template>
  <div>
    <div class="logo">Hookah Loft</div>    
    <div class="footer"><bottom-footer></bottom-footer></div>
    <!-- <div id="nav">
    <div><top-header></top-header></div>
    <div><router-link to="/home">Домашняя страница</router-link></div>
    <div><router-link to="/booking"> Бронь столика </router-link></div>
  </div> -->
  </div>
</template>

<script>
// import TopHeader from "./components/Top-Header";
import BottomFooter from "../components/Bottom-Footer";
export default {
  components: {
    // "top-header": TopHeader,
    BottomFooter,
  },
};
</script>

<style lang="scss" scoped>
div {
  // color: white;
}

.logo{
    display: flex;
    justify-content: center;
    font-size: 50px;
}
</style>