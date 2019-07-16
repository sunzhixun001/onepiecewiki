import { getEventList} from '../../domain/eventsDomain';
import { rpx2px} from '../../common/implement';
const { statusBarHeight, windowHeight, screenHeight, screenWidth} = getApp().globalData;
const scrollViewHeight = windowHeight - statusBarHeight - 64;
let currentIndex = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
		// events: [[],[],[],[]],
    events: [{}, {}, {}, {}],
    eventsCount: [0, 0, 0, 0],
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
    axisTop: scrollViewHeight * 0.05,
    chapters: [
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
    chooseChapter: []
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
      pageIndex: this.data.pageIndexs[index],
      tag: this.data.chooseChapter
    });
  },
  fetchEventsList({ index, pageSize, pageIndex, lt, gte, tag }) {
    getEventList({
      lt,
      gte,
      pageSize, 
      pageIndex, 
      tag,
      success: data => {
        let _events = this.data.events;
        let _eventsCount = this.data.eventsCount;
        for (let k in data){
          _events[index][data[k]._id] = data[k];
        }
        _eventsCount[index] = Object.keys(_events[index]).length;
        // _events[index] = _events[index].concat(data)
        this.setData({
          events: _events,
          eventsCount: _eventsCount
        }, () => {
          // wx.stopPullDownRefresh();
          if (_events.length > 0 && index === currentIndex){
            this.refreshHeight();
          }
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
          this.data.pageIndexs = _pageIndexs;
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
    console.log("refreshHeight:", this.data.currentIndex);
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
    currentIndex = current;
  },
  bindTabChange: function(e) {
    const { index} = e.currentTarget.dataset;
    currentIndex = index;
    this.setData({ currentIndex: index}, () => {
      this.refreshHeight();
    });
  },
  // 点击关闭篇章选择
  onCloseChoose: function() {
    this.setData({
      chooseActive: false
    });
  },
  // 点击打开篇章选择
  onOpenChoose: function() {
    this.setData({
      chooseActive: true
    });
  },
  // 点击篇章名称
  onChapterTap: function(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({ 
      chapters: this.data.chapters.map((v, i) => {
        if(i === index){
          v.selected = !v.selected;
        }
        return v;
      })
    });
  },
  // 选择篇章后确定按钮
  onChooseConfirm: function() {
    let array = [];
    for(let k in this.data.chapters){
      let item = this.data.chapters[k];
      if(item.selected){
        array.push(item.name);
      }
    }
    this.data.chooseChapter = array;
    this.data.pageIndexs = [1,1,1,1];
    this.setData({ 
      events: [{},{},{},{}],
      allData: [false, false, false, false],
      chooseActive: false
    });
    this.fetchEvetns();
  },
  onChooseReset: function() {
    this.setData({
      chapters: this.data.chapters.map((v, i) => {
        v.selected = false;
        return v;
      })
    });
  }
})