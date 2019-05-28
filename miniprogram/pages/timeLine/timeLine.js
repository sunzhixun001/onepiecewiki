import { getList} from '../../database/events';
Page({

  /**
   * 页面的初始数据
   */
  data: {
		events: [],
    pageIndex: 0,
    pageSize: 20,
    allData: false
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
    this.getEventsList({ limit: 20, skip: 20});
		wx.getSystemInfo({
			success(res) {
				console.log(res);
			}
		});
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
    console.log("onReachBottom");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getEventsList({ limit, skip}) {
    getList({
      limit, skip, success: res => {
			this.setData({
				events: res.data
			});
			console.log(res);
		}});
	}
})