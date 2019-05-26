import { getList, getListInPriateReg, getListHasDevilfruit, getListOrderByBountyDesc} from '../../database/people';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    characters: [],
    tabs: [
      { index: 0, name: '草帽团'}, 
      { index: 1, name: '悬赏金' }, 
      { index: 2, name: '能力者' },
      { index: 3, name: '政府' }
    ],
    tabIndex: 0,
    devilfruitTypes: ['','超人系','动物系','自然系']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCharactersList[this.data.tabIndex].call(this);
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
    this.getSwrawCharactersList();
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
    if(_index !== this.data.tabIndex){
      this.setData({ tabIndex: _index});
      this.getCharactersList[_index].call(this);
    }
  },
  bindAvatoError: function(e){
    console.log(e);
  },
  getCharactersList: [
    function(){
      this.getSwrawCharactersList();
    },
    function() {
      this.getBountyListDesc();
    },
    function() {
      this.getDevilfruitCharactersList();
    },
    function() {
      
    }
  ],
  convertBounty: function (bounty) {
    let result = "";
    
    if (bounty < 10000){
      result = `${bounty}贝利`;
    } else if (10000 <= bounty && bounty < 100000000 ){
      result = `${bounty / 10000}万贝利`;
    }else {
      const billion = parseInt(bounty / 100000000);
      let tenthousand = 0;
      const remainder = bounty % 100000000;
      if (remainder > 0) {
        tenthousand = remainder / 10000;
      }
      result = `${billion > 0 ? billion + '亿' : ''}${tenthousand > 0 ? tenthousand + '万' : ''}贝利`;
    }
    return result;
  },
  // 获取草帽团成员 
  getSwrawCharactersList: function() {
    const _convertBounty = this.convertBounty;
    getListInPriateReg({
      priateRegimentName: '草帽海贼团', success: res => {
      this.setData({ 
        characters: res.data.map(c => {
          return Object.assign({}, c, {
            bounty: c.bounty && _convertBounty(c.bounty) || ''
          });
        })
      });
      wx.stopPullDownRefresh();
    }});
  },
  // 获取有恶魔果实的角色
  getDevilfruitCharactersList: function() {
    getListHasDevilfruit({success: res => {
      this.setData({ characters: res.data});
    }});
  },
  getBountyListDesc: function() {
    const _convertBounty = this.convertBounty;
    getListOrderByBountyDesc({ success: res => {
      this.setData({ 
        characters: res.data.map(c => {
          return Object.assign({}, c, {
            bounty: c.bounty && _convertBounty(c.bounty) || ''
          });
        })
      });
      wx.stopPullDownRefresh();
    }});
  }
})