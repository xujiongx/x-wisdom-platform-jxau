import Taro from "@tarojs/taro";
import moment from "moment";
import React, { useState } from "react";
import {
  Button,
  Editor,
  Form,
  Input,
  Textarea,
  View,
} from "@tarojs/components";
import "./index.less";

export default function ArticleCreate() {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const handleContextChange = (e) => {
    const value = e.target.value;
    setContext(value);
  };
  const onSubmit = () => {
    const createTime = moment().unix();
    console.log(111, title);
    const article = {
      title,
      context,
      type: "news",
      createTime,
      author: Taro.getStorageSync("userInfo"),
    };
    Taro.request({
      url: "http://localhost:3000/article/create",
      method: "POST",
      data: { ...article },
    }).then((res) => {
      const id = res.data._id;
      Taro.navigateTo({ url: `/pages/Second/ArticleInfo/index?id=${id}` });
    });
  };
  return (
    <View>
      <Input
        type="text"
        value={title}
        placeholder="请输入标题"
        onBlur={handleTitleChange}
      ></Input>
      <Textarea
        placeholder="请输入内容"
        value={context}
        onBlur={handleContextChange}
      ></Textarea>
      <View>{title}</View>
      <View>{context}</View>
      <Button onClick={onSubmit}>创建</Button>
    </View>
  );
}
