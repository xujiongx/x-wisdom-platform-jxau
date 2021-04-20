import Taro, { useRouter } from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { Button, Input, Textarea, View } from "@tarojs/components";
import "./index.less";
import { BASE_URL } from "@const";
import { Article } from "@interface";
import FileUpload from "@components/fileUpload";

export default function ArticleCreate() {
  const {
    params: { id },
  } = useRouter();
  const [article, setArticle] = useState<Article>({} as any);
  const [imgUrl, setImageUrl] = useState("");

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
      data: { id, ...article, imgUrl },
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
        style={{ width: "100%" }}
        placeholder="请输入内容"
        value={article.context}
        onInput={handleContextChange}
      ></Textarea>
      <FileUpload src={article.imgUrl} getUrl={(url) => setImageUrl(url)}></FileUpload>
      <Button onClick={onSubmit}>保存</Button>
    </View>
  );
}
