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
  const [love, setLove] = useState(article.love);
  const [reviewSize, setReviewSize] = useState(article.reviewSize);
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
      setLove(res.data.love);
      setReviewSize(res.data.setReviewSize);
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
      setReviews(res.data.review);
    });
    setOpenReview(false);
    setReviewContext("");
  };
  const handleReviewClose = () => {
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
        <Button onClick={() => setOpenReview(true)}>
          评论{reviewSize || article.reviewSize}
        </Button>
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
              style={{ width: "100%", margin: "20rpx 10rpx" }}
            ></Textarea>
            <View style={{ display: "flex" }}>
              <Button onClick={handleReview}>确定</Button>
              <Button onClick={handleReviewClose}>取消</Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
