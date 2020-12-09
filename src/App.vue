<template>
  <div id="app">
    <div class="boximg">
      <van-image width="2rem" height="2rem" round :src="src" />
    </div>
    <div class="loginin" v-if="id == ''">
      <van-cell-group>
        <van-field
          type="tel"
          v-model="phone"
          label="账号"
          maxlength="28"
          placeholder="请输入手机号"
        />
        <van-field
          type="password"
          v-model="pwd"
          label="密码"
          maxlength="18"
          placeholder="请输入密码"
        />
      </van-cell-group>
      <van-button
        class="buttons"
        style=""
        @click="postwork"
        type="info"
        round
        size="normal"
        block
        >登录</van-button
      >
    </div>
    <div class="loginup" v-else>
      <van-button
        class="buttons"
        @click="upclick"
        type="info"
        round
        size="normal"
        block
        >打卡</van-button
      ><van-button
        class="buttons"
        @click="qiandao"
        type="primary"
        round
        size="normal"
        block
        >签到</van-button
      >
      <van-button
        class="buttons"
        @click="logout"
        type="primary"
        round
        size="normal"
        block
        >退出</van-button
      >
    </div>
    <div class="bottoms">
      <div>
        <van-divider dashed>work</van-divider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      phone: "",
      pwd: "",
      src:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607423529100&di=072512484ea3e36ca71be109b188b503&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F21%2F20200621151319_vmoze.thumb.400_0.jpeg",
      id: "",
    };
  },
  methods: {
    // 登录接口
    postwork() {
      // 整理数据结构 对密码进行md5加密
      let from = {
        uin: this.phone,
        pwd: this.$md5(this.pwd),
      };
      // 如果账号 和 密码 都不是空 就弹出提示框 并发送请求
      if (this.phone !== "" && this.pwd !== "") {
        var totas = this.$toast.loading({
          duration: 100000,
          message: "登录中",
          forbidClick: true,
        });
        // 调用请求
        this.$api.request.login(from, (res) => {
          // 如果code是200 证明请求成功
          if (res.data.code == 200) {
            // 把src 和 id赋值
            this.src = res.data.profile.avatarUrl;
            this.id = res.data.account.id;
            // 清空提示框
            totas.clear();
            // 如果id不是空 就提示登录成功
            if (this.id !== "") {
              this.$notify({ type: "success", message: "登录成功" });
            }
          } else {
            // 清空提示框
            totas.clear();
            // 报错提示框
            this.$toast.fail("登录失败，请重试");
          }
        });
      } else {
        // 账号或密码不存在或错误
        this.$notify({
          type: "warning",
          message: "请输入账号和密码",
        });
      }
    },
    // 退出
    logout() {
      // id给空
      this.id = "";
    },
    // 打卡
    upclick() {
      // 提示框
      var totas = this.$toast.loading({
        duration: 100000,
        message: "打卡中",
        forbidClick: true,
      });
      // 打卡请求接口
      this.$api.request.daka((res) => {
        // 如果code是200 证明请求成功 进行打卡
        if (res.data.code == 200) {
          // 清空提示框
          totas.clear();
          // 提示框
          this.$notify({
            type: "success",
            message: "打卡成功，建议多打几次，防止歌曲重复打卡失败",
          });
        } else {
          // 如果code不是200 证明请求有问题 请重试
          this.$notify({
            type: "warning",
            message: "请重试",
          });
        }
      });
    },
    // 签到
    qiandao() {
      // 调用接口
      this.$api.request.qiandao((res) => {
        // 如果返回数据 小于1 可能是重复签到 或者 有其他问题
        if (res.code < 1) {
          // 提示信息
          this.$notify({
            type: "warning",
            message: res.data.msg,
          });
        } else {
          // 提示信息
          this.$notify({
            type: "success",
            message: res.data.msg,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.boximg {
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}
/deep/ .van-button {
  margin-top: 0.5rem;
}
.bottoms {
  position: absolute;
  bottom: 0;
}
</style>
