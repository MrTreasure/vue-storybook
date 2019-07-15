<template>
  <div id="app">
    <Select :options="list"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      list: [
        {
          label: '钟无艳',
          prop: '钟无艳'
        },
        {
          label: '祝我生日快乐',
          prop: '祝我生日快乐'
        },
        {
          label: '独家记忆',
          prop: '独家记忆'
        }
      ]
    }
  }

})
</script>
