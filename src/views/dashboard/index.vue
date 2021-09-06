<template>
<keep-alive>
  <div id="editor">
    <el-form>
      <el-form-item label="题目">
        <el-input type="edit" placeholder="请输入实验题目" v-model="quiz.name" style="width: 600px"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="addtopic">插入题目</el-button>

    <el-form ref="modelForm" label-position="right" label-width="100px">
      <vuedraggable v-model="quiz.questions" class="wrapper" @end="end">
        <div v-for="(item, index) in quiz.questions" :key="index">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">第{{ index+1 }}题答案</template>
              <el-form-item label="题目类型" label-width="110px">
                <el-radio-group v-model="item.questionType">
                  <!-- <el-radio
                    v-for="(items) in questiontype"
                    :key="items.id"
                    :label="items.id"
                  >{{items.type}}</el-radio> -->
                  <el-radio label="填空">填空</el-radio>
                  <el-radio label="简答">简答</el-radio>
                  <el-radio label="图">图</el-radio>
                  <el-radio label="表格">表格</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="题目" label-width="110px" prop="fleetNum">
                <el-input
                  v-model="item.stem"
                  type="edit"
                  style="width:258px"
                  placeholder="请填写题目描述"
                />
              </el-form-item>
              <el-form-item label="分值" label-width="110px" prop="fleetNum">
                <el-input
                  v-model="item.score"
                  type="edit"
                  style="width:258px"
                  placeholder="请填写问题分值"
                />
              </el-form-item>
              <el-form-item v-show="item.questionType=='表格'" label="表格行列数">
                <el-input v-model="item.row" style="width:258px" placeholder="请输入表格行数" />
                <el-input v-model="item.column" style="width:258px" placeholder="请输入表格列数" />
              </el-form-item> 
              <el-form-item label="参考答案" label-width="110px" prop="fleetNum">
                <el-input
                  v-model="item.standardAnswer"
                  type="edit"
                  style="width:258px"
                  placeholder="请填写参考答案"
                />
              </el-form-item>
              <!-- <el-form-item v-show="item.type==2" label="参考答案" label-width="110px" prop="fleetNum">
                <el-button>上传图片</el-button>
              </el-form-item> -->
              <el-button @click="removetopic">删除题目</el-button>
            </el-collapse-item>
          </el-collapse>
        </div>
      </vuedraggable>
    </el-form>
    <editor-bar v-model="quiz.markdown" :isClear="isClear" />

    <!-- <mavon-editor style="height: 100%" v-model="report"></mavon-editor> -->
    <div>
      <el-button @click="submit">提交</el-button>
      <el-button @click="totest">预览</el-button>
    </div>
    <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="40%">
                <div v-html="this.quiz.markdown"></div>
                <div>
                    <el-button @click="editDialog.visible = false">取消</el-button>
                </div>
    </el-dialog>
    <!-- <div>
      <button @click="toTest">跳转生成页面</button>
    </div> -->
  </div>
  </keep-alive>
</template>
<script>
import vuedraggable from "vuedraggable";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import EditorBar from "../../components/WangEnduit/index";
import {
  putquizzes,
  getquizzes,
  putquestions,
  getquizbyid
} from "@/api/dashboard";

const content = ``;

export default {
  name: "Dashboard",
  components: {
    mavonEditor,
    vuedraggable,
    EditorBar
    // or 'mavon-editor': mavonEditor
  },
  data() {
    return {
      i: Number,
      quiz: {
        
        name: "",
        markdown: "",
        questions: []
      },
      questiontype: [],
      question: {
        standardAnswer: "",
        
        quizId: null,
        row: null,
        column: null
      },
      isClear: false,
      detail: "",
      report: content,
      topic: "",
      dashboard: {
        courses: "",
        topic: "",
        report: ""
      },
      topictype: "kong",
      modelForm: {
        topic: []
      },
      courses: [],
      editDialog: {
        title: '试卷预览',
        visible: false
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    end(evt) {
      this.$refs.modelForm.clearValidate();
    },
    addtopic() {
      this.quiz.questions.push({  standardAnswer: "",score:'',stem:"" });
      var inde = this.quiz.questions.length;
      this.quiz.markdown = this.quiz.markdown + "[问题" + inde + "]";

      /* this.editDialog = {
                        title: '新增题目',
                        visible: true,
                        type: 'add',
                        method: 'put'
                    } */
    },
    removetopic(index) {
      /* this.modelForm.topic.splice(index, 1); */
      this.quiz.questions.splice(index, 1)
    },
    addreport() {
      this.report = this.report + "[填空]";
    },
    addanswer() {},
    getquizid(odatamark) {
      getquizzes(odatamark).then(({ data }) => {
        this.ceshi = data.value[0];
        for (let j in this.ceshi) {
          this.question.quizId = this.ceshi[j];
          console.log(this.question.quizId);
          break;
        }
        console.log(this.question.quizId);
        if (this.modelForm.topic[0].type == 3) {
          this.question.row = this.modelForm.topic[0].row;
          this.question.column = this.modelForm.topic[0].column;
        }
        this.question.questionTypeId = this.modelForm.topic[0].type;
        this.question.standardAnswer = this.modelForm.topic[0].standardAnswer;
        this.i = 0;
        this.submitquestion();
      });
    },
    submitquestion() {
      putquestions(this.question).then(({ data }) => {
        this.$message.success(`问题保存成功`);
        if (this.i < this.modelForm.topic.length) {
          this.i = this.i + 1;
          if (this.modelForm.topic[this.i].type == 3) {
            this.question.row = this.modelForm.topic[this.i].row;
            this.question.column = this.modelForm.topic[this.i].column;
          }
          console.log(this.i);
          this.question.questionTypeId = this.modelForm.topic[this.i].type;
          this.question.standardAnswer = this.modelForm.topic[this.i].answer;
          console.log(this.question.questionTypeId);
          console.log(this.question.standardAnswer);
          console.log(this.question.quizId);
          this.submitquestion();
        }
      });
    },
    submit() {
     /*  console.log(this.modelForm.topic.length)
       console.log(this.modelForm.topic) 
      for(let i = 0;i< this.modelForm.topic.length;i++ ) {
        if (this.modelForm.topic[i].type == 3) {
            this.quiz.question.row = this.modelForm.topic[i].row;
            this.quiz.question.column = this.modelForm.topic[i].column;
          }
           this.quiz.question[i].standardAnswer = this.modelForm.topic[i].standardAnswer;
      } */
      
          //this.quiz.question.questionTypeId = this.modelForm.topic[this.i].type;
          
          //console.log(this.quiz.question.questionTypeId);
          console.log(this.quiz)
          console.log(this.quiz.question)
        var guoyi = [{xingming:'gy'},{xuehao:33}]
        console.log(guoyi)
        let id = this.quiz.id
        console.log(id)
      putquizzes(this.quiz).then(({ data }) => {
        this.$message.success(`保存成功`);
        this.$router.push({
        /* name: 'Dashboard', */
        path:'/table',
        query: {
          replace: 2
          }
      })
      });
      /* putquizzes(this.quiz).then(response => {
        this.$message.success(`保存成功`);
        let odatamark = this.quiz.markdown;
        this.getquizid(odatamark);
      }); */
    },
    closeEditDialog() {},
    totest() {
      this.editDialog = {
        title: '预览试卷',
        visible: true
      }
    },
    toTest() {
      this.$router.push({
        name: "Test",
        params: { content: this.quiz.markdown }
      });
    },
    fetchData() {
      this.quiz.name = "";
      this.quiz.markdown = "";
      const query = this.$route.query;
      console.log("guoyi");
      console.log(query);
      if (query.replace == 1 && query.id) {
        getquizbyid(query.id).then(({ data }) => {
          this.quiz.name = data.value[0].name;
          this.quiz.markdown = data.value[0].markdown;
          const len = data.value[0].questions.length;
          console.log(len);
          for (let k = 0; k < len; k++) {
            this.quiz.questions.push({ questionType: "", standardAnswer: "" });
          }
          for (let k = 0; k < len; k++) {
            this.quiz.questions[k].questionType = data.value[0].questions[k].questionType;
            this.quiz.questions[k].standardAnswer = data.value[0].questions[k].standardAnswer;
          }
        });
      }
    }
  }
};
</script>
<style>
#editor {
  margin: auto;
  width: 80%;
}
</style>