<template>
<router-view />
  <div id="signin">
    <form @submit.prevent="pressed">
      <h2>Вход</h2> 
      <div class="login">
        <input type="email" placeholder="Логин" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="Пароль" v-model="password" />
      </div>
      <button type="submit">Войти</button>
      <!-- <div
        >Первый раз? Регистрируйтесь<router-link to="/signup"
          >Зарегистрироваться</router-link
        ></div -->
    </form>
    <!-- <div class="error" v-if="error">{{error.message}}</div> -->
  </div>
  <div class="footer"><bottom-footer></bottom-footer></div>
</template>

<script>
import firebase from "firebase";
import BottomFooter from "../components/Bottom-Footer";
export default {
  components:{
    BottomFooter
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async pressed() {
      try {
        const val = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        console.log(val);
        this.$router.push({ name: "Mainlk" });
      } catch (er) {
        console.log(er);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#signin {
//   margin-top: 100px;
  display: flex;
  justify-content: center;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div, h2 {
      margin-bottom: 20px;
    }
    h2{
        background-color: green;
        padding: 5px 15px;
    }
  }
}
</style>