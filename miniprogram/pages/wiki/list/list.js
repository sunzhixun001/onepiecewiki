import { getWikiList } from '../../../domain/wikisDomain';
import regeneratorRuntime from '../../../common/regeneratorRuntime';

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
  scrolltolower: function (e) {
    this.fetchWikiList(e.detail);
  },
  fetchWikiList: function ({ pageindex = 1, pagesize = 20}) {
    if (this.data.wikisLeft.length + this.data.wikisRight.length === 0 ) {
      wx.showLoading({
        title: '加载中'
      });
    }
    getWikiList({
      pageindex: pageindex,
      pagesize: pagesize
    }).then(response => {
      const { data, total } = response;
      const promiselist = data.map(item => {
        return new Promise((resolve, reject) => {
          if (item.cover) {
            wx.getImageInfo({
              src: item.cover,
              success(res) {
                resolve({ ...res, ...item });
              }
            });
          } else {
            resolve({ height: 0, ...item });
          }
          
        }).then(res => res);
      });
      Promise.all(
        promiselist
      ).then(result => {
        let left = this.data.wikisLeft.reduce((acc, cur) => {
          return acc + cur.height
        }, 0);
        let right = this.data.wikisRight.reduce((acc, cur) => {
          return acc + cur.height
        }, 0);;
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
          total: total,
          wikisLeft: this.data.wikisLeft.concat(leftlist),
          wikisRight: this.data.wikisRight.concat(rightlist)
        }, () => {
          wx.hideLoading();
        });
      });
    });
  }
});