<template>
  <div class="about">
    <el-upload
        action="/api/upload/image"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handSuccess"
        :on-error="handSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-form ref="form" :model="form" label-width="80px">
      <div v-for="item in form">
        <el-form-item label="识别结果">
          <el-input type="textarea" v-model="item.orc_data"></el-input>
        </el-form-item>
        <div>可能的mac地址</div>
        <a v-for="mac in item.mac">
          <a>{{ mac }}</a>   <el-button type="success" icon="el-icon-copy-document" @click="copy(mac)" circle></el-button>

        </a>
      </div>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handSuccess(response, file, fileList) {
      this.form.push(response.data)
    },
    test() {
      this.$axios.get("test").then(res => {
        alert(res)
      })
    },
    copy(content) {
      var input = document.createElement("input");   // 直接构建input
      input.value = content;  // 设置内容
      document.body.appendChild(input);    // 添加临时实例
      input.select();   // 选择实例内容
      document.execCommand("Copy");   // 执行复制
      document.body.removeChild(input); // 删除临时实例
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
  }
}
</script>
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">立即创建</el-button>-->
<!--          <el-button>取消</el-button>-->
<!--        </el-form-item>-->