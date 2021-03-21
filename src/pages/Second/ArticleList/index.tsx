import Taro, { useRouter } from "@tarojs/taro";
import ArticleItem from "../../../components/articleItem";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import "./index.less";

interface User {
  readonly avatarUrl: string;
  readonly city: string;
  readonly country: string;
  readonly gender: string;
  readonly language: string;
  readonly nickName: string;
  readonly openid: string;
  readonly province: string;
  readonly createTime: string;
}

interface Article {
  readonly _id: string;
  readonly title: string;
  readonly context: string;
  readonly type: string;
  readonly createTime: string;
  readonly author: User;
}

export default function ArticleInfo() {
  const openid = Taro.getStorageSync("openid");

  const [articleList, setArticleList] = useState<Article[]>([] as any);

  useEffect(() => {
    Taro.request({
      url: "http://localhost:3000/article/findByOpenid",
      method: "GET",
      data: { openid },
    }).then((res) => {
      console.log(res, res.data);
      setArticleList(res.data);
    });
  }, [openid]);

  return (
    <View>
      {articleList.map((article) => (
        <View key={article._id}>
          <ArticleItem article={article} />
        </View>
      ))}
    </View>
  );
}
