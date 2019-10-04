import regeneratorRuntime from '../../../common/regeneratorRuntime';
import { getTotal, getWikiList } from '../../../domain/wikisDomain';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'wiki管理',
    list: [],
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getTotal().then(total => {
      this.setData({ total});
    });
    this.fetchGetWikiList({});
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
  fetchGetWikiList: function ({ pageindex = 1}) {
    getWikiList({ pageindex }).then(data => {
      this.setData({ list: data });
    })
  },
  onJumpEvent: function(e) {
    const { pageindex } = e.detail;
    this.fetchGetWikiList({ pageindex });
  }
})