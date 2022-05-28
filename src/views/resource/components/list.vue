<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="资源名称">
            <el-input v-model="query.name" placeholder="资源名称"></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input v-model="query.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select v-model="query.region" placeholder="资源分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="resources"
        border>
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
          label="路径"
          prop="url"
          width="200">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="description"
          width="250">
        </el-table-column>
        <el-table-column
          label="创建者"
          prop="createdBy"
          width="150">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createdTime"
          width="200">
        </el-table-column>
        <el-table-column
          label="更新者"
          prop="updatedBy"
          width="150">
        </el-table-column>
        <el-table-column
          label="更新时间"
          prop="updatedTime"
          width="200">
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
      <div class="block">
        <span class="demonstration"></span>
        <!-- current-page：用于当改变了件数后，页码同步改变-->
        <el-pagination
          :current-page="query.current"
          :page-size="query.size"
          :page-sizes="[5, 10, 20, 50, 100]"
          :total="totalCount"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getResourceInfo } from '@/service/resource'
import Vue from 'vue'

export default Vue.extend({
  name: 'ResourceList',
  created () {
    this.loadResource()
  },
  data () {
    return {
      resources: [],
      query: {
        name: '',
        url: '',
        region: '',
        current: 2,
        size: 5
      },
      totalCount: 0,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  methods: {
    async loadResource () {
      const { data } = await getResourceInfo(this.query)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.totalCount = data.data.total
      }
    },
    onSubmit () {
      console.log('submit!')
    },
    handleSizeChange (val: number) {
      this.query.size = val
      // 条数改变后，重置页码
      this.query.current = 1
      this.loadResource()
    },
    handleCurrentChange (val: number) {
      this.query.current = val
      this.loadResource()
    }
  }
})
</script>

<style lang="scss" scoped>
.el-table {
  width: 100%;
  margin-bottom: 20px;
}
</style>
