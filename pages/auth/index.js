
import { login } from "../../util/asyncWx.js";
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  async getUserToken(e) {
    const { encryptedData, rawData, iv, signature } = e.detail;
    const { code } = await login()
    const { token } = await request({
      url: 'users/wxlogin',
      method: 'post',
      data: { encryptedData, rawData, iv, signature, code }
    })
    wx.setStorageSync('token', token);
    wx.navigateBack({
      delta: 1
    });
  }
})