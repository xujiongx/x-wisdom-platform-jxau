import React, { useEffect, useState } from "react";
import Taro from '@tarojs/taro'
import { Radio, RadioGroup, View } from "@tarojs/components";
import Swiper from "@components/swiper";
import { Article } from "@interface";
import { BASE_URL } from "@const";
import ArticleItem from "@components/articleItem";
import "./index.less";

const imgUrlList = [
  {
    url:
      "https://th.bing.com/th/id/Rc04ffd9553ec3eac5e33261b8af3c2ab?rik=BXyU3ZCfCfL3tQ&riu=http%3a%2f%2fpicture.ik123.com%2fuploads%2fallimg%2f170710%2f12-1FG0140Q6.jpg&ehk=bcxI%2fRjAAZ0w4RaLa36zVxRxW%2f3jY0VM7A1De41%2bk%2fc%3d&risl=&pid=ImgRaw",
  },
  {
    url:
      "https://th.bing.com/th/id/Rea8aa507e047709937b5184fba680e7e?rik=Xlpde4NK4X2zPA&riu=http%3a%2f%2fimg18.3lian.com%2fd%2ffile%2f201709%2f21%2f1ed530692e2801ad33cf73a654f52602.jpg&ehk=30RLz4GZoASSlJvr%2fxpXymRetGqpjKH4lTt0Omx0Srw%3d&risl=&pid=ImgRaw",
  },
  {
    url:
      "https://th.bing.com/th/id/Rfa97616d135d21d38eb8c9dcf2168bc0?rik=mKkY6%2bIeyOu27g&riu=http%3a%2f%2fimg17.3lian.com%2fd%2ffile%2f201701%2f07%2f429d390ac1caac614324009b02afc9d6.jpg&ehk=6i7B%2b01Gf8jFbSdQtNiCPnl6fOuJaX5E3bEMGLl8E4I%3d&risl=&pid=ImgRaw",
  },
  {
    url:
      "https://th.bing.com/th/id/Rfd129c8ff6f3cbbe3e98d27cc14fc350?rik=1LY7g%2fpmpR3gcw&riu=http%3a%2f%2fimg1.3lian.com%2f2015%2fa1%2f136%2fd%2f239.jpg&ehk=ptHlo1n97%2bpgDK2ySc6pMgEv2oU0rZ8LTgmPE1yVyXM%3d&risl=&pid=ImgRaw",
  },
];

export default function Mine() {
  const [articleList, setArticleList] = useState<Article[]>([] as any);
  const [type, setType] = useState("news");
  useEffect(() => {
    Taro.request({
      url: `${BASE_URL}/article/findByType`,
      method: "GET",
      data: { type },
    }).then((res) => {
      console.log(res, res.data);
      setArticleList(res.data);
    });
  }, [type]);

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
  };
  useEffect(() => {
    console.log("唧唧咋咋广场");
  }, []);
  return (
    <View>
      <View>
        <Swiper data={imgUrlList} />
        <View>唧唧咋咋广场</View>
      </View>
      <View>
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
    </View>
  );
}
