import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import moment from "moment";
import React from "react";
import { Article } from "src/interface";
import "./index.less";

interface Props {
  article: Article;
}

export default function ArticleItem(props: Props) {
  const { article } = props;

  const goArticleInfoById = (id: string) => {
    Taro.navigateTo({ url: `/pages/Second/ArticleInfo/index?id=${id}` });
  };
  return (
    <View
      className="article_item_layout"
      onClick={() => goArticleInfoById(article._id)}
    >
      <View style={{ display: "flex", justifyContent: "start" }}>
        <Image
          style={{ width: "88rpx", height: "88rpx" }}
          src={article.author?.avatarUrl}
        ></Image>
        <View>{article.author?.nickName}</View>
      </View>
      <View>
        <View>标题：{article.title}</View>
        <View>内容：{article.context}</View>
      </View>
      <View>
        <View>
          创建时间：
          {moment
            .unix(Number(article.createTime))
            .format("YYYY-MM-DD hh:m:ss") || ""}
        </View>
      </View>
    </View>
  );
}
