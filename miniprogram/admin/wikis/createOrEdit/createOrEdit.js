import { getOneWiki} from '../../../domain/wikisDomain.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getOneWiki({ id: options.id})
    .then(data => {
      this.setData(data);
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onEditorReady: function() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec();
  },
  plugchara: function () {
    wx.navigateTo({
      url: `/admin/common/plugcharacters/plugcharacters?id=${this.data._id}&name=${this.data.title}`,
    })
  }
})