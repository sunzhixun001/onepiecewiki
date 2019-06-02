import { 
  getList, 
  getListInPriateReg, 
  getListHasDevilfruit, 
  getListOrderByBountyDesc
} from '../../database/people';
import { convertBounty} from '../../common/implement';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    strawHatCharacters: [],
    bountyCharacters: [],
    devilfruitCharacters: [],
    currentIndex: 0,
    tabs: [
      { index: 0, name: '草帽团'}, 
      { index: 1, name: '悬赏金' }, 
      { index: 2, name: '能力者' }
    ],
    devilfruitTypes: ['','超人系','动物系','自然系'],
    swiperHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCharactersList[0].call(this);
    this.getCharactersList[1].call(this);
    this.getCharactersList[2].call(this);
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
    // this.getStrawCharactersList();
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
  bindSearch: function(e) {
    wx.navigateTo({
      url: '../characterSearch/characterSearch',
    })
  },
  getCharactersList: [
    function(){
      this.getStrawCharactersList();
    },
    function() {
      this.getBountyListDesc();
    },
    function() {
      this.getDevilfruitCharactersList();
    }
  ],
  // 获取草帽团成员 
  getStrawCharactersList: function() {
    getListInPriateReg({
      priateRegimentName: '草帽海贼团', success: res => {
      this.setData({ 
        swiperHeight: res.data.length * 240,
        strawHatCharacters: res.data.map(c => {
          return Object.assign({}, c, {
            bounty: c.bounty && convertBounty({bounty: c.bounty}) || ''
          });
        })
      });
      wx.stopPullDownRefresh();
    }});
  },
  // 获取有恶魔果实的角色
  getDevilfruitCharactersList: function() {
    getListHasDevilfruit({
      success: res => {
        this.setData({ devilfruitCharacters: res.data});
      }});
  },
  // 获取有赏金的人物, 按金额降序排列
  getBountyListDesc: function() {
    getListOrderByBountyDesc({ 
      success: res => {
        this.setData({ 
          swiperHeight: (this.data.bountyCharacters.length + res.data.length) * 240,
          bountyCharacters: this.data.bountyCharacters.concat(res.data.map(c => {
            return Object.assign({}, c, {
              bounty: c.bounty && convertBounty({bounty: c.bounty}) || ''
            });
          }))
        });
        wx.stopPullDownRefresh();
      }});
  },
  bindAdmin: function() {
    wx.navigateTo({
      url: '/admin/characters/list/list',
    })
  },
  characters: [
    function() { return this.data.strawHatCharacters},
    function () { return this.data.bountyCharacters},
    function () { return this.data.devilfruitCharacters }
  ],
  bindSwiperChange: function(e) {
    const { current} = e.detail;
    this.setData({
      currentIndex: current,
      swiperHeight: this.characters[current].call(this).length * 240
    });
  }
})