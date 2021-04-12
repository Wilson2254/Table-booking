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
      <div class="name">
        <input type="text" v-model="name" placeholder="ФИО" />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
    <div class="footer"><bottom-footer></bottom-footer></div>
  </div>
</template>

<script>
import firebase from "firebase";
import BottomFooter from "../components/Bottom-Footer";
export default {
  components: {
    BottomFooter,
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
      name: "",
    };
  },
  methods: {
    async pressed() {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        firebase.firestore().collection("Users").doc(this.email).set({
          email: this.email,
          name: this.name,
        });
        console.log(user);
        this.$router.push({ name: "Mainlk" });
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