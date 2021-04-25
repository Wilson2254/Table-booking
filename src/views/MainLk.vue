<template>
  <div id="Main-LK">
    <h1>Рады Вас видеть, {{ userName }}!</h1>
    <div class="grid-container">
      <div v-for="photo of photos" :key="photo.Desc" @click="cardClick(photo)">
        <img class="grid-item" :src="photo.URL" alt="" />
        <p>{{ photo.Desc }}</p>
      </div>
    </div>
    <!-- <div class="footer"><lk-footer></lk-footer></div> -->
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
      photos: [],
      userName: "",
    };
  },
  methods:{
    cardClick(card){
      if (card.Desc === 'Мой профиль')
        this.$router.push({ path: '/profile' })
      if (card.Desc === 'Бронирование')
        this.$router.push({ path: '/booking' })
    }
  },
  mounted() {
    firebase
      .firestore()
      .collection("Navigation")
      .doc("Photos")
      .get()
      .then((item) => {
        Object.values(item.data()).forEach((field) => {
          firebase
            .storage()
            .ref("Navigation-Photo/" + field.URL)
            .getDownloadURL()
            .then((img) => {
              this.photos.push({
                URL: img,
                Desc: field.Desc,
              });
            });
        });
      });
    firebase
      .firestore()
      .collection("Users")
      .doc(`${firebase.auth().currentUser.email}`)
      .get()
      .then((item) => {
        this.userName = item.data().name.split(' ')[1]
      });
  },
};
</script>

<style lang="scss" scoped>
#Main-LK{
  background-image: url("http://lava360.com/wp-content/uploads/2014/01/Classic-Background-Images-For-Wordpress-Blogs-111.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: sans-serif;
}
h1 {
  color: coral;
  text-align: center;
  padding: 40px;
}
.grid-container {
  columns: 3 200px;
  column-gap: 1.5rem;
  width: 80%;
  margin: 0 auto;
  animation-name: move;
  animation-duration: 1s;
  animation-delay: 0.5s;
  div {
    width: 150px;
    margin: 0 1.5rem 1.5rem 0;
    display: inline-block;
    width: 100%;
    border: solid 2px black;
    padding: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    user-select: none;
    background-color: white;

    &:hover img {
      filter: grayscale(0);
    }
    &:hover {
      border-color: coral;
    }
    img {
      width: 100%;
      filter: grayscale(100%);
      border-radius: 5px;
      transition: all 0.25s ease-in-out;
    }
    p {
      margin: 5px 0;
      padding: 0;
      text-align: center;
      font-weight: 500;
    }
  }

  @keyframes move {
    0% {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-140px);
    }

    100% {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
}
</style>