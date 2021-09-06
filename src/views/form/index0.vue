<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="题目">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addtopic">增加题目</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
<!--添加题目 -->


<el-radio-group v-model="direction"> </el-radio-group>
      <!-- <el-form-item label="题目类型">
        <el-select v-model="form.region" placeholder="请选择题目类型">
          <el-option label="文字内容" value="neirong" />
          <el-option label="表格" value="biaoge" />
          <el-option label="单选" value="danxuan" />
          <el-option label="多选" value="duoxuan" />
          <el-option label="填空" value="tiankong" />
          <el-option label="图" value="tu" />
          <el-option label="问答" value="wenda" />
        </el-select>
      </el-form-item> -->
      <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    请选择题目类型<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">文字内容</el-dropdown-item>
    <el-dropdown-item command="b">表格</el-dropdown-item>
    <el-dropdown-item command="c">单选</el-dropdown-item>
    <el-dropdown-item command="d" >多选</el-dropdown-item>
    <el-dropdown-item command="e" >填空</el-dropdown-item>
    <el-dropdown-item command="f" >图</el-dropdown-item>
    <el-dropdown-item command="g" >问答</el-dropdown-item>
  </el-dropdown-menu>
      </el-dropdown>

      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    addtopic() {}
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

