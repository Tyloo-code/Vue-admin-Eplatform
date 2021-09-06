<template>
  <div class="home">
    <div id="demo">
    <!-- <p>1</p> -->
    <el-button class="button" type="primary" icon="el-icon-download" @click="download">下载报告</el-button>
    <el-input v-model="input" placeholder="请输入姓名" class="stuName"></el-input>
    <span style="color:white">{{input}}</span>
    <br>
    <el-input v-model="input1" placeholder="请输入学号" class="stuNum"></el-input>
    <span style="color:white">{{input1}}</span>
    <center class="title" >实验1 信号的基本运算实验</center>    <br>
    <span class="t1">1.1 实验目的</span>    <br>
    <span class="cont">&nbsp;&nbsp;1. 了解各基本运算单元的构成。</span>    <br>
    <span class="cont">&nbsp;&nbsp;2. 掌握信号时域运算的运算法则。</span>   <br>
    <span class="t1">1.2 实验设备</span> <br>
    <span class="cont">&nbsp;&nbsp;MATLAB SIMULINK仿真工具箱</span>    <br>
    <span class="t1">1.3 实验原理及内容</span>    <br>
    <span class="cont">&nbsp;&nbsp;信号在时域中的运算有相加、相减、相乘、数乘、微分、积分等。</span>    <br>    
    <span class="cont">&nbsp;&nbsp;1. 相加：信号在时域中相加时，其横轴（时间轴）的横坐标值不变，仅是将横坐标值所对应的纵坐标值相加。
            实验中加法器的电路如图 1-3-1 所示，此为两输入加法器。</span>
    <!-- <img class="pict" src="../../assets/shiyan01/1-3-1.png" alt=""> -->
    <span class="cont">&nbsp;&nbsp;加法器完成功能：OUT = IN1 + IN2</span>     <br>
    <span class="cont">&nbsp;&nbsp;2. 相减：信号在时域中相减时，其横轴（时间轴）的横坐标值不变，仅是将横坐标值所对
            应的纵坐标值相减。实验中减法器的电路如图 1-3-2 所示。</span>     <br>
    <!-- <img class="pict" src="../../assets/shiyan01/1-3-2.png" alt=""> -->
    <span class="cont">&nbsp;&nbsp;减法器完成功能：OUT = IN2 - IN1</span>     <br>
    <span class="cont">&nbsp;&nbsp;3. 数乘：信号在时域中倍乘时，其横轴（时间轴）的横坐标值不变，仅是将横坐标值所对应的纵坐标值扩大 n 倍。
        （n&gt;1 时扩大；0&lt;n&lt;1 时减小）。实验中数乘器如图 1-3-3 所示。</span>
    <!-- <img class="pict" src="../../assets/shiyan01/1-3-3.png" alt=""> -->
    <span class="cont">&nbsp;&nbsp;数乘器完成功能： OUT=Rp/R*IN</span>
    <br>
    <span class="cont">&nbsp;&nbsp;4. 微分：信号在时域微分即是对信号求一阶导数。实验中微分器电路如图 1-3-5 所示。</span>
    <!-- <img class="pict" src="../../assets/shiyan01/1-3-5.png" alt=""> -->
    <span class="cont">&nbsp;&nbsp;5. 积分：信号在时域积分即将信号在（－∞，t）内求一次积分。实验中积分器电路如图 1-3-6所示。</span>
    <!-- <img class="pict" src="../../assets/shiyan01/1-3-6.png" alt="">    <br> -->
    <span class="t1">1.4 实验步骤</span>    <br>
    <span class="cont">&nbsp;&nbsp;本实验在MATLAB SIMULINK仿真平台完成。</span>  <br>
<!-- --------------------------------------------------------------------------------------------- -->
    <span class="cont">&nbsp;&nbsp;1. 相加运算 </span>  <br>
    <span class="cont">&nbsp;&nbsp;在SIMULINK连接电路（如图 1-3-1），产生频率为 1KHz的正弦信号和直流信号，
      分别接入 IN1 和 IN2。调节不同的参数，用示波器输出 OUT 端并完成下表。 </span>  <br>
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
                    <span class="bgxianshi">{{scope.row.address}}</span>
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
                      <span class="bgxianshi">{{scope.row.address1}}</span>
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
                      <span class="bgxianshi">{{scope.row.address2}}</span>
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
                      <span class="bgxianshi">{{scope.row.address3}}</span>
                </div>
                    <div v-else>{{ scope.row.address3 }}</div>
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>
    </el-table>
    </div>   

    <span class="cont">&nbsp;&nbsp;当正弦信号为 1～-1V、直流信号为 2V 时的参考实验结果波形如图 1-3-7 所示</span>
    <span class="cont">实验中也可以输入其他信号，观察其输出波形。</span> <br>

  <el-form>
    <el-form-item class="relese_nameP" label="实验图片上传：">
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="1"
      :on-change="getLocalImg1"
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
    <div class="logo_img">
          <div v-if="isHidden" class="logo_img_title">实验图片预览</div>
          <img v-else :src="releseList.logo1" />
        </div>
    </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <span class="cont">实验结论</span> <br>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea1">
    </el-input>
    <span style="display:none">{{textarea1}}</span>
<!-- ---------------------------------------------------------------------------  -->
    <span class="cont">2. 减法运算</span> <br>
    <span class="cont">在SIMULINK连接电路（如图 1-3-2），产生频率为 1KHz的正弦信号和直流信号，
      分别接入 IN1 和 IN2。调节不同的参数，用示波器输出 OUT 端并完成下表。</span> <br>
    <div class="biaoUpload">
      <el-table
      :data="list1"
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
                      <span class="bgxianshi">{{scope.row.address}}</span>
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
                      <span class="bgxianshi">{{scope.row.address1}}</span>
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
                      <span class="bgxianshi">{{scope.row.address2}}</span>
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
                      <span class="bgxianshi">{{scope.row.address3}}</span>
                </div>
                    <div v-else>{{ scope.row.address3 }}</div>
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>
    </el-table>
    </div>   
   <el-form>
    <el-form-item class="relese_nameP" label="实验图片预览上传：">
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="1"
      :on-change="getLocalImg2"
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
    <div class="logo_img">
          <div v-if="isHidden" class="logo_img_title">实验图片预览</div>
          <img v-else :src="releseList.logo2" />
        </div>
    </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <span class="cont">实验结论</span> <br>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea2">
    </el-input>
    <span style="display:none">{{textarea2}}</span>
<!-- ------------------------------------------------------------------------------- -- -->
    <span class="cont"> 3. 数乘运算</span> <br>
    <span class="cont">在SIMULINK连接电路（如图 1-3-3），产生一路正弦波信号，接入 IN。调节不同参数，
      用示波器输出 OUT 并完成下表。实验中数乘器的放大倍数为 Rp/R，所以调节电位器 Rp 便可以改变放大倍数。
      正弦波进行数乘运算，其输出还应该是正弦波信号，且频率不变，仅幅值发生变化。</span> <br>
    <div class="biaoUpload">
      <el-table
      :data="list2"
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
                <div v-if='scope.$index !== 0 && scope.$index !== 1 && scope.$index !== 2'>
                    <el-input v-show="true" size="small" v-model="scope.row.address" 
                      placeholder="输入数据" style="width:100px"  @blur="handleEditPric(scope.row, $event)"></el-input>
                      <span class="bgxianshi">{{scope.row.address}}</span>
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
                 <div v-if='scope.$index !== 0 && scope.$index !== 1 && scope.$index !== 2'>
                    <el-input v-show="true" size="small" v-model="scope.row.address1" 
                      placeholder="输入数据" style="width:100px"  @blur="handleEditPric(scope.row, $event)"></el-input>
                      <span class="bgxianshi">{{scope.row.address1}}</span>
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
                <div v-if='scope.$index !== 0 && scope.$index !== 1 && scope.$index !== 2'>
                    <el-input v-show="true" size="small" v-model="scope.row.address2" 
                      placeholder="输入数据" style="width:100px"  @blur="handleEditPric(scope.row, $event)"></el-input>
                      <span class="bgxianshi">{{scope.row.address2}}</span>
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
                 <div v-if='scope.$index !== 0 && scope.$index !== 1 && scope.$index !== 2'>
                    <el-input v-show="true" size="small" v-model="scope.row.address3"
                      placeholder="输入数据" style="width:100px"  @blur="handleEditPric(scope.row, $event)"></el-input>
                      <span class="bgxianshi">{{scope.row.address3}}</span>
                </div>
                    <div v-else>{{ scope.row.address3 }}</div>
              </el-form-item>
           </el-form>
        </template>
      </el-table-column>
    </el-table>
    </div>   
     <el-form>
    <el-form-item class="relese_nameP" label="实验图片上传：">
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="1"
      :on-change="getLocalImg3"
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
    <div class="logo_img">
          <div v-if="isHidden" class="logo_img_title">实验图片预览</div>
          <img v-else :src="releseList.logo3" />
        </div>
    </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <span class="cont">实验结论</span> <br>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea3">
    </el-input>
    <span style="display:none">{{textarea3}}</span>
<!-- ------------------------------------------------------------------------------  -->
    <span class="cont"> 4. 微分运算</span> <br>
    <span class="cont"> 在SIMULINK连接电路（如图 1-3-5），产生一路正弦波信号，接入 IN。调节不同的参数，用示波器输出 OUT，
        观察其相位与幅值变化。</span> <br>
    <el-form>
    <el-form-item class="relese_nameP" label="实验图片上传：">
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="1"
      :on-change="getLocalImg4"
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
    <div class="logo_img">
          <div v-if="isHidden" class="logo_img_title">实验图片预览</div>
          <img v-else :src="releseList.logo4" />
        </div>
    </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <span class="cont">实验结论</span> <br>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea4">
    </el-input>
    <span style="display:none">{{textarea4}}</span>
<!-- ------------------------------------------------------------------------------------ -->
    <span class="cont"> 5. 积分运算</span> <br>
    <span class="cont"> 在SIMULINK连接电路（如图 1-3-6），产生一路正弦波信号，接入 IN。调节不同的参数，用示波器输出 OUT，
      观察其相位与幅值变化。</span> <br>
    <el-form>
    <el-form-item class="relese_nameP" label="实验图片上传：">
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="1"
      :on-change="getLocalImg5"
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
    <div class="logo_img">
          <div v-if="isHidden" class="logo_img_title">实验图片预览</div>
          <img v-else :src="releseList.logo5" />
        </div>
    </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <span class="cont">实验结论</span> <br>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea5">
    </el-input>
    <span style="display:none">{{textarea5}}</span>
    
    <span class="cont">6. 实验总结论</span> <br>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea6">
    </el-input>
    <span style="display:none">{{textarea6}}</span>

    <span class="cont">7. 实验总结与心得</span> <br>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入内容"
      v-model="textarea7">
    </el-input>
    </div>
    <span style="display:none">{{textarea7}}</span>
    
    <el-button class="button" type="primary" @click="upload">提交</el-button>    <br>
  </div>
   
</template>


<script>
// @ is an alias to /src
// import { getList } from '@/api/baogao'
import htmlToPdf from "@/utils/htmlToPdf";

export default {
  name: "Baogao",
  comments: {},
  data() {
    return {
      releseList:{
					logo1:'',
					logo2:'',
					logo3:'',
					logo4:'',
					logo5:'',
			},
      isHidden:true,
      list: [
        {
          data: "正弦信号",
          name: "IN1(V)",
          address: "1~-1",
          address1: "1~-1",
          address2: "2~-2",
          address3: "3~-3",
        },
        {
          data: "直流信号",
          name: "IN2(V)",
          address: "2",
          address1: "3",
          address2: "1",
          address3: "1",
        },
        {
          data: "输出电压",
          name: "实测(V)",
          address: "",
          address1: "",
          address2: "",
          address3: "",
        },
        {
          data: "OUT",
          name: "估算(V)",
          address: "",
          address1: "",
          address2: "",
          address3: "",
        },
      ],
      list1: [
        {
          data: "正弦信号",
          name: "IN1(V)",
          address: "1~-1",
          address1: "1~-1",
          address2: "2~-2",
          address3: "3~-3",
        },
        {
          data: "直流信号",
          name: "IN2(V)",
          address: "2",
          address1: "3",
          address2: "1",
          address3: "1",
        },
        {
          data: "输出电压",
          name: "实测(V)",
          address: "",
          address1: "",
          address2: "",
          address3: "",
        },
        {
          data: "OUT",
          name: "估算(V)",
          address: "",
          address1: "",
          address2: "",
          address3: "",
        },
      ],
      list2: [
        {
          data: "正弦信号",
          name: "幅值(V)",
          address: "1",
          address1: "2",
          address2: "3",
          address3: "1",
        },
        {
          data: "正弦信号",
          name: "频率(Hz)",
          address: "100",
          address1: "1K",
          address2: "10K",
          address3: "50K",
        },
        {
          data: "正弦信号",
          name: "Rp(KΩ)",
          address: "10",
          address1: "5",
          address2: "2",
          address3: "1",
        },
        {
          data: "输出信号估算",
          name: "幅值(V)",
          address: "",
          address1: "",
          address2: "",
          address3: "",
        },
        {
          data: "输出信号估算",
          name: "频率(Hz)",
          address: "",
          address1: "",
          address2: "",
          address3: "",
        },
        {
          data: "输出信号测量",
          name: "幅值(V)",
          address: "",
          address1: "",
          address2: "",
          address3: "",
        },
        {
          data: "输出信号测量",
          name: "频率(Hz)",
          address: "",
          address1: "",
          address2: "",
          address3: "",
        },
      ],
      listLoading: true,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      textarea1: "",
      textarea2: "",
      textarea3: "",
      textarea4: "",
      textarea5: "",
      textarea6: "",
      textarea7: "",
      input: "",
      input1: "",
    };
  },
  components: {},

  methods: {
    handleRemove(file) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    upload() {
      this.$message.success(`提交成功`);
      console.log("提交成功");
    },
    getLocalImg1(event){
				// 获取上传图片的本地url，用于上传前的本地预览
				let url = '';
				if (window.createObjectURL != undefined) {
					url = window.createObjectURL(event.raw);
				} else if (window.URL != undefined) {
					url = window.URL.createObjectURL(event.raw);
				} else if (window.webkitURL != undefined) {
					url = window.webkitURL.createObjectURL(event.raw);
				}
				this.releseList.logo1 = url;
				this.isHidden = false;
			},
    getLocalImg2(event){
				// 获取上传图片的本地url，用于上传前的本地预览
				let url = '';
				if (window.createObjectURL != undefined) {
					url = window.createObjectURL(event.raw);
				} else if (window.URL != undefined) {
					url = window.URL.createObjectURL(event.raw);
				} else if (window.webkitURL != undefined) {
					url = window.webkitURL.createObjectURL(event.raw);
				}
				this.releseList.logo2 = url;
				this.isHidden = false;
			},
    getLocalImg3(event){
				// 获取上传图片的本地url，用于上传前的本地预览
				let url = '';
				if (window.createObjectURL != undefined) {
					url = window.createObjectURL(event.raw);
				} else if (window.URL != undefined) {
					url = window.URL.createObjectURL(event.raw);
				} else if (window.webkitURL != undefined) {
					url = window.webkitURL.createObjectURL(event.raw);
				}
				this.releseList.logo3 = url;
				this.isHidden = false;
			},
    getLocalImg4(event){
				// 获取上传图片的本地url，用于上传前的本地预览
				let url = '';
				if (window.createObjectURL != undefined) {
					url = window.createObjectURL(event.raw);
				} else if (window.URL != undefined) {
					url = window.URL.createObjectURL(event.raw);
				} else if (window.webkitURL != undefined) {
					url = window.webkitURL.createObjectURL(event.raw);
				}
				this.releseList.logo4 = url;
				this.isHidden = false;
			},
    getLocalImg5(event){
				// 获取上传图片的本地url，用于上传前的本地预览
				let url = '';
				if (window.createObjectURL != undefined) {
					url = window.createObjectURL(event.raw);
				} else if (window.URL != undefined) {
					url = window.URL.createObjectURL(event.raw);
				} else if (window.webkitURL != undefined) {
					url = window.webkitURL.createObjectURL(event.raw);
				}
				this.releseList.logo5 = url;
				this.isHidden = false;
			},
    download() {
      htmlToPdf.downloadPDF(
        document.querySelector("#demo"),
        `${this.input1}+${this.input}+实验一`
      );
    },
    handleEditPric(item, e) {},
  },
};
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 1000;
}
.t1 {
  font-size: 20px;
  line-height: 40px;
  padding-left: 5px;
  padding-top: 5px;
}
.cont {
  font-size: 17px;
  line-height: 30px;
  padding-left: 20px;
  padding-right: 10px;
}
.pict {
  display: block;
  height: 250px;
  padding: 10px;
  margin: 0 auto;
}
.biao {
  display: block;
  height: 150px;
  padding: 5px;
  margin: 0 auto;
}
/* .biao1{
    display: block;
    height: 200px;
    padding: 5px;
    margin: 0 auto
  } */
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
  border-color: #409eff;
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
.stuName {
  width: 25%;
}
.stuNum {
  width: 25%;
}
.bgxianshi {
  color: #fff;
}
</style>