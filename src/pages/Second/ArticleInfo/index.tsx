import Taro, { useRouter } from "@tarojs/taro";
import { Article } from "@interface/index";
import { BASE_URL } from "@const";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { View, Button, Image, Text, Textarea } from "@tarojs/components";
import "./index.less";

export default function ArticleInfo() {
  const {
    params: { id },
  } = useRouter();

  const [article, setArticle] = useState<Article>({} as any);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [openReview, setOpenReview] = useState(false);
  const [reviewContext, setReviewContext] = useState("");

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
  const handlePraise = () => {
    Taro.request({
      url: `${BASE_URL}/article/praise`,
      method: "POST",
      data: { id: article._id },
    }).then((res) => {
      console.log("praise", res.data.love);
      setArticle(res.data);
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
      setArticle(res.data);
    });
    setOpenReview(false);
  };

  const handleContextChange = (e) => {
    const value = e.target.value;
    setReviewContext(value);
  };

  useEffect(() => {
    Taro.request({
      url: `${BASE_URL}/article/findById`,
      method: "GET",
      data: { id },
    }).then((res) => {
      console.log(res, res.data);
      setArticle(res.data);
      setIsAuthor(res.data.author.openid == Taro.getStorageSync("openid"));
    });
  }, [id]);

  return (
    <View className="article_info_layout">
      <View style={{ margin: "20rpx 10rpx" }}>
        <View
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Image
            style={{ width: "88rpx", height: "88rpx" }}
            src={article.author?.avatarUrl}
          ></Image>
          <View>{article.author?.nickName}</View>
        </View>
        <View>
          <View>标题：{article.title}</View>
          <View>
            内容：<Text>{article.context}</Text>
          </View>
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
      {isAuthor && (
        <View>
          <Button onClick={articleFix}>修改</Button>
          <Button onClick={articleDelete}>删除</Button>
        </View>
      )}
            <View>
        <Button onClick={handlePraise}>点赞{article.love}</Button>
        <Button onClick={() => setOpenReview(true)}>评论</Button>
        <View>
          {article.review?.map((item, index) => (
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
