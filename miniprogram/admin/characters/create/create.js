import Biological from '../../../entity/biological';
import { create } from '../../../database/people';

Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    name: ''
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
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  onSureClick(e) {
    let bi = new Biological(this.data.name);
		create({ biological: bi, success: res => {
			// errMsg:"collection.add:ok"
			// _id:"57896b495ce4c1a803352b52014c5f39"
			const { _id, errMsg} = res;
			if (errMsg === "collection.add:ok" && _id){
				wx.showToast({
					title: '添加成功'
				});
				this.setData({ name:''});
			}
		}});
  }
})