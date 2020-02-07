import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  images: [],
  goodsObj2: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },

  async getGoodsDetail(goods_id) {
    let result = await request({
      url: "goods/detail",
      data: { goods_id }
    });
    this.goodsObj2 = result;
    this.images = result.pics;
    this.setData({
      goodsObj: {
        goods_id: result.goods_id,
        goods_price: result.goods_price,
        pics: result.pics,
        goods_name: result.goods_name,
        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    });
  },
  handleImagePreview(e) {
    let { index } = e.currentTarget.dataset;
    let previewImages = this.images.map((key) => key.pics_big_url);
    wx.previewImage({
      current: previewImages[index],
      urls: previewImages
    });
  },
  //加入购物车
  handlCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v =>
      v.goods_id === this.goodsObj2.goods_id
    );
    if (index === -1) {
      this.goodsObj2.num = 1;
      cart.push(this.goodsObj2);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true
    });

  }

})