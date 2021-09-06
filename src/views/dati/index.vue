<template>
  <div>
    <div class="title">
      {{this.myList.name}}
    </div>
  <div class="outer"> 
    
    <div class="left">
      <div v-html="this.myList.markdown"></div>
    </div>
    <div class="right">

    <!-- 分类判断：为表格时如下处理 -->
    <div v-if="this.isBiaoButton">
      <el-button @click="tableAdd">添加表格</el-button>
     <div v-if="isShow">
      <el-table v-for="(item, index) in list" :key="index"
      :data="item"
      border
      style="width: 100%">
      <el-table-column  width="160" >
        <template slot-scope="scope">
           <el-form :model="scope.row" ref="scope.row" >
              <el-form-item prop="address0">
                <div>
                    <el-input v-show="true" size="small" v-model="scope.row.address0" 
                      placeholder="输入数据" style="width:100px" ></el-input>
                    <!-- <span class="bgxianshi">{{scope.row.address}}</span> -->
                </div>
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>

       <el-table-column  width="160" >
        <template slot-scope="scope">
           <el-form :model="scope.row" ref="scope.row" >
              <el-form-item prop="address1">
                    <el-input v-show="true" size="small" v-model="scope.row.address1" 
                      placeholder="输入数据" style="width:100px" ></el-input>
                      <!-- <span class="bgxianshi">{{scope.row.address1}}</span> -->
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>

       <el-table-column width="160" >
        <template slot-scope="scope">
           <el-form :model="scope.row" ref="scope.row" >
              <el-form-item prop="address2">
                    <el-input v-show="true" size="small" v-model="scope.row.address2" 
                      placeholder="输入数据" style="width:100px"  ></el-input>
                      <!-- <span class="bgxianshi">{{scope.row.address2}}</span> -->
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>

       <el-table-column  width="160" >
        <template slot-scope="scope">
           <el-form :model="scope.row" ref="scope.row" >
              <el-form-item prop="address3">
                    <el-input v-show="true" size="small" v-model="scope.row.address3"
                      placeholder="输入数据" style="width:100px"  ></el-input>
                      <!-- <span class="bgxianshi">{{scope.row.address3}}</span> -->
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>
    </el-table>

        </div>
    </div>

    <!-- 分类判断：为图片时如下处理 -->
   <div v-if="this.myList">
     <div v-for="(item,index) in isTupian" :key="index">
       {{item.questionType}}:{{item.stem}}
       <el-upload
        action="http://podolski.cn:5002/api/Upload"
        ref="pictureUpload"
        list-type="picture-card"
        :show-file-list="true"
        :accept="'image/*'"
        :auto-upload="true"
        :on-success="handleSuccess"
        :on-error="handleError">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
      </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    </div>
  </div>

    <!-- 分类判断：为填空时如下处理 -->
    <div v-if="this.myList">
      <div v-for="(item,index) in isTiankong" :key="index">
      {{item.questionType}}:{{item.stem}}
      <el-input 
        type="text"
        v-model="item.label"
        @input="changeInput(item,index)"
      ></el-input>
      </div>
    </div>

    <!-- 分类判断：为简答时如下处理 -->
     <div v-if="this.myList">
      <div v-for="(item,index) in isJianda" :key="index">
      {{item.questionType}}:{{item.stem}}
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="item.label"
        @input="changeArea(item,index)">
      </el-input>
      </div>
    </div> 
    <el-button @click="submit">测试</el-button>

    </div>
  </div>

  </div>
</template>

<script>
import { getQuestion, getQuizzes,putaAnswers ,putStudentAnswers,getStudentAnswers} from "@/api/xSheng"
import { getToken, setToken, removeToken } from '@/utils/auth'
import jwt_decode from 'jwt-decode'
export default {
  name:'stuDati',
  data() {
    return{
      myToken:{
        num:null,
        name:'',
        role:'',
      },
      myImagePath:'',
      isBiaoButton: false,
      isShow:false,
      tableContent:[],
      listLoading:'',
      myList:'',
      myTitle:'',
      myListLoading:'',
      studentId:'7190276',
      studentName:'css',
      myAnswer:'',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      questionGroupe:[],
        list0: [
        {
          address0: "",
          address1: "",
          address2: "",
          address3: "",
        },//对象个数是行数，内部有几个属性是列数
        {
          address0: "",
          address1: "",
          address2: "",
          address3: "",
        },
        {
          address0: "",
          address1: "",
          address2: "",
          address3: "",
        },
        ],
      list: {},
      arrList:[],
      studentAnswerGroup:{
        student:{
          id: "123124",
          name: "gf",
          // isMale: null,
          role: "Student",
          phoneNumber: null,
        },
        quiz:{
          id:this.$route.params.id * 1,
          name:'',
          markdown:'',
        },
        studentAnswers: [
          {
          answer:'',
          imagePath: '',
          score: 0,
          question: {
            id: null,
            standardAnswer: '',
            questionType: '',
            imagePath: '',
            position: null,
            score: null,
            row: null,
            column: null,
            }
         }
        ],
       },
    }
  },

  computed:{
    isTiankong: {
      get(){
        return this.myList.questions.filter((item) => {
          return item.questionType === '填空';
        })
      },
      set(v){
        this.item = v;
        v.forEach(item => {
          console.log(item.label)
        })
      }
    },
    isJianda:{
      get(){
        return this.myList.questions.filter((item) => {
          return item.questionType === '简答';
        })
      },
      set(v){
        this.item = v;
        v.forEach(item => {
          console.log(item.label)
        })
      }
    },
    isBiaoge:{
      get(){
        return this.myList.questions.filter((item) => {
          return item.questionType === '表格';
        })
      },
      set(v){
        this.item = v;
        v.forEach(item => {
          console.log(item.label)
        })
      }
    },
     isTupian: {
      get(){
        return this.myList.questions.filter((item) => {
          return item.questionType === '图';
        })
      },
      set(v){
        this.item = v;
        v.forEach(item => {
          console.log(item.label)
        })
      }
    },
  },
  created(){
    this.fetchData1();
    
    this.myToken.num = jwt_decode(getToken()).sub
    this.myToken.name = jwt_decode(getToken()).name
    this.myToken.role = jwt_decode(getToken()).role

     
  },
  mounted(){
 
  
  },

  methods:{
    tableAdd(){
      this.isBiaoge.forEach((item) => {
        Object.defineProperty(this.list,`list${item.id}`,{
          value:[{
          address0: "",
          address1: "",
          address2: "",
          address3: "",
        },//对象个数是行数，内部有几个属性是列数
        {
          address0: "",
          address1: "",
          address2: "",
          address3: "",
        },
        {
          address0: "",
          address1: "",
          address2: "",
          address3: "",
        }],
        enumerable: true,
        configurable: true,
        })
      })
      this.isShow = true
      this.list = Object.assign({},this.list)
      this.arrList = Object.values(this.list)
      this.isBiaoge.forEach((item,index) => {
        item.position = this.arrList[index]
      }) 
     
    },
    fetchData1() {
        this.myListLoading = true
        getQuizzes().then(({ data }) => {
          this.myList = data.value
          this.myListLoading = false
     
        for(let i = 0; i < this.myList.length; i++){
          
          if(this.myList[i].id == this.$route.params.id){
            this.myList = this.myList[i]
          }
        }
        // 修改quiz字段
        this.studentAnswerGroup.quiz.id = this.myList.id ;
        this.studentAnswerGroup.quiz.name = this.myList.name;
        this.studentAnswerGroup.quiz.markdown = this.myList.markdown;
        // 修改student字段
        this.studentAnswerGroup.student.id = this.myToken.num;
        this.studentAnswerGroup.student.name = this.myToken.name;
        this.studentAnswerGroup.student.role = this.myToken.role;


        for(let i = 0; i < this.myList.questions.length; i++){
          if(this.myList.questions[i].questionType === "表格"){
            this.isBiaoButton = true;
          }
        }
        
        // console.log(this.myList);
        
        this.questionGroupe = new Array(this.myList.questions.length);
        for(let i = 0; i < this.myList.questions.length; i++){
          this.questionGroupe[i] = JSON.parse(JSON.stringify(this.myList.questions[i]));
        }
      })
    },
    changeInput(data,index){
      this.isTiankong[index].label = data.label;
      let arrInput = [];
      this.isTiankong.forEach(item => {
        arrInput.push(item);
      });
      // this.isTiankong = arrInput;
    },
    changeArea(data,index){
      this.isJianda[index].label = data.label;
      let arrArea = [];
      this.isJianda.forEach(item => {
        arrArea.push(item);
      });
      // this.isJianda = arrArea;
    },
    changeBiao(data,index){
      this.isBiaoge[index].label = data.label;
      let arrBiao = [];
      this.isBiaoge.forEach(item => {
        arrBiao.push(item);
      });
      //  this.isBiaoge = arrBiao;
    },
    handleSuccess(response) {
      this.$message.success("上传成功");
      this.myImagePath = `https://homeworksystem.podolski.cn/${response.value}`;
      console.log(this.myImagePath);
    },
    handleError() {
      this.$message.error("上传失败,请重新上传图片!");
    },
    handleRemove (file,index) { 
      this.$refs.pictureUpload[0].uploadFiles=[];
      this.$message.success("删除成功");
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    submit(){
      this.myAnswer = this.myList;
      this.myAnswer = JSON.parse(JSON.stringify(this.myAnswer).replace(/id/,"quizId"))
      this.myAnswer = JSON.parse(JSON.stringify(this.myAnswer).replace(/name/g,"student"))
      this.myAnswer.questions.forEach(item => {
        delete(item.imagePath);
        delete(item.questionType);
        delete(item.row);
        delete(item.score);
        delete(item.standardAnswer);
      })
      console.log(this.myAnswer.questions);
      delete(this.myAnswer.markdown);
     

      let quesAnswer = new Array(this.myList.questions.length).fill('请填写答案');
      for(let i = 0; i < this.myAnswer.questions.length; i++){
        if(this.myAnswer.questions[i].position !== 0){
          this.myAnswer.questions[i] = JSON.parse(JSON.stringify(this.myAnswer.questions[i]).replace(/position/g,"studentAnswer"))
        }
        if(this.myAnswer.questions[i].label){
            this.myAnswer.questions[i] = JSON.parse(JSON.stringify(this.myAnswer.questions[i]).replace(/label/g,"studentAnswer"))
        }
        this.myAnswer.questions[i] = JSON.parse(JSON.stringify(this.myAnswer.questions[i]).replace(/column/g,"quizId"))
        this.myAnswer.questions[i].quizId = this.myAnswer.quizId;

        quesAnswer[i] = this.myAnswer.questions[i].studentAnswer
        if(Object.prototype.toString.call(quesAnswer[i]) === '[object Array]'){
          quesAnswer[i] = JSON.stringify(this.myAnswer.questions[i].studentAnswer)
        }
        
      }
      

      // this.myAnswer.student = {
      //   id: this.studentId,
      //   name:this.studentName
      // }
      
      this.studentAnswerGroup.studentAnswers = [];
      for(let i = 0; i < this.myList.questions.length; i++){
         this.studentAnswerGroup.studentAnswers.push({
            answer:quesAnswer[i],
            imagePath: this.myImagePath,
            score: 0,
            question:this.questionGroupe[i],
          })
      }
      
      console.log(this.studentAnswerGroup);
     
      putStudentAnswers(this.studentAnswerGroup).then(({ data }) => {
        
        this.$message.success(`添加成功`);
        this.studentAnswerGroup.studentAnswers = [];
      })



      // putaAnswers(this.myAnswer).then(() => {
        
      //   this.$message.success(`添加成功`);
      //   this.fetchData();
      // })
      // let stuQuestion = []
      // this.isTiankong.forEach(item => {
      //   stuAnswer.push(item.label)
      // })
      // console.log(stuAnswer)

      // console.log(this.isJianda)
      // console.log(this.isBiaoge)
    },
  },

}
</script>

<style scoped>
  body {
    overflow-x:hidden;
    overflow-y:hidden;
  }
  .title{
    font-size: 30px;
    text-align:  center;
    padding: 10px;
    color: rgb(10, 36, 151);
    position: sticky ;
    top: 0px;
  }
  .outer{
    display: flex;
    flex-flow:row;
  }
  .left{
    width: 50%;
    height: 1000px;
    border-right: 2px solid #dddddd;
    overflow-y: scroll;
    font-size: 20px;
  }
  .right{
    padding-left: 15px;
    flex: 1;
    height: 1000px;
    overflow-y: scroll;
    font-size: 20px;
  }

</style>