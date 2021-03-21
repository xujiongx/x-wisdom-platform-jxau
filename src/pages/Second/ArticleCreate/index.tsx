import Taro from "@tarojs/taro";
import moment from "moment";
import React, { useState } from "react";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  View,
} from "@tarojs/components";
import "./index.less";
import { BASE_URL } from "@const";

export default function ArticleCreate() {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [type, setType] = useState("news");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const handleContextChange = (e) => {
    const value = e.target.value;
    setContext(value);
  };
  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
  };

  const onSubmit = () => {
    const createTime = moment().unix();
    const article = {
      title,
      context,
      type,
      createTime,
      author: Taro.getStorageSync("userInfo"),
    };
    Taro.request({
      url: `${BASE_URL}/article/create`,
      method: "POST",
      data: { ...article },
    }).then((res) => {
      const id = res.data._id;
      Taro.navigateTo({ url: `/pages/Second/ArticleInfo/index?id=${id}` });
    });
  };
  return (
    <View className="article_create_layout">
      <Input
        type="text"
        value={title}
        placeholder="请输入标题"
        onBlur={handleTitleChange}
        style={{ margin: "20rpx 10rpx" }}
      ></Input>
      <Textarea
        placeholder="请输入内容"
        value={context}
        onBlur={handleContextChange}
        style={{ margin: "20rpx 10rpx" }}
      ></Textarea>
      <RadioGroup
        onChange={handleTypeChange}
        style={{ fontSize: "14px", padding: " 10px 2px" }}
      >
        <Radio value="news" checked>
          动态文章
        </Radio>
        <Radio value="lost">失物招领</Radio>
        <Radio value="trade">二手交易</Radio>
      </RadioGroup>
      <View>{title}</View>
      <View>{context}</View>
      <Button onClick={onSubmit}>创建</Button>
    </View>
  );
}
