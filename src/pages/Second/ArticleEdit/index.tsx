import Taro, { useRouter } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { Button, Input, Label, Textarea, View } from "@tarojs/components";
import "./index.less";
import { BASE_URL } from "@const";
import { Article } from "@interface";

export default function ArticleCreate() {
  const {
    params: { id },
  } = useRouter();
  const [article, setArticle] = useState<Article>({} as any);

  useEffect(() => {
    Taro.request({
      url: `${BASE_URL}/article/findById`,
      method: "GET",
      data: { id },
    }).then((res) => {
      setArticle(res.data);
    });
  }, [id]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setArticle({ ...article, title: value });
  };
  const handleContextChange = (e) => {
    const value = e.target.value;
    setArticle({ ...article, context: value });
  };

  const onSubmit = () => {
    Taro.request({
      url: `${BASE_URL}/article/update`,
      method: "POST",
      data: { id, ...article },
    }).then((res) => {
      Taro.navigateTo({ url: `/pages/Second/ArticleInfo/index?id=${id}` });
    });
  };
  return (
    <View className="article_edit_layout">
      <Input
        type="text"
        value={article.title}
        placeholder="请输入标题"
        onInput={handleTitleChange}
      ></Input>
      <Textarea
        placeholder="请输入内容"
        value={article.context}
        onInput={handleContextChange}
      ></Textarea>
      <Button onClick={onSubmit}>保存</Button>
    </View>
  );
}
