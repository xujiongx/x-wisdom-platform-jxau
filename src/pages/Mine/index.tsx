import Taro, { useDidShow } from "@tarojs/taro";
import React, { useState } from "react";
import { Button, View } from "@tarojs/components";
import "./index.less";

export default function Mine() {
  const [userId, setUserId] = useState("");
  useDidShow(() => {
    setUserId(Taro.getStorageSync("userId"));
  });
  const login = () => {
    Taro.navigateTo({ url: "/pages/Login/index" });
  };
  return (
    <View>
      <View>Hello Word</View>
      {!userId && <Button onClick={login}>登录</Button>}
    </View>
  );
}
