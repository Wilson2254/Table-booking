<template>
  <div class="bookTable">
    <slot></slot>
    <div>Кол-во людей</div>
    <input type="text" placeholder="Кол-во людей" v-model="people" />
    <div>На какое время</div>
    <input type="time" placeholder="Время" v-model="time" />
    <div class="book" @click='choosetable'>Забронировать</div>
    <div class="close" @click="$emit('close')">Закрыть</div>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      people: null,
      time: null
    }
  },
  methods:{
    choosetable(){
      this.$emit('makeBook', this.people, this.time);
    }
  }
}
</script>

<style lang="scss" scoped>
.bookTable {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}
input {
  font-size: 16px;
  padding: 10px;
  display: block;
  width: 150px;
  // border: none;
  margin-bottom: 20px;
}
input:focus {
  outline: none;
}

.close, .book{
  text-decoration: none;
  display: inline-block;
  width: 240px;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
  margin: 10px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 3px;
  font-weight: 600;
  color: #524f4e;
  background: white;
  box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
  transition: .3s;
  cursor: pointer;
}

.close:hover, .book:hover {
  background: gray;
  box-shadow: 0 15px 20px gray;
  color: white;
  transform: translateY(-7px);
}

</style>