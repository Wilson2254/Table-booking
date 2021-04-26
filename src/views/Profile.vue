<template>
  <div id="profile">
    <!-- <div class="email">Почта: {{ email }}</div>
    <div class="name">Пользователь: {{ name }}</div>
    <div class="book">Ваша бронь: 
      <span v-if="!isHaveBook">Отсутсвует</span>
      <div v-else v-for="table in tables" :key="table.time">
        Столик: {{table.table}} || 
        Количество человек: {{table.people}} || 
        Время брони: {{table.time}}
      </div>
      <div class="alert">Бронь снимается в случае, если клиент опоздал более чем на 15 минут</div>
      </div>
    <div class="exit" @click="signout">Выйти</div> -->
    <div class="contact">
      <main>
        <section>
          <div class="exit" @click="signout">Выйти</div>
          <div class="content">
            <img
              src="http://www.iconarchive.com/download/i78394/seanau/user/Thief.ico"
              alt="Profile Image"
            />
            <aside>
              <h1>{{ name }}</h1>
              <p>
                {{ email }}
              </p>
            </aside>
            <button
              v-bind:class="{ active: isOpenList }"
              @click="isOpenList = !isOpenList"
            >
              <span>Моя бронь  <span class="count-tables">({{tables.length}})</span></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
              >
                <g class="nc-icon-wrapper" fill="#444444">
                  <path
                    d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>

          <div class="title" v-bind:class="{ active: isOpenList }">
            <p>Моя бронь <span class="count-tables">({{tables.length}})</span></p>
          </div>
        </section>
      </main>

      <nav v-bind:class="{ active: isOpenList }">
        <a v-if="!isHaveBook">Бронь отсутствует</a>
        <a v-for="table in tables" :key="table.id">
          <div class="icon">
            <!-- <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 3v10c0 .567-.433 1-1 1h-1V4.925L8 9.233 2 4.925V14H1c-.567 0-1-.433-1-1V3c0-.283.108-.533.287-.712C.467 2.107.718 2 1 2h.333L8 6.833 14.667 2H15c.283 0 .533.108.713.288.179.179.287.429.287.712z"
                fill-rule="evenodd"
              />
            </svg> -->
          </div>

          <div class="content">
            <h1>Столик: {{ table.table }}</h1>
            <span>Время: {{ table.time }}</span>
            <span>Кол-во человек: {{ table.people }}</span>
          </div>

          <div class="remove-table" @click="removeBook(table)"></div>
        </a>
      </nav>
      <div class="footer" v-bind:class="{ active: isOpenList }">
        <lk-footer></lk-footer>
      </div>
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
      email: firebase.auth().currentUser.email,
      name: null,
      tables: [],
      isHaveBook: false,
      isOpenList: false,
    };
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Signin" });
        });
    },
    removeBook(table) {
      this.tables.forEach((item, index, object) => {
        if (item.table == table.table) object.splice(index, 1);
      });
      firebase
        .firestore()
        .collection("Users")
        .doc(`${firebase.auth().currentUser.email}`)
        .update({
          tables: this.tables,
        });
      firebase
        .firestore()
        .collection("Users")
        .doc(this.email)
        .get()
        .then((doc) => {
          if (!doc.data().tables.length) this.isHaveBook = false;
          else {
            this.isHaveBook = true;
            this.tables = doc.data().tables;
          }
        });
      firebase
        .firestore()
        .collection("Hookah")
        .doc(`${table.table}`)
        .collection("Time")
        .doc(`${table.time}`)
        .delete()
        .then(() => {
          console.log("Done");
        })
        .catch((error) => {
          console.error("Error", error);
        });
    },
  },
  created() {
    firebase
      .firestore()
      .collection("Users")
      .doc(`${firebase.auth().currentUser.email}`)
      .get()
      .then((item) => {
        this.name = item.data().name;
      });

    firebase
      .firestore()
      .collection("Users")
      .doc(this.email)
      .get()
      .then((doc) => {
        if (!doc.data().tables.length) this.isHaveBook = false;
        else {
          this.isHaveBook = true;
          this.tables = doc.data().tables;
        }
      });
  },
};
</script>

<style lang="scss" scoped>
$bg-color: #051321;
$color-1: #eb524a;
$color-2: #c63535;
$color-3: #ffbe44;

$white: #ffffff;
$black: #000000;

$gmail: #d14836;
$facebook: #3b5998;
$twitter: #1da1f2;

@mixin animation($animation) {
  -webkit-animation: #{$animation};
  -moz-animation: #{$animation};
  -o-animation: #{$animation};
  animation: #{$animation};
}

@mixin keyframes($keyframes) {
  @-webkit-keyframes #{$keyframes} {
    @content;
  }
  @-moz-keyframes #{$keyframes} {
    @content;
  }
  @-o-keyframes #{$keyframes} {
    @content;
  }
  @keyframes #{$keyframes} {
    @content;
  }
}

@mixin transform($transform) {
  -webkit-transform: $transform;
  -moz-transform: $transform;
  -ms-transform: $transform;
  -o-transform: $transform;
  transform: $transform;
}

@mixin transition($transition) {
  -webkit-transition: #{$transition};
  -moz-transition: #{$transition};
  -o-transition: #{$transition};
  transition: #{$transition};
}

@mixin transition-delay($transition-delay) {
  -webkit-transition-delay: #{$transition-delay};
  -moz-transition-delay: #{$transition-delay};
  -o-transition-delay: #{$transition-delay};
  transition-delay: #{$transition-delay};
}

#profile {
  background-image: url("http://lava360.com/wp-content/uploads/2014/01/Classic-Background-Images-For-Wordpress-Blogs-111.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  position: fixed;
  overflow: auto;
  overflow-x: hidden;
}

.contact {
  position: relative;
  max-width: 100%;
  padding: 40px 20px;
  margin: 0 auto;
  height: 100%;

  @media (min-width: 1024px) {
    position: absolute;
    top: 50%;
    left: 50%;
    @include transform(translate(-50%, -50%));
  }

  main {
    float: left;
    width: 100%;
    position: relative;

    section {
      border-radius: 5px;
      float: left;
      width: 100%;
      background-color: $color-1;

      .content {
        float: left;
        width: 100%;
        padding: 20px 30px 50px 30px;
        position: relative;
        text-align: center;
        margin-top: 30px;

        @media (min-width: 414px) {
          text-align: left;
        }

        img {
          display: inline-block;
          width: 140px;
          border-radius: 50%;

          @media (min-width: 414px) {
            float: left;
            width: 30%;
            margin-right: 10%;
          }
        }

        aside {
          float: left;
          width: 100%;
          color: $white;
          margin-top: 10px;

          @media (min-width: 414px) {
            width: 60%;
          }

          h1 {
            font-weight: 100;
            font-size: 22px;
            margin-bottom: 10px;
          }

          p {
            font-size: 14px;
            letter-spacing: 0.5px;
            line-height: 160%;
          }
        }
      }
    }

    .title {
      float: left;
      width: 100%;
      background-color: $color-2;
      max-height: 0px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      overflow: hidden;
      @include transition(all 0.55s);

      &.active {
        max-height: 100px;
        @include transition(all 1.3s);

        p {
          @include transform(scale(1));
          transition-delay: 0.2s;
        }
      }

      p {
        padding: 15px 30px;
        color: $white;
        font-size: 16px;
        display: inline-block;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        @include transition(all 0.3s);
        @include transform(scale(0));
      }
    }

    button {
      position: absolute;
      bottom: 0;
      right: 50%;
      background-color: $color-3;
      color: $color-2;
      border: 0;
      width: 200px;
      height: 48px;
      text-align: center;
      border-radius: 30px;
      font-size: 16px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: -24px;
      margin-right: -100px;
      @include transition(all 0.4s);
      transition-delay: 0.1s;
      outline: none;
      overflow: hidden;
      z-index: 10;
      font-family: inherit;

      span:not(.count-tables) {
        opacity: 1;
        @include transition(opacity 0.2s);
        transition-delay: 0.4s;
        display: block;
        width: 200px;
        float: left;
        padding: 15px 0px;
      }

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        @include transform(translate(-50%, -50%));
        opacity: 0;
        @include transition(all 0.4s);

        path {
          fill: $color-2;
        }
      }

      &.active {
        margin-right: 0;
        right: 20px;
        width: 65px;
        height: 65px;
        margin-bottom: -32.5px;
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
        border-radius: 65px;
        box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);

        span {
          opacity: 0;
          transition-delay: 0s;
          width: 200px;
        }

        svg {
          opacity: 1;
          transition-delay: 0.5s;
        }
      }
    }
  }

  nav {
    float: left;
    width: 100%;
    overflow: hidden;
    max-height: 0px;
    @include transition(all 0.5s);

    &.active {
      max-height: 600px;
      @include transition(all 1s);

      a {
        opacity: 1;
        @include transform(translateY(0px));
        @include transition(all 0.7s);

        &:nth-of-type(1) {
          transition-delay: 0.5s;
        }

        &:nth-of-type(2) {
          transition-delay: 0.7s;
        }

        &:nth-of-type(3) {
          transition-delay: 0.9s;
        }
      }
    }

    a {
      display: flex;
      align-items: center;
      float: left;
      width: 100%;
      margin-top: 18px;
      background-color: $white;
      padding: 18px 20px;
      border-radius: 5px;
      text-decoration: none;
      @include transition(all 0.3s);
      opacity: 0;
      @include transform(translateY(-10px));
      position: relative;

      @media (min-width: 414px) {
        padding: 18px 30px;
      }

      .arrow {
        position: absolute;
        right: 15px;
        top: 50%;
        @include transform(translateY(-50%));

        path {
          fill: darken($white, 10%);
        }
      }

      .icon {
        float: left;
        width: 50px;
        height: 50px;
        overflow: hidden;
        margin-right: 20px;
        background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 468.293 468.293' style='enable-background:new 0 0 468.293 468.293;' xml:space='preserve'%3E%3Crect x='90.974' y='76.338' style='fill:%23FCD462;' width='286.352' height='22.509'/%3E%3Cpath style='fill:%23DC8744;' d='M455.805,76.337H12.488C5.591,76.337,0,70.746,0,63.85V34.719c0-6.897,5.591-12.488,12.488-12.488 h443.317c6.897,0,12.488,5.591,12.488,12.488V63.85C468.293,70.746,462.702,76.337,455.805,76.337z'/%3E%3Crect x='205.918' y='76.338' style='fill:%23F6C358;' width='56.445' height='294.712'/%3E%3Cpolygon style='fill:%23DC8744;' points='118.958,414.74 205.917,371.033 262.372,371.033 349.334,414.74 349.334,446.062 118.958,446.062 '/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");

        svg {
          width: 100%;
          height: 100%;
          padding: 14px;

          path {
            fill: $white;
          }
        }
      }

      .content {
        h1 {
          font-size: 20px;
          font-weight: 400;
          line-height: 160%;
          letter-spacing: 0.4px;
        }

        span {
          font-size: 14px;
          color: darken($white, 30%);
          display: block;
          letter-spacing: 0.4px;
        }
      }
    }
  }
  .exit {
    padding: 20px 20px;
    color: #ffffff;
    font-size: 16px;
    display: inline-block;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s;
    cursor: pointer;
    position: absolute;
    right: 0;
    z-index: 2;
    &:hover {
      color: #ff9900;
    }
  }

  .footer {
    #lk-footer {
      position: static;
      padding: 40px 0;
    }
    &.active {
      #lk-footer {
        padding-top: 20px;
      }
    }
  }

  .remove-table {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0;
    margin-right: 30px;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 496 496' style='enable-background:new 0 0 496 496;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath d='M248,0C111.033,0,0,111.033,0,248s111.033,248,248,248s248-111.033,248-248C495.841,111.099,384.901,0.159,248,0z M248,480C119.87,480,16,376.13,16,248S119.87,16,248,16s232,103.87,232,232C479.859,376.072,376.072,479.859,248,480z'/%3E%3Cpath d='M361.136,134.864c-3.124-3.123-8.188-3.123-11.312,0L248,236.688L146.176,134.864c-3.069-3.178-8.134-3.266-11.312-0.197 c-3.178,3.069-3.266,8.134-0.197,11.312c0.064,0.067,0.13,0.132,0.197,0.197L236.688,248L134.864,349.824 c-3.178,3.07-3.266,8.134-0.196,11.312c3.07,3.178,8.134,3.266,11.312,0.196c0.067-0.064,0.132-0.13,0.196-0.196L248,259.312 l101.824,101.824c3.178,3.07,8.242,2.982,11.312-0.196c2.995-3.1,2.995-8.016,0-11.116L259.312,248l101.824-101.824 C364.259,143.052,364.259,137.988,361.136,134.864z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
  }

  .count-tables{
    color: rgb(65, 206, 0);
    font-weight: 600;
  }
}
</style>