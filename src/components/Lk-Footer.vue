<template>
  <div id="lk-footer">
    <router-link to="/booking">Столики</router-link>
    <router-link to="/mainlk">Домой</router-link>
    <router-link to="/profile">Профиль</router-link>
  </div>
</template>


<style lang="scss" scoped>
#lk-footer {
  position: fixed;
  width: 440px;
  display: flex;
  left: 40px;
  bottom: 30px;
  a {
    padding: 12px 10px;
    border: 0;
    background: linear-gradient(to right, #ff6600 0%, #ff0000 100%);
    border-radius: 3px;
    margin-top: 10px;
    color: #fff;
    letter-spacing: 1px;
    font-family: "Rubik", sans-serif;
    text-decoration: none;
    font-size: 14px;
    margin-right: 20px;
  }
}
</style>