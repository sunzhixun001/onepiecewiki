import { fetchRegexp} from '../../../domain/characterDomain.js';
import { getWikiCharacters } from '../../../domain/wikisDomain.js';
let existCharacters = [];
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
    const { id, type } = options;
    getWikiCharacters({ 
      id
    }).then(characters => {
      existCharacters = characters;
    });
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

  search: function (e) {
    const { value} = e.detail;
    fetchRegexp({ 
      keyword: value
    }).then(data => {
      this.setData({ 
        characters: data.map(d => {
          if (existCharacters.find(c => c._id === d._id)) {
            d.lock = true;
          } else {
            d.lock = false;
          }
          return d;
        })
      });
    });
  },
  bindtap: function (e) {
    const { id, avator} = e.currentTarget.dataset;
    this.setData({
      characters: this.data.characters.map(c => {
        if (c._id === id) {
          c.selected = !c.selected;
        }
        return c;
      })
    });
  }
})