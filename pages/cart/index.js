import { getSetting, openSetting, chooseAddress, showModal, showToast } from "../../util/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goods: [],
    allCheck: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow: function () {
    const address = wx.getStorageSync("address");
    if (address.userName) {
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
    }
    const goods = wx.getStorageSync("cart");
    this.setData({
      address
    });
    this.setCart(goods);
  },
  async handleAddressTap() {
    try {
      const getset = await getSetting();
      const auth = getset.authSetting["scope.address"];
      if (auth === true || auth === undefined) {
        const result = await chooseAddress();
        wx.setStorageSync("address", result);
      } else {
        const result2 = await openSetting();
        console.debug("result2..." + result2);
      }
    } catch (error) {
      console.log(error);
    }
  },
  handleItemChange(e) {

    const goods_id = e.currentTarget.dataset.id;
    let { goods } = this.data;
    const index = goods.findIndex(v => { return v.goods_id === goods_id });

    //改变选中状态
    goods[index].checked = !goods[index].checked;
    this.setCart(goods);
  },
  setCart(goods) {
    //重新计算总价 数量
    let allCheck = true;
    let totalPrice = 0;
    let totalNum = 0;
    if (goods) {
      goods.forEach((v) => {
        if (v.checked) {
          totalPrice += v.goods_price * v.num;
          totalNum += v.num;
        } else {
          allCheck = false;
        }
      })
    }

    this.setData({
      goods,
      allCheck,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("cart", goods);

  },
  handleAllCheckChange() {
    let { goods, allCheck } = this.data;
    allCheck = !allCheck;
    goods.forEach(v => v.checked = allCheck);
    this.setCart(goods);
  },
  async handleNumChange(v) {
    const { id, operate } = v.currentTarget.dataset;
    let { goods } = this.data;
    const index = goods.findIndex(v => v.goods_id === id);

    if (goods[index].num === 1 && operate === -1) {
      const result = await showModal("确定要删除该商品么？");
      if (result.confirm) {
        goods.splice(index, 1);
        this.setCart(goods);
      } else {
        console.debug("点击了取消");
      }
    } else {
      goods[index].num += operate;
      this.setCart(goods);
    }
  },

  async handlePay() {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast("请选择收货地址");
      return;
    }
    if (totalNum === 0) {
      await showToast("请选择相关商品")
      return;
    }

    wx.navigateTo({
      url: '/pages/pay/index'
    });

  }
}
)