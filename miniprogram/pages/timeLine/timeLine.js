import { getEventList} from '../../domain/eventsDomain';

Page({

  /**
   * 页面的初始数据
   */
  data: {
		events: [],
    pageSize: 20,
    pageIndexs: [0,0,0,0],
    allData: false,
    statusBarHeight: 0,
    searchInputHeight: 0,
    searchActive: false,
    chooseActive: false,
    keyword: '',
    flegTop: 0, 
    currentIndex: 0,
    tabs: ['太古时代','0-1521','1522','1523-1524'],
    ranges: [[-9999, 0]],
    itemsHeight: getApp().globalData.screenHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchEvetns();
    this.setData({ statusBarHeight: getApp().globalData.statusBarHeight });
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
      const _pageIndex = this.data.pageIndex + 1;
      this.fetchEventsList({ limit: this.data.pageSize, pageIndex: _pageIndex});
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fetchEvetns: function() {
    this.doFetchEvetns({index: 0});
  },
  doFetchEvetns: function({index}) {
    this.fetchEventsList({
      lt: this.data.ranges[index][1],
      gte: this.data.ranges[index][0],
      limit: this.data.pageSize,
      pageIndex: this.data.pageIndexs[index]
    });
  },
  onPageScroll: function(e) {
    const { scrollTop} = e;
    this.fixFlag({ scrollTop});
  },
  bindAdmin: function() {
    wx.navigateTo({
      url: '/admin/events/list/list'
    })
  },
  fetchEventsList({ limit, pageIndex, lt, gte}) {
    const skip = limit * pageIndex;
    getEventList({
      lt,
      gte,
      limit, skip, success: data => {
        this.setData({
          events: this.data.events.concat(data),
          pageIndex
        }, () => {
          const query = wx.createSelectorQuery();
          query.select('#ul')
            .boundingClientRect(rect => {
              const { height} = rect;
              this.setData({itemsHeight: height + 30});
            })
            .exec();
        });
        if (data.length < limit){
          this.setData({ allData: true});
        }
			  // console.log(res);
		}});
	},
  bindSearchInput: function(e) {
    const _keyword = e.detail.value;
    this.setData({ keyword: _keyword});
  },
  bindJumpSearch: function(e) {
    wx.navigateTo({
      url: `../timeLineSearch/timeLineSearch?keyword=${this.data.keyword || '路飞'}`
    })
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
  },
  bindSearchIcon: function(e) {
    this.setData({
      searchActive:true,
      searchInputHeight: 88
    });
  },
  bindSearchCloseIcon: function(e) {
    this.setData({ 
      searchActive: false, 
      keyword: '' ,
      searchInputHeight: 0
    });
  },
  fixFlag: function ({ scrollTop}) {
    const axisHeight = getApp().globalData.screenHeight - (this.data.statusBarHeight + 10);
    const query = wx.createSelectorQuery();
    query.select('#area')
      .boundingClientRect(rect => {
        const { height } = rect;
        this.setData({
          flegTop: axisHeight * (scrollTop / height)
        });
      })
      .exec();
  }
})