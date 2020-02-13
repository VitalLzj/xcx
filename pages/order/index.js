// pages/order/index.js
Page({

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
        value: "待付款",
        isActive: false
      }, {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ]
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
    // const index = options.tabs;
    // console.debug(index);
    // console.debug(typeof index);

    // let { tabs } = this.data;

    // tabs.forEach(v => {
    //   v.isActive = index === v.id ? true : false
    // })
    // console.debug(tabs);
    // this.setData({
    //   tabs
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let currentPages = getCurrentPages();
    const { tabs } = currentPages[currentPages.length - 1].options;
    console.debug(typeof tabs);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})