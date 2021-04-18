import Taro from "@tarojs/taro";
import moment from "moment";
import React, { useEffect } from "react";
import { Button, View } from "@tarojs/components";
import "./index.less";
import { BASE_URL } from "@const";

export default function Login() {
  useEffect(() => {
    getSessions();
  }, []);
  //获得openid
  const getSessions = () => {
    Taro.login({
      success: (res) => {
        console.log(res);
        Taro.request({
          url: `${BASE_URL}/auth/getSession`,
          method: "GET",
          data: {
            code: res.code,
          },
        })
          .then((result) => {
            Taro.setStorageSync("openid", result.data.data.openid);
          })
          .catch((error) => {
            console.log(error.message);
          });
      },
    });
  };
  //登录
  const getUserInfo = (e: any) => {
    wx.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const userInfo = res.userInfo;
        userInfo.openid = Taro.getStorageSync("openid");
        userInfo.createTime = moment().unix();
        Taro.setStorageSync("userInfo", userInfo);
        console.log(userInfo);
        Taro.request({
          url: `${BASE_URL}/auth/login`,
          method: "GET",
          data: { userInfo },
        }).then((resp) => {
          console.log(resp.data.data.userId);
          Taro.setStorageSync("userId", resp.data.data.userId);
          Taro.switchTab({ url: "/pages/Mine/index" });
        });
      },
    });
  };
  return (
    <View>
      <Button onClick={getUserInfo}>
        微信授权
      </Button>
    </View>
  );
}
