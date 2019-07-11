import HelloWorld from './src/HelloWorld.vue'
import { VueConstructor } from 'vue'

(HelloWorld as any).install = function(Vue: VueConstructor) {
  Vue.component(HelloWorld.name, HelloWorld)
}

export default HelloWorld
