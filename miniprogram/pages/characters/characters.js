import { getList} from '../../database/people';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    characters: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCharactersList();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCharactersList: function() {
    const convertBounty = number => {
      const billion = parseInt(number / 100000000);
      let tenthousand = 0;
      const remainder = number % 100000000;
      if (remainder > 0){
        tenthousand = remainder / 10000;
      }
      return `${billion > 0 ? billion + '亿' : ''}${tenthousand > 0 ? tenthousand + '万':''}贝利`;
    };
    getList({success: res => {
      this.setData({ 
        characters: res.data.map(c => {
          return Object.assign({}, c, {
            bounty: c.priate && c.priate.reward && convertBounty(c.priate.reward) || ''
          });
        })
      });
    }});
  },
  
})