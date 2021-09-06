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
        <el-select v-model="form.classes" placeholder="请选择班级" class="input">
          <el-option
            v-for="item in classlist"
            :key="item.id"
            :label="item.id"
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
    <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="课程" align="center" width="260">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="学期" width="260" align="center">
        <template slot-scope="scope">{{ scope.row.term }}</template>
      </el-table-column>
      <el-table-column label="学期" width="260" align="center">
        <template slot-scope="scope">{{ scope.row.classes }}</template>
      </el-table-column> 
      <el-table-column label="班级" width="260" align="center">
        <template slot-scope="scope">
          <div>
                  <ul>
                    <li v-for="(item, index) in scope.row.classes" :key="index">
                       {{ item.id }} 
                      
                    </li>
                  </ul>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleAdd(scope.row.id)">增加班级</el-button>
          <el-button @click="handledelete(scope.row.id)">删除班级</el-button>
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
        <el-form-item label="班级选择" label-width="100px">
          <el-select v-model="classId" multiple placeholder="请选择班级" class="input">
            <el-option
              v-for="item in classlist"
              :key="item.id"
              :label="item.id"
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
        <el-form-item label="班级选择" label-width="100px">
          <el-select v-model="classdeleteId" multiple placeholder="请选择班级" class="input">
            <el-option
              v-for="item in classlist"
              :key="item.id"
              :label="item.id"
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
import { getcourses, deleteccmap,getodataccmap, putcourses} from "@/api/nested";
import { classList, coueseList, quizList } from "@/api/menu";
export default {
  name: "Menu2",
  data() {
    return {
      i:Number,
      list: null,
      listLoading: true,
      course: {
        id:null,
        name: '',
        term: '',
        quizzes: [],
        classes: []
      },
      classcourse: {
        classId:null,
        courseId:null
      },
      classId:null,
      classdeleteId: null,
      form: {
        classes: "",
        courses: ""
      },
      classlist: [],
      courselist: [],
      editDialog: {
        title: "新建班级",
        visible: false,
        type: ""
      },
      deleteDialog: {
        title: "删除班级",
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
        title: "增加班级",
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
        title: "删除班级",
        visible: true,
        type: "delete",
        method: "delete"
      };
    },
    handleSearch() {
      let odatarout = "";
      if (this.form.courses != "") {
        odatarout = '&$filter=' + 'courseId eq '+this.form.courses
        }
      if (this.form.classes != "") {
          if(odatarout != ''){
            odatarout = odatarout + ' and classId eq \'' + this.form.classes +'\''
          }
          else {
            odatarout = '&$filter=' + 'classId eq \'' + this.form.classes +'\''
          }
        }
        this.listLoading = true;
        getodataccmap(odatarout).then(({ data }) => {
          this.list = data.value;
          this.listLoading = false;
        });
    },
    putclasscourse() {
      putccmap(this.classcourse).then(() => {
        this.editDialog.visible = false;
        this.$message.success(`保存成功`);
        if(this.i<this.classId.length-1){
          this.i = this.i +1
          this.classcourse.classId = this.classId[this.i]
          this.putclasscourse()
        }
        this.fetchData();
      })
    },
    submitEdit() {
      for(let i =0;i<this.classId.length;i++) {
        for(let j = 0;j <this.classlist.length;j++) {
          if(this.classId[i] == this.classlist[j].id) {
          this.course.classes.push(this.classlist[j])
        }
        }
      }
      
      console.log(this.course.classes)
      console.log(this.course)
      putcourses(this.course).then(() => {
        this.editDialog.visible = false;
        this.$message.success(`添加成功`);
        this.fetchData();
      })
      /* for(let i =0;i<this.courselist.length;i++) {
        if(this.courselist[i].id == this.classcourse.courseId) {
          this.classcourse = this.courselist[i]
        }
      } */
      /* this.classcourse.classId = this.classId[0]
      this.i = 0
      this.putclasscourse() */
    },
    deleteEdit() {
      for(let i =0;i<this.classdeleteId.length;i++) {
        for(let j = 0;j <this.classlist.length;j++) {
          /* if(this.classdeleteId[i] == this.course[j].classes.id) {
          this.course.classes.splice(j,1)
         } */
          if(this.classdeleteId[i] == this.classlist[j].id) {
            console.log(this.classlist[j]);
            console.log(this.classlist.indexOf(this.classlist[j]))
            let a = this.classlist.indexOf(this.classlist[j])
            console.log(a);
            this.course.classes.splice(a-2,1)
            // let id1 = this.course.id
            // let id2 = this.classlist[j].id
            // console.log(id1,id2)
            /* deleteccmap(id1,id2).then(() => 
              this.$message.success(`删除成功`);
              this.fetchData();
            });  */
            this.timer = setTimeout(()=>{   //设置延迟执行
              putcourses(this.course).then(() => {
              this.editDialog.visible = false;
              this.$message.success(`删除成功`);
              this.fetchData();
            },1000);
            
            })
          console.log(this.course.classes)
          console.log(this.course)
          }

        }
      }
      
      
      
    },
    fetchData() {
      this.listLoading = true;
      getcourses().then(({ data }) => {
        this.list = data.value;
        this.listLoading = false;
      });
      classList().then(({ data }) => {
        this.classlist = data.value;
      });
      quizList().then(({ data }) => {
        this.quizlist = data.value;
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
