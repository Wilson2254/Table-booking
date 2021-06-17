//Необходимый компонент
import BottomFooter from "@/components/Bottom-Footer.vue"
import {mount} from "@vue/test-utils"
describe ("BottomFooter", () => {
    it ('Is BottomFooter have button', () => {
        const wrapper = mount(BottomFooter)
        //Поиск через find необхожимого блока компонента при его загрузке
        const buttonWrapper = wrapper.find('#footer-main')
        //Assert копонента
        expect(buttonWrapper.element.id).toBe('footer-main')
    })
})
