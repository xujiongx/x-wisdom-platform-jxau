import { Input, Label, Textarea, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect } from "react";
import "./index.less";

export default function Admin() {
    useEffect(()=>{

    },[])
  return (
    <View>
      <View className="title">资讯管理</View>
      <View className="module">
        <View>江农掠影：</View>
        图片地址：<Input></Input>
        内容：<Textarea></Textarea>
      </View>
      <View className="module">
        <View>江农美食：</View>
        图片地址：<Input></Input>
        内容：<Textarea></Textarea>
      </View>
      <View className="module">
        <View>江农快报：</View>
        图片地址：<Input></Input>
        内容：<Textarea></Textarea>
      </View>
    </View>
  );
}
