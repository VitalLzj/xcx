import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'

// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [],
    rightContent: [],
    activeIndex: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cates = wx.getStorageSync("cates");
    if (cates) {
      if (Date.now() - cates._time > 5 * 60 * 1000) {
        this.getMenuList();
      } else {
        this.Cates = cates._data;
        this.setData({
          leftMenuList: this.Cates.map(
            v => v.cat_name
          ),
          rightContent: this.Cates[0].children
        });
      }
    } else {
      this.getMenuList();
    }
  },

  //定义接口返回值
  Cates: [],

  async getMenuList() {
    // request({
    //   url: "categories"
    // }).then((result) => {
    //   this.Cates = result.data.message;
    //   wx.setStorageSync("cates", {
    //     _time: Date.now(),
    //     _data: result.data.message
    //   });
    //   this.setData({
    //     leftMenuList: this.Cates.map(
    //       v => v.cat_name
    //     ),
    //     rightContent: this.Cates[0].children
    //   });
    // });
    const result = await request({ url: "categories" });
    this.Cates = result;
    wx.setStorageSync("cates", {
      _time: Date.now(),
      _data: result
    });
    this.setData({
      leftMenuList: this.Cates.map(
        v => v.cat_name
      ),
      rightContent: this.Cates[0].children
    });
  },
  handleItem(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index,
      rightContent: this.Cates[index].children,
      scrollTop: 0
    });
  }

})