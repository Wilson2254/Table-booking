//Страница регистрации
import Signup from "@/views/Signup.vue"
//Описание теста
describe ("Signup", () => {
    //реализация теста
    it ('Is Signup renders', () => {
        //Проверка на монтирование (жизненый цикл Vue) экземпляра страницы
        const wrapper = mount(Signup)
        //Аналог Assert'a, которые предполагает, что страница загрузилась (проверка по методу contains)
        expect(wrapper.contains('#signup')).toBe(true)
    })
})

//Страница авторизации
import Signin from "@/views/Signin.vue"
//Утилита для проверки рендера страницы
import {mount} from "@vue/test-utils"
//Описание теста
describe ("Signin", () => {
    //Реализация теста
    it ('Is Signin renders', () => {
        //Проверка на монтирование (жизненый цикл Vue) экземпляра страницы
        const wrapper = mount(Signin)
        //Аналог Assert'a, которые предполагает, что страница загрузилась (проверка по методу contains)
        expect(wrapper.contains('#sigin')).toBe(true)
    })
})