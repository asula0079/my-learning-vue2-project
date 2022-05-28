<template>
  <div class="menu-create">
    <menu-modify/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuModify from './components/modify.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    MenuModify
  },
  data () {
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
