import Taro, { useDidShow } from "@tarojs/taro";

import React, { useEffect, useState } from "react";
import { View, Image, Text } from "@tarojs/components";

import "./index.less";
import { Article } from "@interface";
import { BASE_URL } from "@const";
import ArticleItem from "@components/articleItem";
import InformationItem from "@components/informationItem";

export default function Index() {
  const [loveList, setLoveList] = useState<Article[]>([]);
  const [reviewList, setReviewList] = useState<Article[]>([]);

  useDidShow(() => {
    Taro.request({
      url: `${BASE_URL}/article/sortByLove`,
    }).then((res) => {
      setLoveList(res.data);
    });
    Taro.request({
      url: `${BASE_URL}/article/sortByReviewSize`,
    }).then((res) => {
      setReviewList(res.data);
    });
  });
  return (
    <View>
      <InformationItem type={0}></InformationItem>
      <InformationItem type={1}></InformationItem>
      <InformationItem type={2}></InformationItem>
      <InformationItem type={3}></InformationItem>

      <View className="module">
        <View className="title">热评</View>
        <View>
          {reviewList?.map((article) => (
            <View key={article._id}>
              <ArticleItem article={article} />
            </View>
          ))}
        </View>
      </View>
      <View className="module">
        <View className="title">大家最爱</View>
        <View>
          {loveList?.map((article) => (
            <View key={article._id}>
              <ArticleItem article={article} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
