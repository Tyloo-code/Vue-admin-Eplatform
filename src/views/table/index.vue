<template>
  <div class="app-container">
    <div class="func-list">
      <div class="left search-group">
        <el-input placeholder="请输入题目" v-model="form" class="input"></el-input>
        <el-button @click="handleSearch" class="button">查询</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="题目" align="center" width="210">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <!-- <el-table-column label="实验报告" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.markdown }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/dashboard/index/'+scope.row.id"> -->
          <el-button @click="toEidt(scope.row.id)">编辑</el-button>
          <!-- </router-link> -->
          <el-button @click="toTest(scope.row.id)">预览试卷</el-button>
          <el-button @click="handledelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>-->
    </el-table>

    <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="50%">
      <div v-html="this.content"></div>
      <div>
            <el-button @click="editDialog.visible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, deletequiz, getodataList } from "@/api/table";
import { getquizbyid } from '@/api/dashboard';
import { quizList } from '@/api/menu'
export default {
  
  /*filters: {
     statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  }, */
  data() {
    return {
      list: null,
      listLoading: true,
      form: '',
      quizzes: null,
      quizList: null,
      content: '',
      editDialog: {
        title: "新建课程",
        visible: false,
        type: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleSearch() {
        
         let odatarout = this.form
         console.log(odatarout)
          this.listLoading = true
        getodataList(odatarout).then(({ data }) => {
          this.list = data.value
          this.listLoading = false
        }) 
    },
    handledelete(id) {
      deletequiz(id).then(({ data }) => {
        this.$message.success(`删除成功`)
        this.fetchData()
      })
    },
    toEidt(id) {
      this.$router.push({
        /* name: 'Dashboard', */
        path:'/dashboard',
        query: {
          replace: 1,
          id:id
          }
      })
    },
    toTest(id) {
      for(let i =0;i<this.list.length;i++) {
        if(this.list[i].id == id) {
          this.content = this.list[i].markdown
        }
      }
      this.editDialog = {
        title: "试卷预览",
        visible: true,
        type: "add",
        method: "put"
      };
    },
    fetchData() {
      this.listLoading = true;
      getList().then(({ data }) => {
        this.list = data.value;
        this.listLoading = false;
        console.log(this.list)
      });
      
    }
  }
};
</script>
<style lang="scss" scoped>
.search-group {
  width: 750px;
  .input {
    width: 150px;
    float: left !important;
    margin-right: 5px;
  }
  .button {
    color: #fff;
    background-color: #409eff;
  }
}
.func-list {
  margin-bottom: 20px;
  .left {
    display: inline-block;
  }
  .right {
    float: right;
  }
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
.upload-demo {
  display: inline-block;
  color: white;
}
</style>