<template>
  <div id="footer-main">
    <router-link to="/signin">Вход в систему</router-link>
    <router-link to="/signup">Регистрация в системе</router-link>
  </div>
</template>

<style lang="scss" scoped>
#footer-main {
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
  }

  a:first-child{
    margin-right: 20px;
  }
}
</style>