<template>
  <div id="app">
    <router-view/>
    <h1 class="text">asdfasdf</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      a: 1
    }
  }
})
</script>

<style lang="scss" scoped>
.text {
  color: $success-color;
}
</style>
