<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push({ name: 'menu-create' })">
          添加菜单
        </el-button>
      </div>
      <el-table
        :data="menus"
        border
        style="width: 100%">
        <el-table-column
          fixed
          label="编号"
          prop="date"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          label="名称"
          prop="name"
          width="200">
        </el-table-column>
        <el-table-column
          label="级数"
          prop="level"
          width="200">
        </el-table-column>
        <el-table-column
          label="图标"
          prop="icon"
          width="200">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="description"
          width="250">
        </el-table-column>
        <el-table-column
          label="排序"
          prop="orderNum"
          width="300">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { deleteMenuInfo, getAllMenuInfo } from '@/service/menu'

export default Vue.extend({
  name: 'menuIndex',
  created () {
    this.loadAllMenuInfo()
  },
  methods: {
    async loadAllMenuInfo () {
      const { data } = await getAllMenuInfo()
      console.log(data)
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleEdit (item: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },
    handleDelete (item: any) {
      this.$confirm('确认要删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteMenuInfo(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            await this.loadAllMenuInfo()
          }
        }).catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  data () {
    return {
      menus: []
    }
  }
})
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>
