<template>
  <div class="bookTable">
    <slot></slot>
    <input type="text" placeholder="Кол-во людей" />
    <input type="time" placeholder="Время" />
    <button @click="$emit('close')">Закрыть</button>
    <button @click="$emit('makeBook')">Забронировать</button>
  </div>
</template>

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
</style>