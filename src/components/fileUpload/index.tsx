import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Button } from "@tarojs/components";
import { BASE_URL } from "@const";
import "./index.less";

export default function FileUpload(props) {
  const { src = "", getUrl } = props;
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    setImageUrl(src);
  }, [src]);
  const upLoadFile = () => {
    Taro.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        Taro.uploadFile({
          url: `${BASE_URL}/upload`, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: "file",
          success(resp) {
            const url = resp.data;
            setImageUrl(url);
            getUrl(url);
          },
        });
      },
    });
  };
  return (
    <View className="upload">
      {imageUrl && (
        <Image
          style={{ width: "200rpx", height: "200rpx", marginRight: "20rpx" }}
          src={imageUrl}
        ></Image>
      )}
      <View
        style={{
          width: "200rpx",
          height: "200rpx",
          fontSize: "60rpx",
          lineHeight: "200rpx",
          textAlign: "center",
          backgroundColor: "white",
        }}
        onClick={upLoadFile}
      >
        +
      </View>
    </View>
  );
}
