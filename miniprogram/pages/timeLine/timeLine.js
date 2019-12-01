import { getEventList} from '../../domain/eventsDomain';
import { rpx2px} from '../../common/implement';
const { statusBarHeight, windowHeight, screenHeight} = getApp().globalData;
let currentIndex = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
		title: '时间线',
    immemorialevents: { data: [], total: 0},
    bcevents: { data: [], total: 0 },
    standardevents: { data: [], total: 0 },
    newworldevents: { data: [], total: 0 },
    keyword: '',
    currentIndex: 0,
    tabs: ['太古时代','0-1521','1522','1523-1524'],
    chapterlist: [
      { name: '罗杰', selected: false, hot: true },
      { name: '东海', selected: false},
      { name: '阿拉巴斯坦', selected: false},
      { name: '空岛', selected: false },
      { name: '七水之都', selected: false },
      { name: '恐怖三桅帆', selected: false },
      { name: '香波地群岛', selected: false },
      { name: '女儿国', selected: false },
      { name: '推进城监狱', selected: false },
      { name: '马林梵多', selected: false },
      { name: '鱼人岛', selected: false },
      { name: '班克禁区', selected: false },
      { name: '德雷斯罗萨', selected: false },
      { name: '佐乌', selected: false },
      { name: '蛋糕岛', selected: false },
      { name: '和之国', selected: false }
    ],
    chapter: '',
    visiblechapter: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initEvetns();
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
      currentIndex = timeLineIndex || 0;
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
    this.initEvetns();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  scrolltolower: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  initEvetns: function() {
    wx.showLoading({
      title: '加载中...',
    });
    this.selectComponent('#bcevents').__data__.pageindex = 1;
    this.selectComponent('#standardevents').__data__.pageindex = 1;
    this.selectComponent('#newworldevents').__data__.pageindex = 1;
    this.setData({
      currentIndex: 0,
      immemorialevents: { data: [], total: 0 },
      bcevents: { data: [], total: 0 },
      standardevents: { data: [], total: 0 },
      newworldevents: { data: [], total: 0 }
    });
    this.fetchImmemorialEvents({ pageindex: 1, pagesize: 20, tags: this.data.chapter });
    this.fetchBCevents({ pageindex: 1, pagesize: 20, tags: this.data.chapter });
    this.fetchStandardEvents({ pageindex: 1, pagesize: 20, tags: this.data.chapter });
    this.fetchNewWorldEvents({ pageindex: 1, pagesize: 20, tags: this.data.chapter });
  },
  fetchImmemorialEvents: function ({ pageindex = 1, pagesize = 20, tags = ''}) {
    getEventList({ 
      lt: 0, gte: -9999, pagesize, pageindex, tags 
    }).then(response => {
      this.setData({ immemorialevents: response}, () => {
        if (this.data.currentIndex === 0) {
          wx.hideLoading(); 
          wx.stopPullDownRefresh();
        }
      });
    });
  },
  fetchBCevents: function ({ pageindex = 1, pagesize = 20, tags = '' }) {
    getEventList({
      lt: 1522, gte: 0, pagesize, pageindex, tags 
    }).then(response => {
      this.setData({ bcevents: {
        total: response.total,
        data: this.data.bcevents.data.concat(response.data)
      }}, () => {
        if (this.data.currentIndex === 1) {
          wx.hideLoading(); 
          wx.stopPullDownRefresh();
        }
      });
    });
  },
  fetchStandardEvents: function ({ pageindex = 1, pagesize = 20, tags = '' }) {
    getEventList({
      lt: 1523, gte: 1522, pagesize, pageindex, tags 
    }).then(response => {
      this.setData({
        standardevents: {
          total: response.total,
          data: this.data.standardevents.data.concat(response.data)
        }
      }, () => {
        if (this.data.currentIndex === 2) {
          wx.hideLoading(); 
          wx.stopPullDownRefresh();
        }
      });
    });
  },
  fetchNewWorldEvents: function ({ pageindex = 1, pagesize = 20, tags = '' }) {
    getEventList({
      lt: 9999, gte: 1523, pagesize, pageindex, tags 
    }).then(response => {
      this.setData({
        newworldevents: {
          total: response.total,
          data: this.data.newworldevents.data.concat(response.data)
        }
      }, () => {
        if (this.data.currentIndex === 3) {
          wx.hideLoading(); 
          wx.stopPullDownRefresh();
        }
      });
    });
  },
  bceventsscrolltolower: function (e) {
    this.fetchBCevents({ ...e.detail, tags: this.data.chapter});
  },
  standardeventsscrolltolower: function (e) {
    this.fetchStandardEvents({ ...e.detail, tags: this.data.chapter });
  },
  newworldeventsscrolltolower: function (e) {
    this.fetchNewWorldEvents({ ...e.detail, tags: this.data.chapter });
  },
  onPageScroll: function(e) {
    // const { scrollTop} = e;
    // this.fixFlag({ scrollTop});
  },
  swiperChange: function(e) {
    const { current, source } = e.detail;
    this.setData({currentIndex: current});
    currentIndex = current;
  },
  bindTabChange: function(e) {
    const { index} = e.currentTarget.dataset;
    currentIndex = index;
    this.setData({ currentIndex: index}, () => {
    });
  },
  // 点击打开篇章选择
  switchchapters: function() {
    this.setData({
      visiblechapter: !this.data.visiblechapter
    });
  },
  // 点击篇章名称
  onChapterTap: function(e) {
    const { name } = e.detail;
    let chapter = '';
    let title = '时间线';
    const new_chapters = this.data.chapterlist.map(c => {
      if (c.name === name) {
        c.selected = !c.selected;
        if (c.selected) {
          title = `${name}篇`;
          chapter = name;
        }
      } else {
        c.selected = false;
      }
      return c;
    });
    this.setData({ 
      visiblechapter: false,
      chapter: chapter,
      title: title,
      chapterlist: new_chapters
    }, () => {this.initEvetns()});
  },
  // 关闭篇章选择
  closechapter: function () {
    this.setData({
      visiblechapter: false
    });
  }
})