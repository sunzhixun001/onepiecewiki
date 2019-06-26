import { getEventList} from '../../domain/eventsDomain';
import { rpx2px} from '../../common/implement';
const { statusBarHeight, windowHeight, screenHeight, screenWidth} = getApp().globalData;
const scrollViewHeight = windowHeight - statusBarHeight - 64;
Page({

  /**
   * 页面的初始数据
   */
  data: {
		events: [[],[],[],[]],
    pageSize: 20,
    pageIndexs: [1,1,1,1],
    allData: [false, false,false,false],
    barHeight: statusBarHeight,
    searchInputHeight: 0,
    searchActive: false,
    chooseActive: false,
    keyword: '',
    flegTop: 0, 
    currentIndex: 0,
    tabs: ['太古时代','0-1521','1522','1523-1524'],
    ranges: [[-9999, 0], [0, 1522], [1522, 1523], [1523, 1525]],
    itemsHeight: screenHeight,
    mainHeight: windowHeight - statusBarHeight,
    scrollViewHeight: scrollViewHeight,
    axisHeight: scrollViewHeight * 0.9,
    axisTop: scrollViewHeight * 0.05
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchEvetns();
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
    const { timeLineIndex } = getApp().globalData;
    if (timeLineIndex){
      this.setData({
        currentIndex: timeLineIndex || 0
      });
    }
    getApp().globalData.timeLineIndex = null;
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
  scrolltolower: function() {
    if (!this.data.allData[this.data.currentIndex]) {
      this.doFetchEvetns({ index: this.data.currentIndex });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fetchEvetns: function() {
    this.doFetchEvetns({ index: 0 });
    this.doFetchEvetns({ index: 1 });
    this.doFetchEvetns({ index: 2 });
    this.doFetchEvetns({ index: 3 });
  },
  doFetchEvetns: function({index}) {
    this.fetchEventsList({
      index,
      lt: this.data.ranges[index][1],
      gte: this.data.ranges[index][0],
      pageSize: this.data.pageSize,
      pageIndex: this.data.pageIndexs[index]
    });
  },
  fetchEventsList({ index, pageSize, pageIndex, lt, gte }) {
    getEventList({
      lt,
      gte,
      pageSize, 
      pageIndex, 
      success: data => {
        let _events = this.data.events;
        _events[index] = _events[index].concat(data)
        this.setData({
          events: _events
        }, () => {
          this.refreshHeight();
        });
        if (data.length < pageSize) {
          this.setData({ 
            allData: this.data.allData.map((a, i) => {
              if(i === index){
                a = true
              }
              return a;
            }) 
          });
        }else{
          let _pageIndexs = this.data.pageIndexs;
          _pageIndexs[index] = pageIndex + 1;
          this.setData({ pageIndexs: _pageIndexs});
        }
      }
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
      // searchInputHeight: 88
    });
  },
  bindSearchCloseIcon: function(e) {
    this.setData({ 
      searchActive: false, 
      keyword: '' ,
      // searchInputHeight: 0
    });
  },
  fixFlag: function ({ scrollTop}) {
    const axisHeight = getApp().globalData.screenHeight - (statusBarHeight + 10);
    const query = wx.createSelectorQuery();
    query.select('#area')
      .boundingClientRect(rect => {
        const { height } = rect;
        this.setData({
          flegTop: axisHeight * (scrollTop / height)
        });
      })
      .exec();
  },
  refreshHeight: function() {
    const query = wx.createSelectorQuery();
    query.select(`#ul${this.data.currentIndex}`)
      .boundingClientRect(rect => {
        const { height } = rect;
        this.setData({ itemsHeight: height + 30 });
      })
      .exec();
  },
  swiperChange: function(e) {
    const { current, source } = e.detail;
    this.setData({currentIndex: current});
  },
  bindTabChange: function(e) {
    const { index} = e.currentTarget.dataset;
    this.setData({ currentIndex: index}, () => {
      this.refreshHeight();
    });
  }
})