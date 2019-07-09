import { getBannerList} from '../../domain/bannersDomain';
import { getStoryList } from '../../domain/storysDomain';
import { getWikiList } from '../../domain/wikisDomain';
const { statusBarHeight } = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: statusBarHeight,
    banners: [],
    storys: [],
    wikis: [],
    pageIndex: 1,
    pageSize: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.fetchWikiList({ handleData: this.directSetData});
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  fetchWikiList: function ({ handleData}){
    getWikiList({
      pageIndex: this.data.pageIndex, 
      pageSize: this.data.pageSize,
      success: data => {
        handleData({ key: 'wikis', value: data});
      }
    });
  },
  directSetData: function ({ key, value}) {
    let _data = {};
    _data[key] = value;
    this.setData(_data);
  },
  appendSetData: function ({ key, value }) {

  },
  switchTimelineTab: function(e) {
    getApp().globalData.timeLineIndex = e.currentTarget.dataset.index;
    wx.switchTab({
      url: '/pages/timeLine/timeLine',
    })
  }
})