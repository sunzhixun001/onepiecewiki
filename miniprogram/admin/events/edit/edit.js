import { get } from '../../../database/events';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    age: 0,
    photo: '',
    showAge: '',
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEvent({id: options.id});
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
  getEvent: function ({ id}) {
    get({
      id, success: res => {
        if (res.data && res.data.length > 0){
          const { age, photo, showAge, title, _id} = res.data[0];
          this.setData({
            age, photo, showAge, title, id: _id
          });
        }
        console.log(res);
      }
    })
  }
})