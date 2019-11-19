import { getWikiList } from '../../../domain/wikisDomain';
import regeneratorRuntime from '../../../common/regeneratorRuntime';


let wikitotal = 0;
let heightLeft = [];
let heightRight = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wikis: [],
    total: 0,
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
    // wx.startPullDownRefresh();
    this.fetchWikiList({});
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
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  scrolltolower: function () {
  },
  fetchWikiList: function ({ pageIndex = 1, pageSize = 20}) {
    wx.showLoading({
      title: '加载中',
    })
    getWikiList({
      pageIndex: pageIndex,
      pageSize: pageSize
    }).then(response => {
      const { data, total } = response;
      const promiselist = data.map(item => {
        return new Promise((resolve, reject) => {
          wx.getImageInfo({
            src: item.cover,
            success(res) {
              resolve({ ...res, ...item});
            }
          })
        }).then(res => res);
      });
      Promise.all(
        promiselist
      ).then(result => {
        let left = 0;
        let right = 0;
        let leftlist = [];
        let rightlist = [];
        for (const item of result) {
          if (right >= left) {
            leftlist.push(item);
            left += item.height;
          } else {
            rightlist.push(item);
            right += item.height;
          }
        }
        this.setData({
          wikisLeft: leftlist,
          wikisRight: rightlist
        }, () => {
          wx.hideLoading();
        });
      });
    });
  }
});