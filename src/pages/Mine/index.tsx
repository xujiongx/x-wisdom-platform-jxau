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
  const goCreateArticle = () => {
    Taro.navigateTo({ url: "/pages/Second/ArticleCreate/index" });
  };
  const loginOut = () => {
    Taro.removeStorage({ key: "userId" }).then(() => {
      Taro.reLaunch({ url: "/pages/Mine/index" });
    });
  };
  const goArticleList = () => {
    Taro.navigateTo({ url: "/pages/Second/ArticleList/index" });
  };
  return (
    <View>
      {!userId ? (
        <Button onClick={login}>登录</Button>
      ) : (
        <View>
          <Button onClick={goCreateArticle}>添加文章</Button>
          <Button onClick={goArticleList}>我的文章</Button>
          <Button onClick={loginOut}>登出</Button>
        </View>
      )}
    </View>
  );
}
