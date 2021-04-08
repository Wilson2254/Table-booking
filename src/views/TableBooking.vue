<template>
  <div>
    <div
      class="table"
      v-for="table in tables"
      :key="table.id"
      @click="bookTable(table)"
    >
      <span v-if="table.isBook" class="table--isbook">БРОНЬ</span>
      <span v-else class="table-isnotbook">{{ table.tableName }}</span>
    </div>
  </div>
  <booking-modal v-if="showModal" @close="showModal = false">
    <slot>{{currentTabel.tableName}}</slot>
  </booking-modal>
  <div class="footer"><lk-footer></lk-footer></div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import LkFooter from "../components/Lk-Footer";
import BookingModal from "../components/Booking-Modal"
export default {
  components: {
    LkFooter, BookingModal
  },
  data() {
    return {
      url: `https://api.telegram.org/bot1615672366:AAG7wGYt79dWT6FxSdhHbsrjzMg2rZuAX_E/sendMessage?chat_id=-538004402&text=`,
      tables: [],
      showModal: false,
      currentTabel: null,
    };
  },
  methods: {
    bookTable(table) {
      this.currentTabel = table;
      // let input = prompt(`На какое время бронируем ${table.tableName}?`);
      this.showModal = true;
      if (false) {
        firebase
          .firestore()
          .collection("Hookah")
          .doc(`${table.tableName}`)
          .update({
            isBook: !table.isBook,
          })
          .then(() => {
            firebase
              .firestore()
              .collection("Hookah")
              .get()
              .then((snapshot) => {
                this.tables = [];
                snapshot.forEach((doc) => {
                  this.tables.push(doc.data());
                });
                console.log(this.tables);
              });
          });
      } else return;
      console.log(table.tableName);
      //Russia Time
      let tzoffset = new Date().getTimezoneOffset() * 60000;
      let localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");

      var userEmail;
      var curentBooking;
      console.log(userEmail);
      firebase
        .firestore()
        .collection("Users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            userEmail =
              doc.data().email == firebase.auth().currentUser.email
                ? doc.data().name
                : null;
          });
        })
        .then(() => {
          curentBooking =
            this.url +
            "Заказ" +
            "%0A" +
            table.tableName +
            "%0A" +
            "ФИО: " +
            userEmail +
            "%0A" +
            "Эл. почта: " +
            firebase.auth().currentUser.email +
            "%0A" +
            "Время бронирования: " +
            localISOTime +
            "%0A" +
            "На какое время: " +
            input;
        })
        .then(() => {
          axios
            .post(curentBooking, {})
            .then(function (response) {
              console.log(response.headers.date);
              console.log(firebase.auth().currentUser);
              // console.log(firebase.firestore().collection('Hookah'));
            })
            .catch((e) => {
              console.log(e);
            });
        });
    },
  },

  created: function () {
    let ref = firebase.firestore().collection("Hookah");

    ref.onSnapshot((snapshot) => {
      this.tables = [];
      snapshot.forEach((doc) => {
        this.tables.push(doc.data());
      });
      // console.log(this.tables);
    });
    

  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  // flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  .table {
    user-select: none;
    .table--isbook {
      margin-bottom: 20px;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background: chocolate;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid black;
      opacity: 0.3;
    }
    .table-isnotbook {
      margin-bottom: 20px;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background: chocolate;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid black;
      opacity: 1;
    }
  }
}
</style>