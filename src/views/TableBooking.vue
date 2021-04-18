<template>
  <div class="booking">
    <img src="../files/map.jpg" />
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
    <booking-modal
      v-if="showModal"
      @close="showModal = false"
      @makeBook="makeBook"
      class="bookModal"
    >
      <div class="actualBook" v-if="alreadyBooked[0]">
        ТЕКУЩИЕ БРОНИ:
        <div v-for="time in alreadyBooked" :key="time">
          <div>{{ time }}</div>
        </div>
      </div>
      <div v-else class="actualBook">ПОКА ЧТО НА ЭТОТ СТОЛИК НЕТ БРОНИ</div>
      <slot>
        <div>СТОЛИК: {{ currentTable.tableName }}</div>
      </slot>
    </booking-modal>

    <div class="footer"><lk-footer></lk-footer></div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import LkFooter from "../components/Lk-Footer";
import BookingModal from "../components/Booking-Modal";
export default {
  components: {
    LkFooter,
    BookingModal,
  },
  data() {
    return {
      url: `https://api.telegram.org/bot1615672366:AAG7wGYt79dWT6FxSdhHbsrjzMg2rZuAX_E/sendMessage?chat_id=-538004402&text=`,
      tables: [],
      showModal: false,
      currentTable: null,
      alreadyBooked: "",
    };
  },
  methods: {
    makeBook(people, time) {
      console.log(people, time);
      let bookingTables;
      firebase
        .firestore()
        .collection("Users")
        .doc(`${firebase.auth().currentUser.email}`)
        .get()
        .then((doc) => {
          let bookInfo = {
            people: people,
            time: time,
            table: this.currentTable.tableName,
          };
          bookingTables = doc.data().tables;
          bookingTables.push(bookInfo);
          firebase
            .firestore()
            .collection("Users")
            .doc(`${firebase.auth().currentUser.email}`)
            .update({
              tables: bookingTables,
            });
        });

      // console.log(firebase.firestore().collection('Hookah').doc(`${this.currentTable.table}`).collection('Time'));
      firebase
        .firestore()
        .collection("Hookah")
        .doc(`${this.currentTable.tableName}`)
        .collection("Time")
        .doc(`${time}`)
        .set({
          time: time,
        });

      // firebase
      //     .firestore()
      //     .collection("Hookah")
      //     .doc(`${table.tableName}`)
      //     .update({
      //       isBook: !table.isBook,
      //     })
      //     .then(() => {
      //       firebase
      //         .firestore()
      //         .collection("Hookah")
      //         .get()
      //         .then((snapshot) => {
      //           this.tables = [];
      //           snapshot.forEach((doc) => {
      //             this.tables.push(doc.data());
      //           });
      //           console.log(this.tables);
      //         });
      //     });
      // console.log(table.tableName);
      //Russia Time
      let tzoffset = new Date().getTimezoneOffset() * 60000;
      let localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      var userEmail;
      var curentBooking;
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
            "\u{203C}" +
            "Поступило бронирование" +
            "\u{203C}" +
            "%0A" +
            "\u{1FA91}" +
            "Столик: " +
            this.currentTable.tableName +
            "\u{1FA91}" +
            "%0A" +
            "\u{1F9D1}" +
            "ФИО: " +
            userEmail +
            "\u{1F9D1}" +
            "%0A" +
            "\u{1F4E7}" +
            "Эл. почта: " +
            firebase.auth().currentUser.email +
            "\u{1F4E7}" +
            "%0A" +
            "\u{1F570}" +
            "Время бронирования: " +
            localISOTime +
            "\u{1F570}" +
            "%0A" +
            "\u{23F3}" +
            "На какое время: " +
            time +
            "\u{23F3}" +
            "%0A" +
            "\u{1F465}" +
            "Количество человек: " +
            people +
            "\u{1F465}";
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
    bookTable(table) {
      this.currentTable = table;
      this.showModal = true;
      this.alreadyBooked = firebase
        .firestore()
        .collection("Hookah")
        .doc(table.tableName)
        .collection("Time")
        .onSnapshot((snapshot) => {
          this.alreadyBooked = [];
          snapshot.forEach((doc) => {
            this.alreadyBooked.push(doc.data().time);
          });
          console.log(this.alreadyBooked);
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
* {
  box-sizing: border-box;
}

div {
  display: flex;
  // flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  .table {
    user-select: none;
    cursor: pointer;
    z-index: 2;
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

  .footer > div {
    justify-content: center;
  }

  img {
    width: 1000px;
    position: absolute;
    top: 0;
  }

  .booking {
    width: 100vw;
    height: 100vh;
    background-color: #b3e6fb;
  }

  .table:nth-child(1) {
    position: absolute;
    margin-bottom: 360px;
    margin-right: 572px;
    .table-isnotbook {
      width: 120px;
      height: 120px;
    }
  }

  .table:nth-child(2) {
    position: absolute;
    margin-bottom: 360px;
    margin-right: 65px;
    .table-isnotbook {
      width: 120px;
      height: 120px;
    }
  }

  .table:nth-child(3) {
    position: absolute;
    margin-bottom: 363px;
    margin-left: 472px;
    .table-isnotbook {
      width: 120px;
      height: 120px;
    }
  }

  .table:nth-child(4) {
    position: absolute;
    margin-bottom: 33px;
    margin-right: 328px;
    .table-isnotbook {
      width: 120px;
      height: 120px;
    }
  }

  .table:nth-child(5) {
    position: absolute;
    margin-bottom: 28px;
    margin-left: 210px;
    .table-isnotbook {
      width: 120px;
      height: 120px;
    }
  }

  .bookModal {
    font-size: 28px;
    background-color: white;
    width: 20%;
  }

  .actualBook {
    position: absolute;
    top: calc(0px + 20px);
    display: block;
  }
}
</style>