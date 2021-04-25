<template>
  <div id="signup">
    <router-view />
    <div class="left">
      <div class="header">
        <h2 class="animation a1">Добро пожаловать</h2>
        <h4 class="animation a2">
          Введите Ваше ФИО, электронную почту и пароль
        </h4>
      </div>
      <form class="form" @submit.prevent="pressed">
        <input
          type="text"
          class="form-field animation a4"
          placeholder="ФИО"
          v-model="name"
        />
        <input
          type="email"
          class="form-field animation a3"
          placeholder="Электронная почта"
          v-model="email"
        />
        <input
          type="password"
          class="form-field animation a4"
          placeholder="Пароль"
          v-model="password"
        />
        <button class="animation a6">Зарегистрироваться</button>
      </form>
    </div>
    <div class="right"></div>
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
@import url("https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap");

body {
  font-family: "Rubik", sans-serif;
}

#signup {
  display: flex;
  height: 100vh;
}

.left {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  animation-name: left;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 1s;
}

.right {
  flex: 1;
  background-color: black;
  transition: 1s;
  background-image: url(https://archello.s3.eu-central-1.amazonaws.com/images/2020/11/17/loft-buro-ugli-restaurant-restaurants-archello.1605620035.5113.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.header > h2 {
  margin: 0;
  color: #000000;
}

.header > h4 {
  margin-top: 10px;
  font-weight: normal;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.4);
}

.form {
  max-width: 80%;
  display: flex;
  flex-direction: column;
}

.form-field {
  height: 46px;
  padding: 0 16px;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 4px;
  font-family: "Rubik", sans-serif;
  outline: 0;
  transition: 0.2s;
  margin-top: 20px;
}

.form-field:focus {
  border-color: #ff9900;
}

.form > button {
  padding: 12px 10px;
  border: 0;
  background: linear-gradient(to right, #ff6600 0%, #ff0000 100%);
  border-radius: 3px;
  margin-top: 10px;
  color: #fff;
  letter-spacing: 1px;
  font-family: "Rubik", sans-serif;
}

.animation {
  animation-name: move;
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-delay: 2s;
}

.a1 {
  animation-delay: 2s;
}

.a2 {
  animation-delay: 2.1s;
}

.a3 {
  animation-delay: 2.2s;
}

.a4 {
  animation-delay: 2.3s;
}

.a5 {
  animation-delay: 0.4s;
}

.a6 {
  animation-delay: 2.5s;
}

@keyframes move {
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-40px);
  }

  100% {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

@keyframes left {
  0% {
    opacity: 0;
    width: 0;
  }

  100% {
    opacity: 1;
    padding: 20px 40px;
    width: 440px;
  }
}

.footer {
  animation-name: footer;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 2s;
}

@keyframes footer {
  0% {
    opacity: 0;
    visibility: hidden;
  }

  100% {
    opacity: 1;
    visibility: visible;
  }
}
</style>