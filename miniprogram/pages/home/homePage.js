import { getWikiList } from '../../domain/wikisDomain';
const { statusBarHeight } = getApp().globalData;

class WaterArea {
  constructor() {
    this.left = [];
    this.right = [];
  }
  fillup({ index, number, left }) {
    if (left) {
      this.left[index] = number;
    } else {
      this.right[index] = number;
    }
    this.checkLoadStatus();
  }
  checkLoadStatus() {
    let _allready = true;
    for(let height of this.left){
      if (!height){
        _allready = false;
        break;
      }
    }
    for (let height of this.right) {
      if (!height) {
        _allready = false;
        break;
      }
    }
    if (_allready){
      console.log('全部加载好了');
    }
  }
}
let heightLeft = [];
let heightRight = [];
let water = new WaterArea();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: statusBarHeight,
    wikisLeft: [],
    wikisRight: [],
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
        handleData({ key: 'wikisLeft', value: data.filter((element, index) => { return index % 2 === 0})});
        handleData({ key: 'wikisRight', value: data.filter((element, index) => { return index % 2 === 1 }) });
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
  },
  onImageLoad: function(e) {
    const { height, left, index} = e.detail;
    water.fillup({ index, number: height, left });
  }
});