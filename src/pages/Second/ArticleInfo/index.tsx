import Taro, { useRouter } from "@tarojs/taro";
import { Article } from "@interface/index";
import { BASE_URL } from "@const";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { View, Button, Image, Text } from "@tarojs/components";
import "./index.less";

export default function ArticleInfo() {
  const {
    params: { id },
  } = useRouter();

  const [article, setArticle] = useState<Article>({} as any);

  const articleFix = () => {
    Taro.navigateTo({ url: `/pages/Second/ArticleEdit/index?id=${id}` });
  };

  const articleDelete = () => {
    Taro.showModal({
      title: "提示",
      content: "是否确认删除这条文章？",
      success: function (res) {
        if (res.confirm) {
          console.log("用户点击确定");
          Taro.request({
            url: `${BASE_URL}/article/delete`,
            method: "POST",
            data: { id },
          }).then((rest) => {
            if (rest.data.ok) {
              Taro.showToast({
                title: "成功",
                icon: "success",
                duration: 2000,
              });
              Taro.navigateBack();
            }
          });
        }
      },
    });
  };

  useEffect(() => {
    Taro.request({
      url: `${BASE_URL}/article/findById`,
      method: "GET",
      data: { id },
    }).then((res) => {
      console.log(res, res.data);
      setArticle(res.data);
    });
  }, [id]);

  return (
    <View className="article_info_layout">
      <View style={{ margin: "20rpx 10rpx" }}>
        <View
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Image
            style={{ width: "88rpx", height: "88rpx" }}
            src={article.author?.avatarUrl}
          ></Image>
          <View>{article.author?.nickName}</View>
        </View>
        <View>
          <View>标题：{article.title}</View>
          <View>
            内容：<Text>{article.context}</Text>
          </View>
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

      <View>
        <Button onClick={articleFix}>修改</Button>
        <Button onClick={articleDelete}>删除</Button>
      </View>
    </View>
  );
}
