<template>
  <div>
    <div class="about">
      <h1>О нас</h1>
      <img :src="photos" />
    </div>
    <div class="about">
      <h1>Новости и акции</h1>
      <img :src="photos" />
    </div>
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
      photos: null,
    };
  },
  mounted() {
    console.log(firebase.storage().ref());
    console.log(firebase.auth().currentUser);
    console.log(firebase
      .storage()
      .ref("2cd43b_de870a7313e1454da9573de5162b4bd5_mv2_d_1750_1209_s_2.png"));
    firebase
      .storage()
      .ref("2cd43b_de870a7313e1454da9573de5162b4bd5_mv2_d_1750_1209_s_2.png")
      .getDownloadURL()
      .then((img) => {
        this.photos = img;
      });
  },
};
</script>

<style lang="scss" scoped>
.about {
  // color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img {
    width: 250px;
    height: 150px;
  }
}
</style>