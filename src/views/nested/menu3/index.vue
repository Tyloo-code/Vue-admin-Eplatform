<template>
  <div class="app-container">
    <div class="func-list">
      <div class="left search-group">
        <el-select v-model="form.courses" placeholder="请选择课程" class="input">
          <el-option
            v-for="item in courselist"
            :key="item.classes"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- <el-input placeholder="请输入学号" class="input"></el-input> -->
        <el-select v-model="form.quiz" placeholder="请选择试卷" class="input">
          <el-option
            v-for="item in quizlist"
            :key="item.classes"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- <el-input placeholder="请输入学号" v-model="form.studentNum" class="input"></el-input>
        <el-input placeholder="请输入姓名" v-model="form.studentName" class="input"></el-input>-->
        <el-button @click="handleSearch" class="button">查询</el-button>
      </div>
      <div class="right">
        <el-button type="primary" icon="el-icon-folder-add" @click="handleAdd">新建</el-button>
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
    <el-table-column label="序号" align="center" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="课程" align="center" width="260">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="学期" width="260" align="center">
        <template slot-scope="scope">{{ scope.row.term }}</template>
      </el-table-column>
      <el-table-column label="试卷题目" width="260" align="center">
        <template slot-scope="scope">
          <div>
            <!-- {{ scope.row }} -->
              <div>
                <div v-for="(item, index) in scope.row.quizzes" :key="index">
                   {{ item.name }} 
                      
                </div>
              </div>
          </div>
          
          <!-- <span>{{ scope.row.id }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleAdd(scope.row.id)">增加试卷</el-button>
          <el-button @click="handledelete(scope.row.id)">删除试卷</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="学号" width="260" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="姓名" width="260" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> 
          {{ scope.row.studentname }}
        </template>
      </el-table-column>-->
      <!-- <el-table-column align="center" prop="created_at" label="多">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>-->
    </el-table>
    <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="50%">
      <el-form ref="dataForm">
        <el-form-item label="试卷选择" label-width="100px" prop="classes">
          <el-select v-model="quizId" multiple placeholder="请选择试卷" class="input">
            <el-option
              v-for="item in quizlist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" @click="submitEdit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :title="deleteDialog.title" :visible.sync="deleteDialog.visible" width="50%">
      <el-form>
        <el-form-item label="试卷选择" label-width="100px" >
          <el-select v-model="quizdeleteId" multiple placeholder="请选择试卷" class="input">
            <el-option
              v-for="item in quizlist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" @click="deleteEdit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getcourses, putqcmap, deleteqcmap,getodataqcmap,putcourses} from "@/api/nested";
import { coueseList, quizList, classList } from "@/api/menu";
export default {
  name: "Menu3",
  data() {
    return {
      i:Number,
      list: null,
      listLoading: true,
      quizcourse: {
        quizId:null,
        courseId:null
      },
      quizId:[],
      quizdeleteId:[],
      form: {
        quizzes: "",
        courses: ""
      },
      classlist:[],
      courselist: [],
      quizlist: [],
      course:{
        id:null,
        name: '',
        term: '',
        quizzes: [],
        classes: []
      },
      /* quizzes:{
        id:'',
        name:'',
        courses:null
      }, */
      editDialog: {
        title: "新建课程试卷",
        visible: false,
        type: ""
      },
      deleteDialog: {
        title: "删除课程",
        visible: false
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleAdd(id) {
      for(let i = 0;i<this.list.length;i++) {
        if(this.list[i].id == id) {
          this.course = this.list[i]
        }
      }
      console.log(this.course)
      this.editDialog = {
        title: "新增试卷",
        visible: true,
        type: "add",
        method: "put"
      };
    },
    handledelete(id) {
      for(let i = 0;i<this.list.length;i++) {
        if(this.list[i].id == id) {
          this.course = this.list[i]
        }
      }
      this.deleteDialog = {
        title: "删除试卷",
        visible: true
      };
    },
    handleSearch() {
      let odatarout = "";
      if (this.form.courses != "") {
        odatarout = '&$filter=' + 'courseId eq '+this.form.courses
        }
      if (this.form.quiz != "") {
          if(odatarout != ''){
            odatarout = odatarout + ' and quizId eq ' + this.form.quiz
          }
          else {
            odatarout = '&$filter=' + 'quizId eq ' + this.form.quiz
          }
        }
        this.listLoading = true;
        getodataqcmap(odatarout).then(({ data }) => {
          this.list = data.value;
          this.listLoading = false;
        });
    },
    putquizcourse() {
      console.log(this.quizcourse)
      putqcmap(this.quizcourse).then(() => {
        this.editDialog.visible = false;
        this.$message.success(`保存成功`);
        if(this.i<this.quizId.length-1){
          this.i = this.i +1
          this.quizcourse.quizId = this.quizId[this.i]
          this.putquizcourse()
        }
        this.fetchData();
      })
    },
    submitEdit() {
      for(let i =0;i<this.quizId.length;i++) {
        for(let j = 0;j <this.quizlist.length;j++) {
          if(this.quizId[i] == this.quizlist[j].id) {
          this.course.quizzes.push(this.quizlist[j])
          console.log(this.quizlist[j])
          
          }
        }
      }
     
      console.log(this.course)
      
      putcourses(this.course).then(() => {
        this.editDialog.visible = false;
        this.$message.success(`添加成功`);
        this.fetchData();
      })  
      /* this.quizcourse.quizId = this.quizId[0]
      this.i = 0
      this.putquizcourse() */
    },
    deleteEdit() {
      for(let i =0;i<this.quizdeleteId.length;i++) {
        for(let j = 0;j <this.classlist.length;j++) {
          if(this.quizdeleteId[i] == this.course[j].quizzes.id) {
          this.course.quizzes.splice(j,1)
        }
        }
      }
      console.log(this.course.quizzes)
      console.log(this.course)
      /* deleteqcmap(id).then(() => {
        this.fetchData();
        this.$message.success(`删除成功`);
      }); */
    },
    fetchData() {
      this.listLoading = true;
      getcourses().then(({ data }) => {
        this.list = data.value;
        this.listLoading = false;
      });
      
      quizList().then(({ data }) => {
        this.quizlist = data.value;
      });
      classList().then(({ data }) => {
        this.classlist = data.value;
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
