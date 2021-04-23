import {
  Button,
  Input,
  Label,
  Picker,
  Textarea,
  View,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import FileUpload from "@components/fileUpload";
import "./index.less";
import { BASE_URL } from "@const";
import moment from "moment";

export default function Admin() {
  const array = ["江农掠影", "江农美食", "江农快报", "更多"];
  const [type, setType] = useState(0);
  const [imgUrl, setImageUrl] = useState("");
  const [context, setContext] = useState("");

  const typeOnChange = (e) => {
    setType(e.target.value);
  };
  const handleContextChange = (e) => {
    const value = e.target.value;
    setContext(value);
  };
  useEffect(() => {}, []);
  const createInformation = () => {
    const createTime = moment().unix();
    const information = {
      createTime,
      type,
      context,
      imgUrl,
    };
    Taro.request({
      url: `${BASE_URL}/information/create`,
      method: "POST",
      data: { ...information },
    }).then((res) => {
      const id = res.data._id;
      console.log(id);
      Taro.showToast({
        title: "成功",
        icon: "success",
        duration: 2000,
      }).then(() => {
        Taro.navigateBack({ delta: 2 });
      });
    });
  };
  return (
    <View>
      <View className="module">
        <View className="title">资讯管理</View>
        <View>
          <View>
            <Picker
              mode="selector"
              range={array}
              value={type}
              onChange={typeOnChange}
            >
              <View className="picker">资讯类型：{array[type]}</View>
            </Picker>
          </View>
          图片地址：
          <FileUpload getUrl={(url) => setImageUrl(url)}></FileUpload>
          <View>
            内容：
            <Textarea
              placeholder="请输入内容"
              value={context}
              onInput={handleContextChange}
              style={{ width: "100%", margin: "20rpx 10rpx" }}
            ></Textarea>
          </View>
          <View>
            <Button onClick={createInformation}>创建</Button>
          </View>
        </View>
      </View>
    </View>
  );
}
