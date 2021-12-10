import storyApi from '../../api/story'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '篇章',
    storyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStorys()
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
  getStorys: async function () {
    const res = await storyApi.getStorys()
    const {value} = res[0]
    this.setData({
      storyList: value
    })
  }
})