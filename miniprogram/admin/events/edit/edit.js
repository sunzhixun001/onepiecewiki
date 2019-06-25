import { get, update } from '../../../database/eventsRepository';
import Event from '../../../entity/events';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    age: 0,
    photo: '',
    img: '',
    showAge: '',
    title: '',
    tags: [],
    statusBarHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEvent({id: options.id});
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
      age: e.detail.value
    });
  },
  bindShowAgeInput(e) {
    this.setData({
      showAge: e.detail.value
    });
  },
  bindPhotoInput: function (e) {
    this.setData({
      photo: e.detail.value
    });
  },
  bindImgInput: function(e){
    this.setData({
      img: e.detail.value
    });
  },
  bindAddTag: function(e) {
    const _tags = this.data.tags;
    _tags.push('');
    this.setData({ tags: _tags });
  },
  bindTagInput: function(e) {
    const _index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      tags: this.data.tags.map((t, i) => {
        if (i === _index) {
          t = value;
        }
        return t;
      })
    });
  },
  bindDelTap: function(e) {
    const _index = e.currentTarget.dataset.index;
    this.setData({
      tags: this.data.tags.filter((t, i) => {
        return i !== _index;
      })
    });
  },
  getEvent: function ({ id}) {
    get({
      id, success: res => {
        if (res.data && res.data.length > 0){
          const { age, photo, showAge, title, _id, tags, img} = res.data[0];
          this.setData({
            age, photo, showAge, title, id: _id, tags: tags || [], img: img || ''
          });
        }
        console.log(res);
      }
    })
  },
  onSureClick(e) {
    let event = new Event({
      title: this.data.title,
      age: parseFloat(this.data.age),
      showAge: this.data.showAge,
      photo: this.data.photo,
      tags: this.data.tags,
      img: this.data.img
    });
    update({
      id: this.data.id,
      event, 
      success: res => {
        const { errMsg, stats } = res;
        if (errMsg === 'document.update:ok' && stats.updated) {
          wx.showToast({
            title: '保存成功'
          });
        }
      }
    })
  }
})