<template>
  <div class="app-container">
    <div class="func-list">
      <!-- <div class="left search-group">
        <el-input placeholder="请输入题目" v-model="form" class="input"></el-input>
        <el-button @click="handleSearch" class="button">查询</el-button>
      </div> -->
      <div class="left search-group">
        <el-select v-model="courses" placeholder="请选择课程" class="input">
          <el-option
            v-for="item in courselist"
            :key="item.classes"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <!-- <el-input placeholder="请输入学号" class="input"></el-input> -->
        <!-- <el-input placeholder="请输入学号" v-model="form.studentNum" class="input"></el-input>
        <el-input placeholder="请输入姓名" v-model="form.studentName" class="input"></el-input>-->
        <el-button @click="handleSearch" class="button">查询</el-button>
      </div>
    </div>

    <!-- isMain -->
    <el-table
      v-if="isMain"
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
      <el-table-column align="center" label="课程" width="95">
        <template slot-scope="scope" v-if="scope.row.courses">
          {{ `${scope.row.courses[0].name}` }}
          <!-- <div>
           
              <ul>
                <li v-for="item in scope.row.courses" >
                   {{ item.name }} 
                      
                </li>
              </ul>
          </div> -->
        </template>
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
          <el-button @click="handledelete(scope.row.id)">答题</el-button>
          <el-button @click="handleview(scope.row.id)">查看</el-button>
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

    <!-- isSecond -->
    <el-table
      v-if="isSecond"
      v-loading="listLoading"
      :data="myArr"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column align="center" label="课程" width="95">
        <template slot-scope="scope">
          {{ `${scope.row.course}` }}
          <!-- <div>
           
              <ul>
                <li v-for="item in scope.row.courses" >
                   {{ item.name }} 
                      
                </li>
              </ul>
          </div> -->
        </template>
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
    <el-dialog
      :title="editDialog.title"
      :visible.sync="editDialog.visible"
      width="50%"
    >
      <div v-html="this.content"></div>
      <div>
        <el-button @click="editDialog.visible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, deletequiz, getoList, getcourseList } from '@/api/table'
import { getquizbyid } from '@/api/dashboard'
import { quizList, coueseList } from '@/api/menu'
export default {
  name: 'xSheng',
  data() {
    return {
      myList: null,
      myArr: null,
      isMain: true,
      isSecond: false,
      list: null,
      listLoading: true,
      form: '',
      quizzes: null,
      quizList: null,
      courses: null,
      courselist: [],

      content: '',
      editDialog: {
        title: '新建课程',
        visible: false,
        type: '',
      },
    }
  },
  //   computed:{
  //     iaCourse:{
  //         get(){
  //             console.log(this.list)
  //         }
  //     }
  //   },
  created() {
    this.fetchData()
  },
  methods: {
    handSearch(MyCourseName) {
      this.isMain = false
      this.isSecond = true
      let odatarout = ''
      odatarout = MyCourseName
      console.log(odatarout)
      this.listLoading = true
      getoList(odatarout).then(({ data }) => {
        this.list = data.value
        this.list.forEach((item, index) => {
          let myQuizzes = item.quizzes
          myQuizzes.forEach((item, index) => {
            var myObj = {}
            myObj = { course: this.courses, name: item.name }
            item.myObj = myObj
          })
        })
        this.myArr = []
        // this.myList = {};
        for (let i = 0; i < this.list[0].quizzes.length; i++) {
          this.myArr.push(this.list[0].quizzes[i].myObj)
          // [].push.apply(myList,this.list[0].quizzes[i].myObj)
        }
        this.listLoading = false
      })
    },
    handleSearch() {
      this.handSearch(this.courses)
    },
    handleview(id) {
      this.$router.push({
        name: 'stuAnswer',
        params: {
          id,
        },
      })
    },
    handledelete(id) {
      this.$router.push({
        name: 'stuDati',
        params: {
          id,
        },
      })
    },
    toEidt(id) {
      this.$router.push({
        path: '/dashboard',
        query: {
          replace: 1,
          id: id,
        },
      })
    },
    toTest(id) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].id == id) {
          this.content = this.list[i].markdown
        }
      }
      this.editDialog = {
        title: '试卷预览',
        visible: true,
        type: 'add',
        method: 'put',
      }
    },
    fetchData() {
      console.log(this.$route.query.name)
      if (this.$route.query.name) {
        this.handSearch(this.$route.query.name)
      }
      this.isMain = true
      this.isSecond = false
      this.listLoading = true
      getcourseList().then(({ data }) => {
        this.list = data.value
        console.log(this.list)
        // let courseName = [];
        // let senderName = [];
        // this.list.forEach((item, index) => {
        //     courseName[index] = item.courses;
        //     console.log(courseName);
        // })

        this.listLoading = false
      })
      coueseList().then(({ data }) => {
        this.courselist = data.value
      })
    },
  },
}
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