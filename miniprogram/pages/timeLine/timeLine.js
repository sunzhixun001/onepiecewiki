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
    this.getEventsList({ limit: this.data.pageSize, pageIndex: this.data.pageIndex });
    wx.getSystemInfo({
      success(res) {
        console.log(res);
      }
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
    if (!this.data.allData){
      console.log("onReachBottom");
      const _pageIndex = this.data.pageIndex + 1;
      this.getEventsList({ limit: this.data.pageSize, pageIndex: _pageIndex});
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindAdmin: function() {
    wx.navigateTo({
      url: '/admin/events/list/list'
    })
  },
  getEventsList({ limit, pageIndex}) {
    const skip = limit * pageIndex;
    getList({
      limit, skip, success: res => {
        this.setData({
          events: this.data.events.concat(res.data),
          pageIndex
        });
        if (res.data.length < limit){
          this.setData({ allData: true});
        }
			  // console.log(res);
		}});
	},
  bindSearch: function(e) {
    const _keyword = e.detail.value;
    this.getRegexpList({ keyword: _keyword});
  },
  bindOpenSearch: function(e) {
    this.setData({ searchActive: true});
  },
  getRegexpList: function ({ keyword}) {
    getRegexp({ 
      keyword, 
      success: res => {
        console.log(res);
      }
    })
  },
  bindSearch: function(e) {
    wx.navigateTo({
      url: '../timeLineSearch/timeLineSearch',
    })
  }
})