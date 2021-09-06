<template>
  <div class="app-container">
    <div class="func-list">
      <div class="left search-group">
        <el-select v-model="courses" placeholder="请选择课程" class="input">
          <el-option
            v-for="item in courselist"
            :key="item.classes"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- <el-input placeholder="请输入学号" class="input"></el-input> -->
        <!-- <el-input placeholder="请输入学号" v-model="form.studentNum" class="input"></el-input>
        <el-input placeholder="请输入姓名" v-model="form.studentName" class="input"></el-input>-->
        <el-button @click="handleSearch" class="button">查询</el-button>
      </div>
      <div class="right">
        <el-button type="primary" icon="el-icon-folder-add" @click="handleAdd">新建课程</el-button>
        <!-- v-if="role === 'Administrator' || role === 'Supervisor'" -->
        <!-- <el-button type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
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
      <el-table-column label="课程" align="center" width="370">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="学期" align="center">
        <template slot-scope="scope">{{ scope.row.term }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="deleteEdit(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="50%">
      <el-form ref="dataForm" :model="nested">
        <el-form-item label="课程名称" label-width="100px">
          <el-input
            v-model="nested.name"
            :disabled="editDialog.type == 'edit'"
            style="width:400px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="学期名称" label-width="100px">
          <el-input
            v-model="nested.term"
            :disabled="editDialog.type == 'edit'"
            style="width:400px;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" @click="submitEdit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- <el-dialog :title="deleteDialog.title" :visible.sync="deleteDialog.visible" width="50%">
      <el-form>
        <el-form-item>确认删除吗？</el-form-item>
        <el-form-item>
          <el-button style="float: right;" @click="deleteEdit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>
<script>
import { getcourses, putcourses, deletecourses,getodatacourses} from "@/api/nested";
import { coueseList } from "@/api/menu";
export default {
  name: "Menu1",
  data() {
    return {
      i:Number,
      list: null,
      listLoading: true,
      nested: {
        name: "",
        term: ""
      },
      courses: null,
      courselist: [],
      editDialog: {
        title: "新建课程",
        visible: false,
        type: ""
      }
      /* deleteDialog: {
        title: "删除课程",
        visible: false
      } */
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleAdd() {
      this.editDialog = {
        title: "新建课程",
        visible: true,
        type: "add",
        method: "put"
      };
    },
    /* handledelete() {
      this.deleteDialog = {
        title: "删除课程",
        visible: true
      };
    }, */
    handleSearch() {
      let odatarout = "";
      console.log(this.courses)
      if (this.courses != null) {
        odatarout = '?$filter=id eq '+this.courses
        }
        console.log(odatarout)
        this.listLoading = true;
        getodatacourses(odatarout).then(({ data }) => {
          this.list = data.value;
          this.listLoading = false;
        }); 
    },
    submitEdit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          putcourses(this.nested).then(() => {
            this.editDialog.visible = false;
            this.$message.success(`添加成功`);
            this.fetchData();
          });
        }
      });
    },
    deleteEdit(id) {
      deletecourses(id).then(() => {
        this.$message.success(`删除成功`);
        this.fetchData();
      });
    },
    fetchData() {
      this.listLoading = true;
      getcourses().then(({ data }) => {
        this.list = data.value;
        console.log(this.list);
        this.listLoading = false;
      });
      coueseList().then(({ data }) => {
        this.courselist = data.value;
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
