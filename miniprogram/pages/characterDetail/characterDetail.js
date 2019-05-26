import { get } from '../../database/people';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fullname: '',
    img: '',
    bounty: 0,
    priateRegimentName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCharacter({ id: options.id});
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
  getCharacter: function ({ id }) {
    get({
      id, success: res => {
        if (res.data.length > 0) {
          const {
            avator,
            img,
            name,
            _id,
            fullname,
            role,
            bounty,
            priateRegimentName,
            devilfruitType,
            devilfruitName,
            levelName
          } = res.data[0];
          this.setData({
            avator,
            img,
            name,
            fullname,
            bounty: bounty || 0,
            priateRegimentName: priateRegimentName || '无',
            devilfruitType: devilfruitType || '无',
            devilfruitName: devilfruitName || '',
            id: _id, role: role || 0,
            levelName: levelName || '无'
          });
        }
      }
    })
  }
})