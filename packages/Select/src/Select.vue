<template>
  <el-select v-model="value" size="small">
    <el-option v-for="item in options" :key="item.prop" :value="item.prop" :label="item.label"/>
  </el-select>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      value: ''
    }
  }
})
</script>
