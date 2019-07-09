import { 
  getRegexpWikiList 
} from '../../../domain/wikisDomain';
import {
  fetchListInGroup
} from '../../../domain/characterDomain';
const { statusBarHeight } = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barHeight: statusBarHeight,
    hots: ["四皇", "七武海", "和之国", "阿拉巴斯坦", "拉夫德鲁", "凯多", "霸气"],
    wikis: [],
    searchActive: true,
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  fetchWikiList: function ({ keyword }) {
    getRegexpWikiList({
      keyword,
      success: data => {
        this.setData({
          searchActive: false,
          wikis: this.data.wikis.concat(
            data.map(w => {
              return {
                id: w._id,
                img: w.cover,
                title: w.title,
                type: 1,
                url: `/pages/wiki/detail/wikiDetailPage?id=${w._id}`
              }
            })
          ).sort((a, b) => { return a.type - b.type})
        });
        console.log(data);
      }
    });
  },
  fetchCharacterList: function ({ keyword }){
    fetchListInGroup({
      groupName: keyword,
      field: { img: true, name: true },
      success: data => {
        this.setData({
          searchActive: false,
          wikis: this.data.wikis.concat(
            data.map(c => {
              return {
                id: c._id,
                img: c.img,
                title: c.name,
                type: 2,
                url: `/pages/characterDetail/characterDetail?id=${c._id}`
              }
            })
          ).sort((a, b) => { return a.type - b.type })
        });
      }
    });
  },
  onSearch: function() {
    this.doSearch({ keyword: this.data.keyword });
  },
  onSearchInput: function(e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  onClear: function(){
    this.setData({ 
      keyword: '',
      searchActive: true
    });
  },
  onFocus: function() {
    this.setData({ searchActive: true});
  },
  onConfirm: function() {
    this.doSearch({ keyword: this.data.keyword});
  },
  doSearch: function ({ keyword}) {
    this.setData({
      wikis: []
    });
    this.fetchWikiList({
      keyword: keyword
    });
    this.fetchCharacterList({
      keyword: keyword
    });
  },
  onHotItemTap: function(e) {
    const { value } = e.currentTarget.dataset;
    this.setData({
      keyword: value
    });
    this.doSearch({ keyword: value});
  }
})