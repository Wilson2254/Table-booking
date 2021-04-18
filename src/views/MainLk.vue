<template>
  <div>
    <div class="about">
      <h1>О нас</h1>
      <div class="info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <img :src="photos" />
    </div>
    <div class="about">
      <h1>Галерея</h1>
      <div class="photos">
        <div
          class="left-button"
          @click="photoNumber == 0 ? photoNumber : photoNumber--"
        ></div>
        <div class="caption-top">
          <h2>
            Открытие заведения<br />
            <i class="date">Апрель, 2018</i>
          </h2>
          <img :src="photos[photoNumber]" />
        </div>
        <div
          class="right-button"
          @click="
            photoNumber == photos.length - 1 ? photoNumber : photoNumber++
          "
        ></div>
      </div>
    <div class="footer"><lk-footer></lk-footer></div>
    </div>
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
      photoNumber: 0,
    };
  },
  mounted() {
    // console.log(firebase.storage().ref());
    // console.log(firebaseauth().currentUser);
    // firebase
    //   .storage()
    //   .ref("2cd43b_de870a7313e1454da9573de5162b4bd5_mv2_d_1750_1209_s_2.png")
    //   .getDownloadURL()
    //   .then((img) => {
    //     this.photos = img;
    //   });

    firebase
      .firestore()
      .collection("PhotosURL")
      .get()
      .then((doc) => {
        doc.forEach((item) => {
          firebase
            .storage()
            .ref("event-01/" + item.data().URL)
            .getDownloadURL()
            .then((img) => {
              this.photos.push(img);
            });
        });
      });
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.about {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .info{
    font-size: 24px;
    text-align: center;
    padding: 0 20%;
  }

  .footer{
      position: relative;
      margin-top: 150px;
  }

  .photos {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .caption-top {
    width: 900px;
    border: 5px solid #e06b2a;
    position: relative;
  }

  .caption-top img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  .caption-top h2 {
    margin: 0;
    color: white;
    line-height: 1.1;
    font-size: 1.2em;
    font-weight: 200;
    padding: 10px 20px 10px 10px;
    border-bottom-right-radius: 20px;
    background: #e06b2a;
    position: absolute;
    top: -5px;
    left: 0;
    box-shadow: -3px -1px 3px -3px #e06b2a,
      5px 10px 20px -5px hsla(0, 0%, 0%, 0.4);
  }
  .date {
    font-family: "Open Sans", sans-serif;
    font-size: 0.7em;
  }

  .right-button {
    background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 492.004 492.004' style='enable-background:new 0 0 492.004 492.004;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12 c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028 c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265 c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  .left-button {
    background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 492 492' style='enable-background:new 0 0 492 492;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
}
</style>