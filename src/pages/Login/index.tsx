import Taro from "@tarojs/taro";
import React, { useEffect } from "react";
import { Button, View } from "@tarojs/components";
import "./index.less";

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
          url: "http://localhost:3000/auth/getSession",
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
    const userInfo = e.detail.userInfo;
    userInfo.openid = Taro.getStorageSync("openid");
    console.log(userInfo);
    Taro.request({
      url: "http://localhost:3000/auth/login",
      method: "GET",
      data: { userInfo },
    }).then((res) => {
      console.log(res.data.data.userId);
      Taro.setStorageSync("userId", res.data.data.userId);
      Taro.switchTab({ url: "/pages/Mine/index" });
    });
  };
  return (
    <View>
      <View>Hello Word</View>
      <Button openType="getUserInfo" onGetUserInfo={getUserInfo}>
        微信授权
      </Button>
    </View>
  );
}
