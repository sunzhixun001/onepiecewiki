import Event from '../../../entity/events';
import { create} from '../../../database/events';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    age: 0,
    showAge: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  bindTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },
  bindAgeInput(e) {
    this.setData({
      age: parseInt(e.detail.value)
    });
  },
  bindShowAgeInput(e) {
    this.setData({
      showAge: e.detail.value
    });
  },
  onSureClick(e) {
    let event = new Event({
      title:this.data.title,
      age: this.data.age,
      showAge: this.data.showAge
      });
    create({ event, success: res => {
      // errMsg: "collection.add:ok"
      // _id: "57896b495ce562b6039aeaee3da53b51"
      const { errMsg, _id} = res;
      if (errMsg === 'collection.add:ok' && _id){
        wx.showToast({
          title: '添加成功'
        });
        this.setData({
          title: '',
          age: 0,
          showAge: ''
        });
      }
    }})
  }
})