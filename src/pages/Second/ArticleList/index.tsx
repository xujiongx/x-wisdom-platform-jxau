import Taro, { useRouter } from "@tarojs/taro";
import { BASE_URL } from "@const";
import ArticleItem from "@components/articleItem";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { View, Image, RadioGroup, Radio } from "@tarojs/components";
import "./index.less";
import { Article } from "@interface/index";

export default function ArticleInfo() {
  const openid = Taro.getStorageSync("openid");

  const [articleList, setArticleList] = useState<Article[]>([] as any);
  const [type, setType] = useState("news");

  useEffect(() => {
    Taro.request({
      url: `${BASE_URL}/article/findByOpenid`,
      method: "GET",
      data: { openid, type },
    }).then((res) => {
      console.log(res, res.data);
      setArticleList(res.data);
    });
  }, [openid, type]);

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
  };

  return (
    <View className='article_list_layout'>
      <RadioGroup onChange={handleTypeChange}>
        <Radio value="news">动态文章</Radio>
        <Radio value="lost">失物招领</Radio>
        <Radio value="trade">二手交易</Radio>
      </RadioGroup>
      {articleList.map((article) => (
        <View key={article._id}>
          <ArticleItem article={article} />
        </View>
      ))}
    </View>
  );
}
