import { getWikiList } from '../../domain/wikisDomain';
import { getList } from '../../database/wikisRepository';
const { statusBarHeight } = getApp().globalData;

class WaterArea {
  constructor() {
    this.left = [];
    this.right = [];
    this.leftCount = 0;
    this.rightCount = 0;
    this.startup = false;
  }
  fillup({ index, height, width, left }) {
    // const _h = height * (200 / width)
    if (left) {
      this.left[index] = height;
    } else {
      this.right[index] = height;
    }
    return this.checkLoadStatus();
  }
  // 判断所有的图片都加载好了没
  checkLoadStatus() {
    let _allready = true;
    if (this.leftCount === this.left.length){
      for(let height of this.left){
        if (!height){
          _allready = false;
          break;
        }
      }
    } else _allready = false;
    if (_allready && this.rightCount === this.right.length){
      for (let height of this.right) {
        if (!height) {
          _allready = false;
          break;
        }
      }
    }
    return _allready;
  }
  compare() {
    console.log(this.left, this.right);
    this.startup = false;
    let movetype = 0;
    const _leftheight = this.doReduce(this.left);
    const _rightheight = this.doReduce(this.right);
    const _leftlast = this.left[this.left.length - 1];
    const _rightlast = this.right[this.right.length - 1];
    if (_leftheight - _leftlast > _rightheight){
      movetype = 1;
    } else if (_rightheight - _rightlast > _leftheight){
      movetype = 2;
    }
    return movetype;
  }
  doReduce(array) {
    console.log("array: ", array);
    return array.reduce((acc, cur) => {
      return acc + cur;
    });
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
    pageSize: 20,
    pageEnd: false
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
    water.leftCount = 0;
    water.rightCount = 0;
    this.fetchWikiList({ handleData: this.directSetData, pageIndex: 1, pageSize: this.data.pageSize});
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.pageEnd)
      this.fetchWikiList({ handleData: this.appendSetData, pageIndex: this.data.pageIndex + 1, pageSize: this.data.pageSize });
  },
  fetchWikiList: function ({ handleData, pageIndex, pageSize}){
    water.startup = true;
    getWikiList({
      pageIndex: pageIndex, 
      pageSize: pageSize,
      success: data => {
        this.data.pageIndex = pageIndex
        if (data.length < this.data.pageSize){
          this.data.pageEnd = true;
        }
        const _leftarray = data.filter((element, index) => { return index % 2 === 0 });
        const _rightarray = data.filter((element, index) => { return index % 2 === 1 });
        handleData({ key: 'wikisLeft', value: _leftarray});
        handleData({ key: 'wikisRight', value: _rightarray });
        water.leftCount = water.leftCount + _leftarray.length;
        water.rightCount = water.rightCount + _rightarray.length;
        wx.stopPullDownRefresh();
      }
    });
  },
  directSetData: function ({ key, value}) {
    let _data = {};
    _data[key] = value;
    this.setData(_data);
  },
  appendSetData: function ({ key, value }) {
    let _data = {};
    _data[key] = this.data[key].concat(value);
    this.setData(_data);
  },
  switchTimelineTab: function(e) {
    getApp().globalData.timeLineIndex = e.currentTarget.dataset.index;
    wx.switchTab({
      url: '/pages/timeLine/timeLine',
    })
  },
  onImageLoad: function(e) {
    const { height, width, left, index} = e.detail;
    if (water.startup && water.fillup({ index, height, width, left })){
      const move = water.compare();
      let _left = this.data.wikisLeft;
      let _right = this.data.wikisRight;
      if(move === 1){
        _right.push(_left.pop());
      } else if (move === 2){
        _left.push(_right.pop());
      }
      console.log("开始移动");
      this.setData({
        wikisLeft: _left,
        wikisRight: _right
      });
    }
  }
});