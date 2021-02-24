import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { Button, View } from "@tarojs/components";
import "./index.less";

export default function Mine() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    getSessions();
  }, []);
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
      setUserId(Taro.getStorageSync("userId"));
    });
  };
  return (
    <View>
      <View>Hello Word</View>
      {!userId && (
        <Button openType="getUserInfo" onGetUserInfo={getUserInfo}>
          登录
        </Button>
      )}
    </View>
  );
}
