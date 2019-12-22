<template>
  <div class="reg">
    <h1 class="header">注册</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetForm('ruleForm')">注册</el-button>
        <el-button @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      //年龄
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
        age: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        age: [{ required: true, validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].validate(valid => {
        //所有校验规则都成立，触发
        if (valid) {
          this.$axios
            .post("http://ddiyy.cn:4000/reg", {
              username: this.ruleForm.username,
              password: this.ruleForm.checkPass,
              age: this.ruleForm.age
            })
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  showClose: true,
                  message: "用户名已被注册",
                  type: "error"
                });
              }
              if (res.data.code === 2) {
                this.$message({
                  showClose: true,
                  message: "注册失败",
                  type: "error"
                });
              }
              if (res.data.code === 0) {
                this.$message({
                  showClose: true,
                  message: "注册成功",
                  type: "success"
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style scoped>
.reg {
  width: 500px;
  height: 300px;
  margin: 150px auto;
  padding: 0 30px 50px 0;
  border-radius: 10px;
  color: #dbe4f5;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px #111;
}

>>> .el-form-item__label {
  color: #dbe4f5;
}
>>> .el-input__inner {
  color: #dbe4f5;
  background-color: rgba(0, 0, 0, 0);
}
.header {
  width: 100%;
  height: 50px;
  font: 25px/50px "微软雅黑";
  text-align: center;
}
@media screen and (max-width: 600px) {
  .reg {
    width: 90%;
  }
}
@media screen and (max-width: 400px) {
  .reg {
    width: 360px;
  }
}
</style>