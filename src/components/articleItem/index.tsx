import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";

export default function ArticleItem(props: any) {
  const { article } = props;
  return (
    <View>
      <View>{article.title}</View>
      <View>{article.context}</View>
      <View>{article.author?.nickName}</View>
      <Image src={article.author?.avatarUrl}></Image>
    </View>
  );
}
