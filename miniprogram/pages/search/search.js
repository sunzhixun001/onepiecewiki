import {
  searchWikiList
} from '../../domain/wikisDomain';
import {
  getSearch
} from '../../domain/characterDomain';
import { setStorage, getStorage } from '../../common/storage';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: ["四皇", "七武海", "和之国", "阿拉巴斯坦", "拉夫德鲁", "凯多", "霸气"],
    wikis: [],
    searchActive: true,
    keyword: '',
    historyKeyword: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchHistorys();
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
    searchWikiList({
      keyword
    }).then(data => {
      this.setData({
        searchActive: false,
        wikis: this.data.wikis.concat(
          data.map(w => {
            return {
              id: w._id,
              img: w.cover,
              title: w.title,
              type: 1,
              typename: '百科',
              describe: w.summary[0],
              url: `/pages/wiki/detail/wikiDetailPage?id=${w._id}`
            }
          })
        )
      });
    });
  },
  fetchCharacterList: function ({ keyword }) {
    getSearch({
      keyword: keyword,
      field: {
        avator: true,
        fullname: true,
        profile: true
      }
    }).then(data => {
      this.setData({
        searchActive: false,
        wikis: this.data.wikis.concat(
          data.map(c => {
            return {
              id: c._id,
              img: c.avator,
              title: c.fullname,
              type: 2,
              typename: '人物',
              describe: c.profile,
              url: `/pages/characters/detail/characterDetail?id=${c._id}`
            }
          })
        )
      });
    });
  },
  onSearch: function () {
    let _kw = this.data.keyword.replace(/ /g, "");
    if (_kw) {
      this.doSearch({ keyword: this.data.keyword });
      this.setSearchHistorys({ newword: this.data.keyword });
    } else {
      wx.showToast({
        title: '请先输入搜索词',
        icon: 'none'
      })
    }
  },
  onSearchInput: function (e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  onClear: function () {
    this.setData({
      keyword: '',
      searchActive: true
    });
  },
  onFocus: function () {
    this.setData({ searchActive: true });
  },
  doSearch: function ({ keyword }) {
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
  onHotItemTap: function (e) {
    const { value } = e.currentTarget.dataset;
    this.setData({
      keyword: value
    });
    this.doSearch({ keyword: value });
  },
  // 获取搜索历史
  getSearchHistorys() {
    // getStorage({
    //   key: "search-timeline-keyword",
    //   successCallback: data => {
    //     this.setData({
    //       historyKeyword: this.sortHistoryDesc({ array: data || [] })
    //     });
    //   }
    // });
  },
  // 设置搜索历史
  setSearchHistorys({ newword }) {
    let _kws = this.sortHistoryDesc({ array: this.data.historyKeyword });
    if (_kws.length === 20) {
      _kws.pop();
    }
    let _set = new Set(_kws);
    _set.delete(newword);
    _set.add(newword);
    console.log("_set:", _set);
    setStorage({
      key: "search-timeline-keyword",
      data: Array.from(_set)
    });
    this.setData({
      historyKeyword: this.sortHistoryDesc({ array: Array.from(_set) })
    });
  },
  clearSearchHistorys() {
    setStorage({
      key: "search-timeline-keyword",
      data: []
    });
    this.setData({
      historyKeyword: []
    });
  },
  sortHistoryDesc({ array }) {
    let result = [];
    if (array) {
      for (let i = array.length - 1; i >= 0; i--) {
        result[i] = array[array.length - 1 - i];
      }
    }
    return result;
  },
  // 点击清除搜索历史
  onTrashHistoryTap() {
    this.clearSearchHistorys();
  }
})