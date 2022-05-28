<template>
  <div class="resource">
    <resource-list/>
  </div>
</template>

<script lang="ts">
import ResourceList from './components/list.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'resourceIndex',
  components: {
    ResourceList
  }
})
</script>

<style lang="scss" scoped>

</style>
