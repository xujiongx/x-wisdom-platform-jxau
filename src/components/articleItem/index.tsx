import { View, Image, Button, Textarea, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import moment from "moment";
import React, { useState } from "react";
import { BASE_URL } from "@const";
import { Article } from "@interface";
import "./index.less";

interface Props {
  article: Article;
}

export default function ArticleItem(props: Props) {
  const { article } = props;
  const [openReview, setOpenReview] = useState(false);
  const [reviewContext, setReviewContext] = useState("");
  const [love, setLove] = useState("");
  const [reviews, setReviews] = useState(article.review);

  const goArticleInfoById = (id: string) => {
    Taro.navigateTo({ url: `/pages/Second/ArticleInfo/index?id=${id}` });
  };
  const handlePraise = () => {
    Taro.request({
      url: `${BASE_URL}/article/praise`,
      method: "POST",
      data: { id: article._id },
    }).then((res) => {
      console.log("praise", res.data.love);
      setLove(res.data.love);
    });
  };
  const handleReview = (e) => {
    const createTime = moment().unix();
    const review = {
      context: reviewContext,
      createTime,
      author: Taro.getStorageSync("userInfo"),
    };
    Taro.request({
      url: `${BASE_URL}/article/review`,
      method: "POST",
      data: { id: article._id, review },
    }).then((res) => {
      console.log("review", res.data.review);
      setReviews(res.data.review);
    });
    setOpenReview(false);
  };
  const handleContextChange = (e) => {
    const value = e.target.value;
    setReviewContext(value);
  };

  return (
    <View className="article_item_layout">
      <View onClick={() => goArticleInfoById(article._id)}>
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
      <View>
        <Button onClick={handlePraise}>点赞{love || article.love}</Button>
        <Button onClick={() => setOpenReview(true)}>评论</Button>
        <View>
          {reviews.map((item, index) => (
            <View key={item._id}>
              <Image
                src={item.author.avatarUrl}
                style={{ width: "20px", height: "20px" }}
              />
              <Text>{item.author.nickName}:</Text>
              <Text>{item.context}</Text>
            </View>
          ))}
        </View>
        {openReview && (
          <View>
            <Textarea
              placeholder="请输入评论"
              value={reviewContext}
              onInput={handleContextChange}
              style={{ margin: "20rpx 10rpx" }}
            ></Textarea>
            <Button onClick={handleReview}>评论</Button>
          </View>
        )}
      </View>
    </View>
  );
}
