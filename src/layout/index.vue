<template>
  <el-container>
    <el-aside width="250px">
      <app-aside/>
    </el-aside>
    <el-container>
      <el-header>
        <app-header/>
      </el-header>
      <el-main>
        <!-- 子路由出口-->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from '@/layout/components/app-header.vue'

export default Vue.extend({
  name: 'layoutIndex',
  components: {
    AppAside,
    AppHeader
  }
})
</script>

<style lang="scss" scoped>
.el-header, .el-footer {
  background-color: #034b5c;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  min-height: 100vh;
  min-width: 980px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
