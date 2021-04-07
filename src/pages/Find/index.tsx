import Taro, { useDidShow } from "@tarojs/taro";

import React, { useEffect, useState } from "react";
import { View, Image, Text } from "@tarojs/components";

import "./index.less";
import { Article } from "@interface";
import { BASE_URL } from "@const";
import ArticleItem from "@components/articleItem";

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
      <View className="module">
        <View>江农掠影</View>
        <View>
          <Image src="https://cdn.nlark.com/yuque/0/2021/jpeg/529418/1617298396135-40c26a1d-8c82-4baf-957f-6026a044a90b.jpeg"></Image>
          <View>江农新校门正式开放</View>
        </View>
      </View>
      <View className="module">
        <View>江农美食</View>
        <View>
          <Image src="https://cdn.nlark.com/yuque/0/2021/jpeg/529418/1617298547330-d52adeba-387a-4cee-906c-9f2232cebf04.jpeg?x-oss-process=image/auto-orient,1"></Image>
          <View>江农杨腾干锅鹅，大家都吃过。</View>
        </View>
      </View>
      <View className="module">
        <View>江农快报</View>
        <View>
          <View>56色油菜花荣登头条，大家快来围观。</View>
          <View>56色油菜花荣登头条，大家快来围观。</View>
          <View>56色油菜花荣登头条，大家快来围观。</View>
        </View>
      </View>
      <View className="module">
        <View>热评</View>
        <View>
          {reviewList?.map((article) => (
            <View key={article._id}>
              <ArticleItem article={article} />
            </View>
          ))}
        </View>
      </View>
      <View className="module">
        <View>大家最爱</View>
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
