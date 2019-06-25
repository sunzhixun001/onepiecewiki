import { getEventList } from '../../../domain/eventsDomain';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    events: [],
    pageIndex: 1,
    pageSize: 20,
    end: false,
    statusBarHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEvents();
    const { statusBarHeight } = getApp().globalData;
    this.setData({
      statusBarHeight
    });
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
    // this.getEvents();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(!this.data.end){
      this.getEvents();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getEvents() {
    getEventList({
      lt: 9999, 
      gte: -9999,
      pageSize: this.data.pageSize,
      pageIndex: this.data.pageIndex,
      field: {title: true, age: true},
      success: data => {
        // console.log(res);
        let _data = {
          events: this.data.events.concat(data),
          pageIndex: this.data.pageIndex + 1
        };
        if (data.length < this.data.pageSize){
          _data.end = true;
        }
        this.setData(_data);
      }
    });
  },
  onAddClick() {
    wx.navigateTo({url: '/admin/events/create/create'});
  }
})