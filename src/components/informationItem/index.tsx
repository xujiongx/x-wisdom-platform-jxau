import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "@const";
import "./index.less";

interface Props {
  type: number;
}
const array = ["江农掠影", "江农美食", "江农快报", "更多"];

export default function InformationItem(props: Props) {
  const { type } = props;
  const [information, setInformation] = useState({} as any);

  useEffect(() => {
    Taro.request({
      url: `${BASE_URL}/information/findByType`,
      method: "GET",
      data: { type },
    }).then((res) => {
      setInformation(res.data[0]);
    });
  }, [type]);

  return (
    <View className="module">
      <View className="title">{array[type]}</View>
      <View>
        {information.imgUrl && (
          <Image style={{ width: "100%" }} src={information.imgUrl}></Image>
        )}
        <View>内容：{information.context}</View>
        <View>
          发布于：
          {moment
            .unix(Number(information.createTime))
            .format("YYYY-MM-DD hh:m:ss") || ""}
        </View>
      </View>
    </View>
  );
}
