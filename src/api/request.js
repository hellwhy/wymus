import apiaxios from "./network";
import qs from "qs";

const base = {
  // 登录
  login(data, callback) {
    apiaxios.post("api/?do=login", qs.stringify(data)).then((res) => {
      callback(res);
    });
  },
  // 打卡
  daka(callback) {
    // /?do=daka
    apiaxios.post("api/?do=daka").then((res) => {
      callback(res);
    });
  },
  // 签到
  qiandao(callback) {
    apiaxios.post("api/?do=sign").then((res) => {
      callback(res);
    });
  },
};

export default base;
