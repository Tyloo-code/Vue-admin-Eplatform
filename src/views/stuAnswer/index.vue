<template>
  <div>
  <el-button class="button" type="primary" icon="el-icon-download" @click="download">下载报告</el-button>
  <div id="demo">
  <div class="content">
  <div class="title" v-if="this.list">
      {{this.list[0].quiz.name}}
  </div>
  <div class="ma" v-if="this.list">
      <div v-html="this.list[0].quiz.markdown"></div>
  </div>
  <div class="line_01">答题纸 分隔线</div>
  <br><br>
  <div v-for="(item,index) in list" :key="index" class="outer">
    <div v-if="item.studentAnswers">
      <div v-for="(item, index) in item.studentAnswers" :key="index" class="inner">
        <div v-if="item.question.questionType === '图'">
           {{`题目：${item.question.stem}`}} <br> <img :src="item.imagePath"/>
        </div>
        <div v-if="item.question.questionType === '填空' || item.question.questionType === '简答' || item.question.questionType === '表格'">
           {{`题目：${item.question.stem}`}} <br> {{`答案：${item.answer}`}} 
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</div>
  
</template>

<script>
import { getStudentAnswers } from '@/api/answer'
import htmlToPdf from "@/utils/htmlToPdf"
export default {
    name:'stuAnswer',
    data(){
      return {
        list: null,
        listLoading: true,
      }
    },
    created(){
      this.fetchData();
    },
    methods:{
      fetchData(){
        this.listLoading = true
        /**
         * todo 学号变量替换
         */
        let studentId = this.$store.getters.num;
        let quizId = this.$route.params.id;
        getStudentAnswers(studentId, quizId).then(({ data }) => {
          this.list = data.value;
          this.listLoading = false
        })
      },
      download(){
        htmlToPdf.downloadPDF(document.querySelector("#demo"),`${this.list[0].quiz.name}+caoshanshan`)
      },
    },
   
}
</script>

<style scoped>
  .line_01{
    padding: 0 20px 0;  
    margin: 20px 0;  
    line-height: 10px;  
    border-left: 400px dashed #ddd;  
    border-right: 400px dashed #ddd;  
    text-align: center;  
  }
  .content{
    position: relative;
    height: 100%;
  }
  .inner{
    font-size: 26px;
    padding: 10px;
    border: 2px solid black;
  }
  .ma{
    font-size: 20px;
    padding-bottom: 30px;
    
  }
  .title{
    font-size: 30px;
    text-align:  center;
    padding: 10px;
    color: rgb(10, 36, 151);
    position: sticky;
    top: 10px;
  }
</style>
