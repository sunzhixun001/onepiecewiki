import { 
  fetchList,
  fetchStrawCharactersList, 
  fetchListHasDevilfruit,
  fetchListOrderByBountyDesc
} from '../../domain/characterDomain';
import { convertBounty} from '../../common/implement';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    strawHatCharacters: [],
    bountyCharacters: [],
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
    tabKeys: ["strawHatCharacters", "bountyCharacters", "devilfruitCharacters", "nameCharacters"],
    tabs: [
      { index: 0, name: '草帽团'}, 
      { index: 1, name: '悬赏金' }, 
      { index: 2, name: '能力者' },
      { index: 3, name: '全部' }
    ],
    devilfruitTypes: ['','超人系','动物系','自然系'],
    swiperHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCharactersList[0].call(this, true);
    this.getCharactersList[1].call(this, false);
    this.getCharactersList[2].call(this, false);
    this.getCharactersList[3].call(this, false);
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
    if (!this.data.listEnd[this.data.tabKeys[this.data.currentIndex]]) {
      this.getCharactersList[this.data.currentIndex].call(this, true);
    }
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
  bindSearch: function(e) {
    wx.navigateTo({
      url: '../characterSearch/characterSearch',
    });
  },
  getCharactersList: [
    function (reviseHeight){
      this.getStrawCharactersList({ 
        pageIndx: this.data.pages["strawHatCharacters"][0],
        pageSize: this.data.pages["strawHatCharacters"][1],
        callback: this.getCharactersCallbacks, 
        dataKey: "strawHatCharacters",
        reviseHeight
      });
    },
    function (reviseHeight) {
      this.getBountyListDesc({
        pageIndx: this.data.pages["bountyCharacters"][0], 
        pageSize: this.data.pages["bountyCharacters"][1],
        callback: this.getCharactersCallbacks,
        dataKey: "bountyCharacters",
        reviseHeight
      });
    },
    function (reviseHeight) {
      this.getDevilfruitCharactersList({
        pageIndx: this.data.pages["devilfruitCharacters"][0],
        pageSize: this.data.pages["devilfruitCharacters"][1],
        callback: this.getCharactersCallbacks,
        dataKey: "devilfruitCharacters",
        reviseHeight
      });
    },
    function (reviseHeight) {
      this.getNameList({
        pageIndx: this.data.pages["nameCharacters"][0],
        pageSize: this.data.pages["nameCharacters"][1],
        callback: this.getCharactersCallbacks,
        dataKey: "nameCharacters",
        reviseHeight
      });
    }
  ],
  // 获取人物列表后的回调函数　
  getCharactersCallbacks: function (res, dataKey, pageIndx, pageSize, reviseHeight) {
    let obj = {};
    let _pages = this.data.pages;
    let _listend = this.data.listEnd;
    obj[dataKey] = this.data[dataKey].concat(res);
    _pages[dataKey] = [pageIndx + 1, pageSize];
    obj["pages"] = _pages;
    if (res.length < pageSize){
      _listend[dataKey] = true;
      obj["listEnd"] = _listend;
    }
    if (reviseHeight){
      obj["swiperHeight"] = (this.data[dataKey].length + res.length) * 240
    }
    this.setData(obj);
  },
  // 获取草帽团成员 
  getStrawCharactersList: function ({ callback, dataKey, pageIndx, pageSize, reviseHeight}) {
    fetchStrawCharactersList({
      limit: pageSize,
      skip: (pageIndx + 1) * pageSize,
      success: res => { callback.call(this, res, dataKey, pageIndx, pageSize, reviseHeight)}
    });
  },
  // 获取有恶魔果实的角色
  getDevilfruitCharactersList: function ({ callback, dataKey, pageIndx, pageSize, reviseHeight }) {
    fetchListHasDevilfruit({
      limit: pageSize,
      skip: (pageIndx + 1) * pageSize,
      success: res => { callback.call(this, res, dataKey, pageIndx, pageSize, reviseHeight)}});
  },
  // 获取有赏金的人物, 按金额降序排列
  getBountyListDesc: function ({ callback, dataKey, pageIndx, pageSize, reviseHeight }) {
    fetchListOrderByBountyDesc({ 
      limit: pageSize, 
      skip: (pageIndx + 1) * pageSize,
      success: res => { callback.call(this, res, dataKey, pageIndx, pageSize, reviseHeight);}
    });
  },
  // 按名字排序 获取所有人物
  getNameList: function ({ callback, dataKey, pageIndx, pageSize, reviseHeight }){
    fetchList({
      limit: pageSize,
      skip: (pageIndx + 1) * pageSize,
      success: res => { callback.call(this, res, dataKey, pageIndx, pageSize, reviseHeight); }
    });
  },
  bindAdmin: function() {
    wx.navigateTo({
      url: '/admin/characters/list/list',
    })
  },
  characters: [
    function() { return this.data.strawHatCharacters},
    function () { return this.data.bountyCharacters},
    function () { return this.data.devilfruitCharacters },
    function () { return this.data.nameCharacters }
  ],
  bindSwiperChange: function(e) {
    const { current} = e.detail;
    this.setData({
      currentIndex: current,
      swiperHeight: this.characters[current].call(this).length * 240
    });
  }
})