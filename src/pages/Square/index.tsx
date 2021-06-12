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
      "https://tse3-mm.cn.bing.net/th/id/OIP.phfTIM0ygBXUFv4-GlFdhAHaEK?pid=ImgDet&rs=1",
  },
  {
    url:
      "https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d31b0ef41bd5ad6ef795f72487cb39dbb7fd3c8b.jpg",
  },
  {
    url:
      "https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b64543a98226cffcd369b84bb8014a90f703ea8c.jpg",
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
      setArticleList(res.data);
    });
  }, [type]);

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
  };
  return (
    <View>
      <View>
        <Swiper data={imgUrlList} />
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
