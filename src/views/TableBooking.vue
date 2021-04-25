<template>
  <div id="booking">
    <div class="left">
      <div class="header">
        <h2 class="animation a1">Правила бронирования столиков</h2>
        <ul>
          <li class="animation a2">
            Бронирование столика производится строго на 1.5 часа
          </li>
          <li class="animation a2">
            В случае продления необходимо заново оформить бронь или предупредить
            об этом администратора
          </li>
          <li class="animation a2">
            Запрещена бронь столика, если кол-во человек превышает вместимость
            столика
          </li>
          <li class="animation a2">
            Администрация вправе снять бронирование вашего столика
          </li>
        </ul>
      </div>
      <booking-modal
        v-if="showModal"
        @close="showModal = false"
        @makeBook="makeBook"
        class="bookModal"
      >
        <slot>
          <div class="currentBook">Столик: {{ currentTable.tableName }}</div>
          <div class="currentBookPeople">{{ currentTable.description }}</div>
        </slot>
        <div class="actualBook" v-if="alreadyBooked[0]">
          Текущие брони:
          <div v-for="time in alreadyBooked" :key="time">
            <div>{{ time }}</div>
          </div>
        </div>
        <div v-else class="actualBook">Бронь отсутствует</div>
      </booking-modal>
      <div class="footer"><lk-footer></lk-footer></div>
    </div>
    <div class="right">
      <div>
        <div
          class="table"
          v-for="table in tables"
          :key="table.id"
          @click="bookTable(table)"
        >
          <img
            src="https://images.vexels.com/media/users/3/137666/isolated/preview/9ff738c598fe4b058c1be50ec63272cb-isometric-home-table-with-chairs-by-vexels.png"
            alt=""
          />
          <span>{{ table.tableName }}</span>
        </div>
      </div>
    </div>
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
    makeBook(people, time, date) {
      let bookingTables;
      firebase
        .firestore()
        .collection("Users")
        .doc(`${firebase.auth().currentUser.email}`)
        .get()
        .then((doc) => {
          let bookInfo = {
            people: people,
            time: date + " " + time,
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

      firebase
        .firestore()
        .collection("Hookah")
        .doc(`${this.currentTable.tableName}`)
        .collection("Time")
        .doc(`${date + " " + time}`)
        .set({
          time: date + " " + time,
        });
      //Russia Time
      let tzoffset = new Date().getTimezoneOffset() * 60000;
      let localISOTime = new Date(Date.now() - tzoffset)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
      var userName;
      var curentBooking;
      firebase
        .firestore()
        .collection("Users")
        .doc(`${firebase.auth().currentUser.email}`)
        .get()
        .then((item) => {
          userName = item.data().name;
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
            userName +
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
            date +
            " " +
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
    });
  },
};
</script>

<style lang="scss" scoped>
#booking {
  display: flex;
  height: 100vh;
}

.left {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  animation-name: left;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 1s;
}

.right {
  flex: 1;
  background-color: black;
  transition: 1s;
  background-image: url("../files/Map.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .table:nth-child(1) {
    position: absolute;
    top: 600px;
    left: 700px;
  }
  .table:nth-child(2) {
    position: absolute;
    top: 700px;
    left: 920px;
  }
  .table:nth-child(3) {
    position: absolute;
    top: 730px;
    left: 1200px;
  }
  .table:nth-child(4) {
    position: absolute;
    top: 500px;
    left: 1050px;
  }
  .table:nth-child(5) {
    position: absolute;
    top: 600px;
    left: 1350px;
  }
  .table {
    cursor: pointer;
    &:hover {
      color: #ff9900;
      img {
        width: 215px;
      }
    }
    img {
      width: 200px;
    }
    animation-name: move;
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-delay: 2s;
  }
  span {
    position: absolute;
    top: 38%;
    right: 39%;
    user-select: none;
  }
}

.header > h2 {
  margin: 0;
  color: #fc5b1b;
  user-select: none;
}

.header li {
  margin-top: 10px;
  font-weight: normal;
  font-size: 16px;
  color: rgb(255, 153, 0);
}

ul {
  list-style: none;
  padding-inline-start: 0px;
  user-select: none;
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

.actualBook {
  color: #fc5b1b;
  font-size: 20px;
}

.currentBook {
  font-size: 28px;
  color: rgb(255, 153, 0);
}

.currentBookPeople {
  color: rgb(255, 153, 0);
}
</style>