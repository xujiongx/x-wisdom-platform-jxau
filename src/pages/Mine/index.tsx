import Taro, { useDidShow } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { Button, OpenData, View } from "@tarojs/components";
import "./index.less";
import { BASE_URL } from "@const";

export default function Mine() {
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdimin] = useState(false);
  const openid = Taro.getStorageSync("openid");
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
  const goAdminPage = () => {
    Taro.navigateTo({ url: "/pages/Admin/index" });
  };
  const goToolBox = () => {
    Taro.navigateTo({ url: "/pages/ToolBox/index" });
  };
  useEffect(() => {
    Taro.request({
      url: `${BASE_URL}/auth/getUserInfo`,
      method: "GET",
      data: { openid },
    }).then((res) => {
      console.log(1122, res.data.data);
      setIsAdimin(res.data.data.isAdmin);
    });
  }, []);
  return (
    <View>
      <OpenData type="userNickName" />
      <OpenData type="userAvatarUrl" />
      {!userId ? (
        <Button onClick={login}>登录</Button>
      ) : (
        <View>
          <Button onClick={goCreateArticle}>添加文章</Button>
          <Button onClick={goArticleList}>我的文章</Button>
          {isAdmin && <Button onClick={goAdminPage}>管理员页面</Button>}
          <Button onClick={goToolBox}>工具箱</Button>
          <Button onClick={loginOut}>登出</Button>
        </View>
      )}
    </View>
  );
}
