import React, { useEffect } from "react";
import { View } from "@tarojs/components";
import "./index.less";

export default function Mine() {
  useEffect(() => {
    console.log("唧唧咋咋广场");
  }, []);
  return (
    <View>
      <View>唧唧咋咋广场</View>
    </View>
  );
}
