import { Button, Input, Label, Textarea, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import "./index.less";

export default function ToolBox() {
  return (
    <View>
      <View className="module">
        <View>饭卡充值</View>
        <View>余额：101.5</View>
        <Button size="mini">充值</Button>
      </View>
      <View className="module">
        <View>图书馆预约</View>
        <Button size="mini">点击跳转预约界面</Button>
      </View>
      <View className="module">
        <View>宿舍报修</View>
        <Button size="mini">点击跳转报修界面</Button>
      </View>
    </View>
  );
}
