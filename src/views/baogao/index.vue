<template>
  <div class="home">
    <div id="demo">
    <!-- <p>我是主界面</p> -->
    <el-button class="button" type="primary" icon="el-icon-download" @click="download">下载报告</el-button>
    
    <center class="title" >实验1 信号的基本运算实验</center>
    <br>
    <span class="t1">一、 实验目的</span>
    <br>
    <span class="cont">1. 了解各基本运算单元的构成。</span>
    <br>
    <span class="cont">2. 掌握信号时域运算的运算法则。</span>
    <br>
    <span class="t1">二、 实验原理及内容</span>
    <br>
    <span class="cont">信号在时域中的运算有相加、相减、相乘、数乘、微分、积分等。</span>
    <br>
    <span class="cont">1. 相加：信号在时域中相加时，其横轴（时间轴）的横坐标值不变，仅是将横坐标值所对应的纵坐标值相加。
            实验中加法器的电路如图 1-3-1 所示，此为两输入加法器。</span>
    <img class="pict" src="../../assets/1-3-1.png" alt="">
    <span class="cont">加法器完成功能：OUT = IN1 + IN2</span>
    
     <br>
    <span class="t1">三、 Simulink仿真电路图和仿真结果</span><br>
    <span class="cont">1. 相加运算 </span><br>
    <span class="cont">①Simulink仿真电路图 </span><br>
   
    <div class="pictureUpload">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false">
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
            @click="handleDownload(file)"
          >
            <i class="el-icon-download"></i>
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

    <span class="cont">②仿真结果 </span><br>
    <span class="cont">（1）表1-1：加法器电路估算、仿真结果对比 </span><br>


    <div class="biaoUpload">
      <el-table
      :data="list"
      border
      style="width: 100%">
      <el-table-column
        prop="data"
        label="表1-1"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label=""
        width="180">
      </el-table-column>
      <el-table-column label="第一列"  width="160" >
        <template slot-scope="scope">
           <el-form :model="scope.row" ref="scope.row" >
              <el-form-item prop="address">
                <div v-if='scope.$index == 2 || scope.$index == 3'>
                    <el-input v-show="true" size="small" v-model="scope.row.address" 
                      placeholder="输入数据" style="width:100px"  @blur="handleEditPric(scope.row, $event)"></el-input>
                </div>
                    <div v-else>{{ scope.row.address }}</div>
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>


       <el-table-column label="第二列"  width="160" >
        <template slot-scope="scope">
           <el-form :model="scope.row" ref="scope.row" >
              <el-form-item prop="address1">
                <div v-if='scope.$index == 2 || scope.$index == 3'>
                    <el-input v-show="true" size="small" v-model="scope.row.address1" 
                      placeholder="输入数据" style="width:100px"  @blur="handleEditPric(scope.row, $event)"></el-input>
                </div>
                    <div v-else>{{ scope.row.address1 }}</div>
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>

       <el-table-column label="第三列"  width="160" >
        <template slot-scope="scope">
           <el-form :model="scope.row" ref="scope.row" >
              <el-form-item prop="address2">
                <div v-if='scope.$index == 2 || scope.$index == 3'>
                    <el-input v-show="true" size="small" v-model="scope.row.address2" 
                      placeholder="输入数据" style="width:100px"  @blur="handleEditPric(scope.row, $event)"></el-input>
                </div>
                    <div v-else>{{ scope.row.address2 }}</div>
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>

       <el-table-column label="第四列"  width="160" >
        <template slot-scope="scope">
           <el-form :model="scope.row" ref="scope.row" >
              <el-form-item prop="address3">
                <div v-if='scope.$index == 2 || scope.$index == 3'>
                    <el-input v-show="true" size="small" v-model="scope.row.address3"
                      placeholder="输入数据" style="width:100px"  @blur="handleEditPric(scope.row, $event)"></el-input>
                </div>
                    <div v-else>{{ scope.row.address3 }}</div>
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>
    </el-table>
    </div>   

        
    <span class="t1">四、主要结论</span><br>
    <span class="cont">1. 各基本运算单元的构成</span><br>
    <el-input
      type="textarea"
      :autosize="{ minRows: 5, maxRows: 10}"
      placeholder="请输入内容"
      v-model="textarea1">
    </el-input>
    <br>

    <span class="cont">2. 信号时域运算的运算法则</span><br>
    <el-input
      type="textarea"
      :autosize="{ minRows: 5, maxRows: 10}"
      placeholder="请输入内容"
      v-model="textarea2">
    </el-input>
    </div>
    <el-button class="button" type="primary" @click="upload">提交</el-button>
    <br>
    </div>
   
</template>


<script>
// @ is an alias to /src
import { getList } from '@/api/baogao'
import htmlToPdf from "@/utils/htmlToPdf"

export default {
  name: "Baogao",
  comments:{

  },
  data() {
    return {
      list: null,
      list1: null,
      listLoading: true,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      textarea1: '',
      textarea2: '',
    }
  },
  components: {
  },
  created() {
    this.fetchData()
  },
  methods: {
      fetchData() {
        this.listLoading = true
        getList().then(({ data }) => {
          console.log(data)
          this.list = data.items
          this.listLoading = false
        })
      },
      handleRemove(file) {
          console.log(file);
        },
      handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
      handleDownload(file) {
          console.log(file);
      },
      upload() {
        console.log('提交成功');
      },
      download(){
        htmlToPdf.downloadPDF(document.querySelector("#demo"),"baogao0报告")
      },
      handleEditPric(item, e) {
        item.address = Number(e.target.value)
        console.log(item)
        console.log(item.address)
        let arr = [item.address,item.address1,item.address2,item.address3]
        console.log(arr)
       
      }
    //   validScore(scope){
    //     console.log(scope)
               
    //     let arr = scope.row.address
    //     let arr1 = scope.row.address1
    //     let arr2 = scope.row.address2
    //     let arr3 = scope.row.address3

    //     console.log(arr)
    //     console.log(arr1)
    //     console.log(arr2)
    //     console.log(arr3)
       
    // },
  },
  
};
</script>

<style scoped>
  .title{
    font-size: 24px;
    font-weight: 1000;
  }
  .t1{
     font-size: 20px;
     line-height: 40px;
  }
  .cont{
    font-size: 17px;
    line-height: 30px;
    padding-left: 15px;
    padding-right: 10px;
  }
  .pict{
    display: block;
    height: 250px;
    padding: 10px;
    margin: 0 auto
  }
  .biao{
    display: block;
    height: 130px;
    padding: 5px;
    margin: 0 auto
  }
  .biao1{
    display: block;
    height: 200px;
    padding: 5px;
    margin: 0 auto
  }
  .button {
    float: right;
    color: #fff;
    background-color: #409eff;
    }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>