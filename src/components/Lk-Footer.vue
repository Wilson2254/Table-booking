<template>
  <div>
    <router-link to="/booking">Столики</router-link>
    <router-link to="/mainlk">Домой</router-link>
    <router-link to="/profile">Профиль</router-link>
  </div>
</template>


<style lang="scss" scoped>
div{
  display: flex;
  width: 100%;
  justify-content: center;
}

a {
  width: 200px;
  height: 30px;
  margin: 0 20px;
  background-color: #dcd02d;
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>