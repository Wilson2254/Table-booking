<template>
  <div id="signup">
    <!-- <div v-if="error" class="error">{{error.message}}</div> -->
    <form @submit.prevent="pressed">
      <h2>Регистрация</h2>
      <div class="email">
        <input type="email" v-model="email" placeholder="Логин" />
      </div>
      <div class="passwor">
        <input type="password" v-model="password" placeholder="Пароль" />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
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
        const user = firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        console.log(user);
        this.$router.push({ name: "Home" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#signup {
//   margin-top: 100px;
  display: flex;
  justify-content: center;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div,
    h2 {
      margin-bottom: 20px;
    }
    h2 {
      background-color: blue;
      padding: 5px 15px;
    }
  }
}
</style>