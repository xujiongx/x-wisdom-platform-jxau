import Taro, { useRouter } from "@tarojs/taro";
import { Article } from "@interface/index";
import ArticleItem from "@components/articleItem";
import { BASE_URL } from "@const";
import React, { useEffect, useState } from "react";
import { View, Button } from "@tarojs/components";
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
    <View>
      <ArticleItem article={article}></ArticleItem>
      <View>
        <Button onClick={articleFix}>修改</Button>
        <Button onClick={articleDelete}>删除</Button>
      </View>
    </View>
  );
}
