import { get} from '../../../database/people';
import { getList as getPriateRegimentsList } from '../../../database/priateRegiments';
import { update } from '../../../database/people';


Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id: '',
		avator: '', 
		name: '',
		fullname: '',
		reward: 0,
		role: 0,
		priateRegimentIndex: 0,
		priateRegimentName: '',
		priateRegiments: [],
		roles: [{ type: 0, name: '无' }, { type: 1, name: '海贼' }, { type: 2, name: '海军' }]
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
	bindFullNameInput: function (e) {
		this.setData({ fullname: e.detail.value });
	},
	bindNameInput: function (e) {
		this.setData({ name: e.detail.value });
	},
	bindRewardInput: function(e) {
		this.setData({ reward: parseInt(e.detail.value) });
	},
	roleChange: function(e) {
		this.setData({ role: parseInt(e.detail.value)});
	},
	getCharacter: function({id}){
		get({id, success: res => {
			if(res.data.length > 0){
				const { avator, name, _id, fullname, role, reward, priate} = res.data[0];
				this.setData({ 
					avator, 
					name, 
					fullname, 
					reward: priate && priate.reward || 0,
					priateRegimentName: priate && priate.priateRegimentName || '无',
					id: _id, role: role || 0
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
	getPriateRegiments: function() {
		getPriateRegimentsList({success: res => {
			this.setData({ priateRegiments: res.data});
		}});
	},
	onSureClick: function() {
		let data = {
			name: this.data.name,
			fullname: this.data.fullname,
			role: this.data.role
		};
		if (this.data.role === 1){
			data.priate = {
				reward : this.data.reward,
				priateRegimentName: this.data.priateRegimentName
			};
		}else{
			data.priate = null;
		}
		update({
			id: this.data.id,
			data,
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