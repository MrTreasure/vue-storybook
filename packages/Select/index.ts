import Select from './src/Select.vue'
import { VueConstructor } from 'vue'

(Select as any).install = function(Vue:VueConstructor) {
  Vue.component(Select.name, Select)
}
export default Select
