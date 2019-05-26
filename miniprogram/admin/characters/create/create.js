import Biological from '../../../entity/biological';
import Pirate from '../../../entity/pirate';
import { CharacterFactory} from '../../../entity/factory';
import { create } from '../../../database/people';
import { getList as getPriateRegimentsList } from '../../../database/priateRegiments';

Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    avator: '',
    name: '',
    fullname: '',
    bounty: 0,
    role: 0,
    levelName: '无',
    priateRegimentIndex: 0,
    priateRegimentName: '',
    priateRegiments: [],
    devilfruitType: '无',
    devilfruitName: '',
    roles: [{ type: 0, name: '无' }, { type: 1, name: '海贼' }, { type: 2, name: '海军' }, { type: 3, name: '革命军' }],
    devilfruitTypes: ['无', '自然系', '动物系', '超人系'],
    levels: ['元帅', '大将', '中将']
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    this.getPriateRegiments();
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
  bindAvatorInput: function(e){
    this.setData({
      avator: e.detail.value
    });
  },
  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },
  bindFullNameInput: function (e) {
    this.setData({ fullname: e.detail.value });
  },
  bindBountyInput: function (e) {
    this.setData({ bounty: parseInt(e.detail.value) });
  },
  bindLevelInput: function(e) {
    this.setData({ level: e.detail.value});
  },
  roleChange: function (e) {
    this.setData({ role: parseInt(e.detail.value) });
  },
  bindPriateRegimentsChange: function (e) {
    const index = parseInt(e.detail.value);
    this.setData({
      priateRegimentIndex: index,
      priateRegimentName: this.data.priateRegiments[index].name
    });
  },
  getPriateRegiments: function () {
    getPriateRegimentsList({
      success: res => {
        this.setData({ priateRegiments: res.data });
      }
    });
  },
  bindLevelChange: function(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      levelName: this.data.levels[index]
    });
  },
  devilfruitTypesChange: function (e) {
    const value = e.detail.value;
    this.setData({ devilfruitType: value });
    if (value === '无') {
      this.setData({ devilfruitName: '' });
    }
  },
  bindDevilfruitNameInput: function(e){
    this.setData({ devilfruitName: e.detail.value });
  },
  onSureClick(e) {
    let data = {
      name: this.data.name,
      fullname: this.data.fullname,
      avator: this.data.avator,
      role: this.data.role,
      bounty: this.data.bounty,
      priateRegimentName: this.data.priateRegimentName,
      levelName: this.data.levelName,
      devilfruitType: this.data.devilfruitType,
      devilfruitName: this.data.devilfruitName
    };
    const factory = new CharacterFactory({ type: this.data.role});
    const biological = factory.create({data});
    // console.log(biological);
		create({ biological, success: res => {
			// errMsg:"collection.add:ok"
			// _id:"57896b495ce4c1a803352b52014c5f39"
			const { _id, errMsg} = res;
			if (errMsg === "collection.add:ok" && _id){
				wx.showToast({
					title: '添加成功'
				});
				// this.setData({ name:''});
			}
		}});
  },
  getBiological: () => {
    
  }
})