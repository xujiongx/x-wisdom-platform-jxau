export default {
  pages: [
    "pages/Square/index",
    "pages/Find/index",
    "pages/Mine/index",
    "pages/Login/index",
    "pages/Second/ArticleCreate/index",
    "pages/Second/ArticleInfo/index",
    "pages/Second/ArticleList/index",
    "pages/Second/ArticleEdit/index",
    "pages/Admin/index",
    "pages/ToolBox/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: false,
    color: "#AFAFAF",
    selectedColor: "#6D70FF",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/Square/index",
        text: "广场",
        iconPath: "assets/img/square.png",
        selectedIconPath: "assets/img/square_active.png",
      },
      {
        pagePath: "pages/Find/index",
        text: "发现",
        iconPath: "assets/img/find.png",
        selectedIconPath: "assets/img/find_active.png",
      },
      {
        pagePath: "pages/Mine/index",
        text: "我的",
        iconPath: "assets/img/mime.png",
        selectedIconPath: "assets/img/mime_active.png",
      },
    ],
  },
};
