import Event from '../../../entity/events';
import { create} from '../../../database/eventsRepository';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    age: 0,
    showAge: '',
		photo: '',
    tags: [],
    statusBarHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      age: parseFloat(e.detail.value)
    });
  },
  bindShowAgeInput(e) {
    this.setData({
      showAge: e.detail.value
    });
  },
	bindPhotoInput: function(e){
		this.setData({
			photo: e.detail.value
		});
	},
  onSureClick(e) {
    let event = new Event({
      title:this.data.title,
      age: this.data.age,
      showAge: this.data.showAge,
			photo: this.data.photo,
      tags: this.data.tags
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
  },
  bindAddTag: function(e){
    const _tags = this.data.tags;
    _tags.push('');
    this.setData({ tags: _tags});
  },
  tagTouchStart: function(e){
    console.log('start: ',e);
  },
  tagTouchMove: function(e) {
    // console.log(e);
  },
  tagTouchEnd: function(e) {
    console.log('end: ',e);
  },
  bindTagInput: function(e) {
    const _index = e.currentTarget.dataset.index;
    const value = e.detail.value;
    this.setData({
      tags: this.data.tags.map((t, i) => {
        if(i === _index) {
          t = value;
        }
        return t;
      })
    });
  }
})