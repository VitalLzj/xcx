import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'

// pages/goods_list/index.js
Page({

  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPage: 0,
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      }, {
        id: 1,
        value: "销量",
        isActive: false
      }, {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    activeIndex: 0,
    goodsList: []
  },
  handleTabsItemChange(e) {
    let index = e.detail.index;
    let tabs = this.data.tabs;
    tabs.forEach(v => {
      v.isActive = index === v.id ? true : false
    });
    this.setData({
      tabs: tabs,
      activeIndex: index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cat_id;
    this.getGoodsList();
  },
  async getGoodsList() {
    const result = await request({
      url: "goods/search",
      data: this.queryParams
    });
    this.totalPage = Math.ceil(result.total / this.queryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods]
    });
    wx.stopPullDownRefresh();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      goodsList: []
    })
    this.queryParams.pagenum = 1;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.queryParams.pagenum++;
    if (this.queryParams.pagenum > this.totalPage) {
      wx.showToast({
        title: '没有更多了'
      });
    } else {
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})