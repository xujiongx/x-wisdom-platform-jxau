import React, { useEffect } from "react";
import { View } from "@tarojs/components";
import "./index.less";

export default function Mine() {
  useEffect(() => {
    console.log("我的");
  }, []);
  return (
    <View>
      <View>Hello Word</View>
    </View>
  );
}
