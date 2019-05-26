import { get} from '../../../database/people';
import { getList as getPriateRegimentsList } from '../../../database/priateRegiments';
import { update } from '../../../database/people';
import { CharacterFactory } from '../../../entity/factory';

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: '',
		avator: '', 
    img: '',
		name: '',
		fullname: '',
    bounty: 0,
		role: 0,
		priateRegimentIndex: 0,
		priateRegimentName: '',
    devilfruitType: '无',
    devilfruitName: '',
    levelName: '无',
		priateRegiments: [],
		roles: [{ type: 0, name: '无' }, { type: 1, name: '海贼' }, { type: 2, name: '海军' }],
    devilfruitTypes: ['无', '自然系', '动物系', '超人系'],
    levels: ['元帅', '大将', '中将']
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCharacter({id: options.id});
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
  bindAvatorInput: function(e) {
    this.setData({ avator: e.detail.value });
  },
  bindImgInput: function(e) {
    this.setData({ img: e.detail.value});
  },
	bindFullNameInput: function (e) {
		this.setData({ fullname: e.detail.value });
	},
	bindNameInput: function (e) {
		this.setData({ name: e.detail.value });
	},
	bindBountyInput: function(e) {
    this.setData({ bounty: parseInt(e.detail.value) });
	},
	roleChange: function(e) {
		this.setData({ role: parseInt(e.detail.value)});
	},
  devilfruitTypesChange: function(e) {
    const value = e.detail.value;
    this.setData({ devilfruitType: value });
    if (value === '无'){
      this.setData({ devilfruitName: '' });
    }
  },
	getCharacter: function({id}){
		get({id, success: res => {
			if(res.data.length > 0){
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
          levelName
        } = res.data[0];
				this.setData({ 
					avator, 
          img,
					name, 
					fullname, 
          bounty: bounty || 0,
					priateRegimentName:  priateRegimentName || '无',
          devilfruitType: devilfruitType || '无',
          devilfruitName: devilfruitName || '',
					id: _id, role: role || 0,
          levelName: levelName || '无'
				});
			}
		}})
	},
	bindPriateRegimentsChange: function(e){
		const index = parseInt(e.detail.value);
		this.setData({ 
			priateRegimentIndex: index,
			priateRegimentName: this.data.priateRegiments[index].name
		});
	},
  bindDevilfruitNameInput: function(e){
    this.setData({
      devilfruitName: e.detail.value
    });
  },
  bindLevelChange: function (e) {
    const index = parseInt(e.detail.value);
    this.setData({
      levelName: this.data.levels[index]
    });
  },
	getPriateRegiments: function() {
		getPriateRegimentsList({success: res => {
			this.setData({ priateRegiments: res.data});
		}});
	},
	onSureClick: function() {
    let data = {
      name: this.data.name,
      fullname: this.data.fullname,
      avator: this.data.avator,
      img: this.data.img,
      role: this.data.role,
      bounty: this.data.bounty,
      priateRegimentName: this.data.priateRegimentName,
      devilfruitType: this.data.devilfruitType,
      devilfruitName: this.data.devilfruitName,
      levelName: this.data.levelName
    };
    const factory = new CharacterFactory({ type: this.data.role });
    const biological = factory.create({ data });
		update({
			id: this.data.id,
      biological,
			success: res => {
				// errMsg:"document.update:ok"
				// stats:{update:0}
				const { errMsg, stats } = res;
				if (errMsg === "document.update:ok"){
					wx.showToast({
						title: '保存成功'
					})
				}
			}
		});
	}
})