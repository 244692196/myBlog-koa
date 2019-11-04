<template>
  <div class="add">
    <el-form ref="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input placeholder="请输入标题" v-model="detail.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <!--富文本编辑器组件-->
        <el-row v-loading="quillUpdateImg">
          <quill-editor
            v-model="detail.text"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)"
          ></quill-editor>
        </el-row>
        <el-upload
          class="uploader-two"
          action="http://ddiyy.cn:4000/fileUpload"
          :show-file-list="false"
          :on-success="Success"
          :on-error="uploadError"
          :before-upload="beforeUpload"
        ></el-upload>
      </el-form-item>
      <el-form-item>
        <el-button class="butcss" type="primary" @click="onChange">更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  ["blockquote", "code-block"], //引用，代码块
  [{ color: [] }], // 字体颜色
  ["clean"], //清除字体样式
  ["image"] //上传图片、上传视频
];
export default {
  data() {
    return {
      detail: "",
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      // header: { token: sessionStorage.token }, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
      content: "", // 富文本内容
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // alert(1);
                  document.querySelector(".uploader-two input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },

    Success(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.code == 0 && res.filename != null) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, "image", "./static/upload/" + res.filename);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      //loading动画消失
      this.quillUpdateImg = false;
    },

    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    onChange() {
      this.$axios
        .post("http://ddiyy.cn:4000/article/edit", {
          newDetail: this.detail
        })
        .then(msg => {
          msg.data.code === 0 &&
            this.$message({
              showClose: true,
              message: "更改成功",
              type: "success"
            }) &&
            this.$router.push({ path: `/article/${this.$route.params.id}` });
        });
    }
  },
  created() {
    this.$axios
      .get(`http://ddiyy.cn:4000/article/${this.$route.params.id}`)
      .then(res => {
        this.detail = res.data;
      });
  }
};
</script>
<style scoped>
.add {
  width: 700px;
  height: 350px;
  padding: 50px 50px;
  margin: 50px auto;
}
.avatar-uploader {
  display: none;
}
.quill-editor {
  width: 100%;
  height: 250px;
  background-color: #fff;
}
>>> .ql-container.ql-snow {
  border: 0px;
  background-color: #fff;
}
>>> .el-form-item__content {
  line-height: 20px;
}
.butcss {
  position: absolute;
  bottom: -70px;
}
@media screen and (max-width: 800px) {
  .add {
    width: 90%;
    padding: 0;
    margin: 50px 5px;
  }
}
@media screen and (max-width: 400px) {
  .add {
    width: 360px;
  }
}
</style>