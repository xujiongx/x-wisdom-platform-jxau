import React from "react";
import Taro from "@tarojs/taro";
import { Swiper, SwiperItem, View, Image } from "@tarojs/components";

export default function swiper(props) {
  const { data } = props;
  return (
    //   <Image src={data[0].url} />
    <Swiper
      indicatorColor="#999"
      indicatorActiveColor="#333"
      circular
      indicatorDots
      autoplay
    >
      {data.map((item, index) => (
        <SwiperItem key={index} >
          <Image src={item.url} style={{width:'100%',height:'100%'}}/>
        </SwiperItem>
      ))}
    </Swiper>
  );
}
