import { shallowMount } from '@vue/test-utils'
//Страница
import Mainlk from '@/views/Mainlk.vue'
//Роут на которой эта страница
const $route = {
  path: '/mainlk'
}

const wrapper = shallowMount(Mainlk, {
    //Указание пути и главной страницы
  mocks: {
    $route
  }
})

//Проверка существования указанного пути
wrapper.vm.$route.path