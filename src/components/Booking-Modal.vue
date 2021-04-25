<template>
  <div id="booking-modal">
    <slot></slot>
    <div>Дата и время</div>
    <div>
      <span><input type="date" placeholder="Дата" v-model="date" /></span>
      <span class="time"><input type="time" placeholder="Время" v-model="time" /></span>
    </div>
    <div>Кол-во людей</div>
    <input type="text" placeholder="Кол-во людей" v-model="people" />
    <div class="book" @click="choosetable">Забронировать</div>
    <div class="close" @click="$emit('close')">Закрыть</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: null,
      time: null,
      date: null,
    };
  },
  methods: {
    choosetable() {
      this.$emit("makeBook", this.people, this.time, this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
#booking-modal {
  height: 500px;
  overflow: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}
input {
  min-height: 46px;
  padding: 0 16px;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 4px;
  font-family: "Rubik", sans-serif;
  outline: 0;
  transition: 0.2s;
}
input:focus {
  border-color: #ff9900;
}

.close,
.book {
  padding: 12px 10px;
  border: 0;
  background: linear-gradient(to right, #ff6600 0%, #ff0000 100%);
  border-radius: 3px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  color: #fff;
  letter-spacing: 1px;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
}

.time{
  margin-left: 20px;
}

::-webkit-scrollbar{
	width: 10px;
}

::-webkit-scrollbar-track-piece{
	background-color: #FFF;
}

::-webkit-scrollbar-thumb{
	background-color: #CBCBCB;
	outline: 2px solid #FFF;
	outline-offset: -2px;
	border: .1px solid #B7B7B7;
}

::-webkit-scrollbar-thumb:hover{
	background-color: #909090;
}
</style>