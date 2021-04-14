<template>
  <div>
    <div class="email">Почта: {{ email }}</div>
    <div class="name">Пользователь: {{ name }}</div>
    <div class="book">Ваша бронь: 
      <span v-if="!isHaveBook">Отсутсвует</span>
      <div v-else v-for="table in tables" :key="table.table">
        <!-- <span v-for="item in table" :key="item.table">
          {{item}}-
        </span> -->
        Столик: {{table.table}} || 
        Количество человек: {{table.people}} || 
        Время брони: {{table.time}}
      </div>
      <div class="alert">Бронь снимается в случае, если клиент опоздал более чем на 15 минут</div>
      </div>
    <div class="exit" @click="signout">Выйти</div>
    <div class="footer"><lk-footer></lk-footer></div>
  </div>
</template>

<script>
import firebase from "firebase";
import LkFooter from "../components/Lk-Footer";
export default {
  components: {
    LkFooter,
  },
  data() {
    return {
      email: firebase.auth().currentUser.email,
      name: null,
      tables: [],
      isHaveBook: false
    };
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    },
  },
  created() {
    firebase
      .firestore()
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          this.name =
            doc.data().email == firebase.auth().currentUser.email
              ? doc.data().name
              : null;
        });
      });

    firebase.firestore().collection('Users').doc(this.email).get().then(doc => {
      if (!doc.data().tables.length)
      this.isHaveBook = false
      else {
        this.isHaveBook = true;
        this.tables = doc.data().tables
      //   doc.data().tables.forEach(item =>{
      //   this.tables.push({
      //     'Номер столика':item.table,
      //     'Количество человек': item.people,
      //     'Время': item.time
      //   })
      // });
      }
    })
  },
};
</script>

<style lang="scss" scoped>
*{
  text-align: center;
}

.email,
.name,
.exit,
.book {
  color: black;
  font-size: 30px;
}

.exit{
  cursor: pointer;
}

.alert{
  color: tomato;
}
</style>