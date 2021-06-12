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
  const goCanvas = () => {
    Taro.navigateTo({ url: "/pages/Other/Canvas/index" });
  };
  useEffect(() => {
    Taro.request({
      url: `${BASE_URL}/auth/getUserInfo`,
      method: "GET",
      data: { openid },
    }).then((res) => {
      setIsAdimin(res.data.data.isAdmin);
    });
  }, []);
  return (
    <View>
      <View style={{ display: "flex" }}>
        <OpenData type="userAvatarUrl" />
        <View>
          <View>
            昵称：
            <OpenData type="userNickName" />
          </View>
          <View>
            性别：
            <OpenData type="userGender" />
          </View>
          <View>
            地区：
            <OpenData type="userProvince" />
            <OpenData type="userCity" />
          </View>
          <View>
            语言：
            <OpenData type="userLanguage" />
          </View>
        </View>
      </View>

      <View>
        功能
        <View>
          {!userId ? (
            <Button onClick={login}>登录</Button>
          ) : (
            <View>
              <Button onClick={goCreateArticle}>添加文章</Button>
              <Button onClick={goArticleList}>我的文章</Button>
              {isAdmin && <Button onClick={goAdminPage}>管理员页面</Button>}
              <Button onClick={goToolBox}>工具箱</Button>
              <Button onClick={goCanvas}>Canvas测试</Button>
              <Button onClick={loginOut}>登出</Button>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
