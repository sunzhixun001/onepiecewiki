import { 
  getList,
  getStrawCharactersList, 
  fetchListHasDevilfruit,
  getPirates,
  getMarines,
  getAntagonists
} from '../../domain/characterDomain';
import {
  fetchFavorites
} from '../../domain/userDomain';
import { clearUserId} from '../../common/auth'; 
let favorites = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    strawHatCharacters: { total: 0, data: []},
    pirates: { total: 0, data: []},
    marines: { total: 0, data: []},
    antagonists: { total: 0, data: [] },
    characters: { total: 0, data: [] },
    devilfruitCharacters: [],
    nameCharacters: [],
    currentIndex: 0,
    listEnd: { "strawHatCharacters": true, "bountyCharacters": false, "devilfruitCharacters": false, "nameCharacters": false},
    pages: { 
      "strawHatCharacters": [-1, 20], 
      "bountyCharacters": [-1, 20], 
      "devilfruitCharacters":[-1, 20],
      "nameCharacters": [-1, 20]
    },
    tabKeys: ["strawHatCharacters", "pirates", "marines", "antagonists"],
    tabs: [
      { index: 0, name: '草帽团'}, 
      { index: 1, name: '海贼' }, 
      { index: 2, name: '海军' },
      { index: 3, name: '革命军' },
      { index: 4, name: '全部' }
    ],
    devilfruitTypes: ['','超人系','动物系','自然系'],
    swiperHeight: 0,
    searchInputHeight: 0,
    searchActive: false,
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const { globalData, watchBallBack} = getApp();
    // watchBallBack["favorites"] = value => { 
    //   this.refreshFavorites({ favorites: value});
    // };
    this.initCharacters();
  },

  initCharacters: function () {
    wx.showLoading({
      title: '加载中...',
    })
    this.fetchGetStrawCharactersList();
    this.fetchGetPirates({ pageindex: 1, pagesize: 20 });
    this.fetchGetMarines({ pageindex: 1, pagesize: 20 });
    this.fetchGetAntagonists({ pageindex: 1, pagesize: 20 });
    this.fetchGetPinyinNameList({ pageindex: 1, pagesize: 20 });
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
    this.setData({
      strawHatCharacters: { total: 0, data: [] },
      pirates: { total: 0, data: [] },
      marines: { total: 0, data: [] },
      antagonists: { total: 0, data: [] },
      characters: { total: 0, data: [] }
    });
    this.initCharacters();
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
  bindTabChange: function(e) {
    const _index = e.currentTarget.dataset.index;
    this.setData({ currentIndex: _index});
  },
  bindAvatoError: function(e){
    console.log(e);
  }, 
  // 刷新收藏状态
  refreshFavorites: function({favorites}) {
    for (let key of this.data.tabKeys.values()){
      let _dataObj = {};
      _dataObj[key] = {
        data: this.data[key].data.map(c => {
          c.favorite = favorites[c.id];
          return c;
        }),
        total: this.data[key].total
      };
      this.setData(_dataObj);
    }
  },
  // 获取草帽团成员 
  fetchGetStrawCharactersList: function () {
    getStrawCharactersList().then(result => {
      this.setData({
        strawHatCharacters: result
      }, () => {
        if (this.data.currentIndex === 0) {
          wx.stopPullDownRefresh();
          wx.hideLoading();
        }
      });
    });
  },
  // 获取海贼
  fetchGetPirates: function ({ pageindex, pagesize }) {
    getPirates({ 
      pageindex: pageindex, 
      pagesize: pagesize,
      orderbys: ['bounty', 'desc']
    }).then(result => {
      this.setData({ pirates: { 
        total: result.total,
        data: this.data.pirates.data.concat(result.data)
      }}, () => {
        if (this.data.currentIndex === 1) { wx.stopPullDownRefresh(); wx.hideLoading();}
      });
    });
  },
  // 获取海军
  fetchGetMarines: function ({ pageindex, pagesize }) {
    getMarines({
      pageindex, pagesize, orderbys: ['pinyinName', 'asc']
    }).then(result => {
      this.setData({ marines: {
        total: result.total,
        data: this.data.marines.data.concat(result.data)
      }}, () => {
        if (this.data.currentIndex === 2) { wx.stopPullDownRefresh(); wx.hideLoading();}
      });
    });
  },
  // 获取革命军
  fetchGetAntagonists: function ({ pageindex, pagesize }) {
    getAntagonists({
      pageindex, pagesize, orderbys: ['pinyinName', 'asc']
    }).then(result => {
      this.setData({
        antagonists: {
          total: result.total,
          data: this.data.antagonists.data.concat(result.data),
        }
      }, () => {
        if (this.data.currentIndex === 3) { wx.stopPullDownRefresh(); wx.hideLoading();}
      });
    });
  },
  // 按拼音名字排序 获取所有人物
  fetchGetPinyinNameList: function ({ pageindex, pagesize }){
    getList({
      pagesize: pagesize,
      pageindex: pageindex
    }).then(result => {
      this.setData({
        characters: {
          total: result.total,
          data: this.data.characters.data.concat(result.data),
        }
      }, () => {
        if (this.data.currentIndex === 4) { wx.stopPullDownRefresh(); wx.hideLoading(); }
      });
    });
  },
  bindAdmin: function() {
    wx.navigateTo({
      url: '/admin/characters/list/list',
    })
  },
  bindSwiperChange: function(e) {
    const { current} = e.detail;
    this.setData({
      currentIndex: current
    });
  },
  bindSearchIcon: function (e) {
    this.setData({ 
      searchActive: true,
      // searchInputHeight: 88 
    });
  },
  bindSearchCloseIcon: function (e) {
    this.setData({ 
      searchActive: false, 
      keyword: '',
      // searchInputHeight: 0  
    });
  },
  bindSearchInput: function (e) {
    const _keyword = e.detail.value;
    this.setData({ keyword: _keyword });
  },
  // fetchGetFavorites: function ({ userid}) {
  //   fetchFavorites({
  //     userid,
  //     success: list => {
  //       console.log(getApp());
  //       getApp().globalData.favorites = list;
  //       favorites = list;
  //       this.initCharacters();
  //     },
  //     fail: errCode => {
  //       if (errCode === -1){
  //         clearUserId();
  //       }
  //     }
  //   });
  // },
  piratesscrolltolower: function (e) {
    this.fetchGetPirates(e.detail);
  },

  marinescrolltolower: function (e) {
    this.fetchGetMarines(e.detail);
  },

  antagonistsscrolltolower: function (e) {
    this.fetchGetAntagonists(e.detail);
  },
  charactersscrolltolower: function (e) {
    this.fetchGetPinyinNameList(e.detail);
  }
})