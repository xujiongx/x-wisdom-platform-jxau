import { Button, Image, Input, ScrollView, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import "./index.less";

export default function Canvas() {
  const [url, setUrl] = useState("");
  const [oneLine, setOneLine] = useState("");
  const [twoLine, setTwoLine] = useState("");
  const [threeLine, setThreeLine] = useState("");
  const [byName, setByName] = useState("");

  const { avatarUrl, nickName } = Taro.getStorageSync("userInfo");
  useEffect(() => {
    getImage();
  }, []);
  const getImage = () => {
    Taro.request({
      url: "https://api.imgrender.cn/open/v1/pics",
      method: "POST",
      header: {
        Authorization:
          "183666749185461475.PLbfIpBpeMkpgbj1Tr+177Mv3Jo3wIIySyf8V5ZeDhs=",
      },
      data: {
        width: 640,
        height: 1034,
        backgroundColor: "#d04c44",
        blocks: [
          {
            x: 25,
            y: 25,
            width: 590,
            height: 984,
            borderColor: "#ffe6c0",
            borderWidth: 2,
          },
        ],
        texts: [
          {
            x: 320,
            y: 235,
            text: nickName || "Liu Li",
            font: "jiangxizhuokai",
            fontSize: 22,
            color: "#fff",
            width: 0,
            textAlign: "center",
          },
          {
            x: 320,
            y: 270,
            text: "邀请你生成三行情诗",
            font: "jiangxizhuokai",
            fontSize: 22,
            color: "#fff",
            width: 320,
            textAlign: "center",
          },
          {
            text: oneLine || "我叫刘丽,",
            x: 120,
            y: 427,
            font: "jiangxizhuokai",
            fontSize: 38,
            lineHeight: 38,
            color: "#ffe6c0",
            width: 320,
            lineNum: 1,
            baseLine: "middle",
            textAlign: "left",
          },
          {
            text: twoLine || "一头行走的花纹肥猪,",
            x: 120,
            y: 485,
            font: "jiangxizhuokai",
            fontSize: 38,
            lineHeight: 38,
            color: "#ffe6c0",
            width: 320,
            lineNum: 1,
            baseLine: "middle",
            textAlign: "left",
          },
          {
            text: threeLine || "每天就知道吃喝拉撒。",
            x: 120,
            y: 543,
            font: "jiangxizhuokai",
            fontSize: 38,
            lineHeight: 38,
            color: "#ffe6c0",
            width: 320,
            lineNum: 1,
            baseLine: "middle",
            textAlign: "left",
          },
          {
            text: `By:${byName || "Ambrose"}.`,
            x: 520,
            y: 611,
            font: "jiangxizhuokai",
            fontSize: 38,
            lineHeight: 38,
            color: "#ffe6c0",
            width: 320,
            lineNum: 1,
            baseLine: "middle",
            textAlign: "right",
          },
          {
            x: 320,
            y: 960,
            text: "长按识别二维码，加我好友",
            font: "jiangxizhuokai",
            fontSize: 22,
            color: "#fff",
            width: 580,
            textAlign: "center",
          },
        ],
        images: [
          {
            x: 260,
            y: 85,
            width: 120,
            height: 120,
            url:
              avatarUrl ||
              "https://cdn.nlark.com/yuque/0/2021/jpeg/529418/1623506608646-d6128c0a-37e5-4d2a-b0d4-a64bde72bf89.jpeg",
            borderRadius: 60,
            zIndex: 1,
          },
          {
            x: 220,
            y: 726,
            width: 200,
            height: 200,
            url: "https://cdn.nlark.com/yuque/0/2021/jpeg/529418/1623507747427-5a2434b0-1d63-4f59-8a87-bc70a98ea395.jpeg",
            borderRadius: 100,
            zIndex: 1,
          },
        ],
        qrcodes: [
          // {
          //   x: 208,
          //   y: 726,
          //   size: 200,
          //   content: "http://baidu.com",
          //   foregroundColor: "#000",
          //   backgroundColor: "#fff",
          //   zIndex: 1,
          // },
        ],
        lines: [],
      },
    }).then((res) => {
      console.log(1122, res.data);
      setUrl(res.data.data);
    });
  };

  const onSaveImage = () => {
    // Taro.getSetting({
    //   success(res) {
    //     if (!res.authSetting["scope.writePhotosAlbum"]) {
    //       wx.authorize({
    //         scope: "scope.writePhotosAlbum",
    //         success() {
    //           console.log("授权成功");
    //         },
    //       });
    //     }
    //   },
    // });
    wx.downloadFile({
      url: url,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: "保存成功",
              icon: "success",
              duration: 2000,
            });
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权");
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata);
                  if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                    console.log(
                      "获取权限成功，给出再次点击图片保存到相册的提示。"
                    );
                  } else {
                    console.log(
                      "获取权限失败，给出不给权限就无法正常使用的提示"
                    );
                  }
                },
              });
            }
          },
          complete(res) {
            console.log(res);
          },
        });
      },
    });
  };

  return (
    <View>
      <ScrollView>
        <View style={{ textAlign: "center" }}>
          <Image src={url} style={{ width: "640rpx", height: "1034rpx" }} />
        </View>
        <View>
          第一行：
          <Input
            type="text"
            value={oneLine}
            onInput={(e) => setOneLine(e.detail.value)}
          />
          第二行：
          <Input
            type="text"
            value={twoLine}
            onInput={(e) => setTwoLine(e.detail.value)}
          />
          第三行：
          <Input
            type="text"
            value={threeLine}
            onInput={(e) => setThreeLine(e.detail.value)}
          />
          留名：
          <Input
            type="text"
            value={byName}
            onInput={(e) => setByName(e.detail.value)}
          />
        </View>
      </ScrollView>

      <View style={{ marginBottom: "40rpx" }}>
        <View style={{ display: "flex" }}>
          <Button onClick={getImage}>获取图片</Button>
          <Button onClick={onSaveImage}>保存图片</Button>
        </View>
      </View>
    </View>
  );
}
