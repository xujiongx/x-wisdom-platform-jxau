import Taro, { useRouter } from "@tarojs/taro";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Image } from "@tarojs/components";
import "./index.less";
import { Article } from "../../../interface/index";


export default function ArticleInfo() {
  const {
    params: { id },
  } = useRouter();

  const [article, setArticle] = useState<Article>({} as any);

  useEffect(() => {
    Taro.request({
      url: "http://localhost:3000/article/findById",
      method: "GET",
      data: { id },
    }).then((res) => {
      console.log(res, res.data);
      setArticle(res.data);
    });
  }, [id]);

  return (
    <View>
      <View>{article.title}</View>
      <View>{article.context}</View>
      <View>{article.author?.nickName}</View>
      <Image src={article.author?.avatarUrl}></Image>
    </View>
  );
}
