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
    </div>
    <div></div>
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
    postwork() {
      let from = {
        uin: this.phone,
        pwd: this.$md5(this.pwd),
      };
      if (this.phone !== "" && this.pwd !== "") {
        var totas = this.$toast.loading({
          duration: 100000,
          message: "登录中",
          forbidClick: true,
        });
        this.$api.request.login(from, (res) => {
          if (res.data.code == 200) {
            this.src = res.data.profile.avatarUrl;
            this.id = res.data.account.id;
            totas.clear();
            if (this.id !== "") {
              this.$notify({ type: "success", message: "登录成功" });
            }
          } else {
            totas.clear();
            this.$toast.fail("登录失败，请重试");
          }
        });
      } else {
        this.$notify({
          type: "warning",
          message: "请输入账号和密码",
        });
      }
    },
    upclick() {
      var totas = this.$toast.loading({
        duration: 100000,
        message: "打卡中",
        forbidClick: true,
      });
      this.$api.request.daka((res) => {
        if (res.data.code == 200) {
          totas.clear();
          this.$notify({
            type: "success",
            message: "打卡成功，建议多打几次，防止歌曲重复打卡失败",
          });
        } else {
          this.$notify({
            type: "warning",
            message: "请重试",
          });
        }
      });
    },
    qiandao() {
      this.$api.request.qiandao((res) => {
        if (res.code < 1) {
          this.$notify({
            type: "warning",
            message: res.data.msg,
          });
        } else {
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
</style>
