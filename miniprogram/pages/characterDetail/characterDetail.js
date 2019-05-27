import { get, getListInPriateReg } from '../../database/people';
import { convertBounty} from '../../common/implement';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fullname: '',
    img: '',
    bounty: '无',
    priateRegimentName: '',
    age: 0,
    birthday: '',
    height: 0,
    partners: [],
    relationships: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCharacter({ id: options.id});
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
  getCharacter: function ({ id }) {
    get({
      id, success: res => {
        if (res.data.length > 0) {
          const {
            avator,
            img,
            name,
            _id,
            fullname,
            role,
            bounty,
            priateRegimentName,
            devilfruitType,
            devilfruitName,
            age,
            levelName,
            birthday,
            height,
            relationships
          } = res.data[0];
          const _set = new Set();
          if (relationships){
            relationships.forEach(x => _set.add(x.type));
          }
          let newRelationships = [];
          for(let item of _set.values()){
            newRelationships.push({
              type: item,
              items: relationships.filter(r => r.type === item)
            });
          }
          this.setData({
            avator,
            img: img || '',
            name,
            fullname,
            bounty: bounty ? convertBounty({bounty}) : '无',
            priateRegimentName: priateRegimentName || '无',
            devilfruitType: devilfruitType || '无',
            devilfruitName: devilfruitName || '',
            id: _id, 
            role: role || 0,
            levelName: levelName || '无',
            age: age || 0,
            height: height || 0,
            birthday: birthday?`${birthday.split('-')[0]}月${birthday.split('-')[1]}日`:'',
            relationships: newRelationships
          });
          if(priateRegimentName){
            this.getPriateRegMembers({ priateRegimentName });
          }
        }
      }
    })
  },
  getPriateRegMembers: function ({ priateRegimentName}){
    getListInPriateReg({ priateRegimentName, success: res => {
      this.setData({ partners: res.data});
    }});
  },
  bindPartnersClick: function(e) {
    const { id} = e.currentTarget.dataset;
    wx.redirectTo({
      url: 'characterDetail?id=' + id,
    })
  }
})