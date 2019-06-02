import Biological from '../../../entity/biological';
import Pirate from '../../../entity/pirate';
import { CharacterFactory} from '../../../entity/factory';
import { create, getListField } from '../../../database/people';
import { getList as getGroupsList } from '../../../database/groups';

Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    avator: '',
    img: '',
    name: '',
    fullname: '',
    bounty: 0,
    role: 0,
    levelName: '无',
    priateRegimentName: '',
    priateRegiments: [],
    devilfruitType: '无',
    devilfruitName: '',
    position: '无',
    height: 0,
    age: 0,
    birthday: '',
    roles: [{ type: 0, name: '无' }, { type: 1, name: '海贼' }, { type: 2, name: '海军' }, { type: 3, name: '革命军' }],
    devilfruitTypes: ['无', '自然系', '动物系', '超人系'],
    levels: ['元帅', '大将', '中将'],
    positions: ['总司令官','参谋总长'],
    relationTypes: ['爷爷', '父亲', '义兄'],
    relationCharacters: [],
    relationships: [],
    group: [],
    groups: [],
    job: ''
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    this.getCharacterListField();
    this.getGroups();
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
  getCharacterListField: function () {
    getListField({
      fields: {
        _id: true,
        avator: true,
        name: true
      }, success: res => {
        console.log(res);
        this.setData({ relationCharacters: res.data });
      }
    });
  },
  bindAddRelationship: function (e) {
    let _relationships = this.data.relationships;
    _relationships.push({
      _id: new Date().getTime(),
      type: '',
      charaId: '',
      avator: '',
      name: ''
    });
    this.setData({ relationships: _relationships });
  },
  bindRelationTypesChange: function (e) {
    const { id } = e.currentTarget.dataset;
    const value = this.data.relationTypes[parseInt(e.detail.value)];
    this.setData({
      relationships: this.data.relationships.map(r => {
        if (r._id === id) {
          r.type = value;
        }
        return r;
      })
    });
  },
  bindImgInput: function (e) {
    this.setData({ img: e.detail.value });
  },
  bindRelationCharactersChange: function (e) {
    const { id } = e.currentTarget.dataset;
    const _chara = this.data.relationCharacters[parseInt(e.detail.value)];
    this.setData({
      relationships: this.data.relationships.map(r => {
        if (r._id === id) {
          r.name = _chara.name;
          r.avator = _chara.avator;
          r.charaId = _chara._id;
        }
        return r;
      })
    });
  },
  bindAddGroup: function (e) {
    let _group = this.data.group;
    _group.push("");
    this.setData({ group: _group });
  },
  bindJob: function (e) {
    const value = e.detail.value;
    this.setData({ job: value });
  },
  bindGroupsChange: function (e) {
    const _group = this.data.groups[parseInt(e.detail.value)];
    const _index = e.currentTarget.dataset.index;
    let _tempGroup = this.data.group;
    _tempGroup[_index] = _group;
    this.setData({
      group: _tempGroup
    });
  },
  getGroups: function () {
    getGroupsList({
      success: res => {
        this.setData({ groups: res.data.map(g => g.name) });
      }
    });
  },
  bindHeightInput: function (e) {
    this.setData({ height: parseInt(e.detail.value) });
  },
  bindAgeInput: function (e) {
    this.setData({ age: parseInt(e.detail.value) });
  },
  bindBirthdayInput: function (e) {
    this.setData({ birthday: e.detail.value });
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
    this.setData({
      priateRegimentName: e.detail.value
    });
  },
  bindLevelChange: function(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      levelName: this.data.levels[index]
    });
  },
  bindPositionsChange: function(e) {
    const index = parseInt(e.detail.value);
    this.setData({
      position: this.data.positions[index]
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
      img: this.data.img,
      role: this.data.role,
      bounty: this.data.bounty,
      priateRegimentName: this.data.priateRegimentName,
      levelName: this.data.levelName,
      devilfruitType: this.data.devilfruitType,
      devilfruitName: this.data.devilfruitName,
      age: this.data.age,
      height: this.data.height,
      birthday: this.data.birthday,
      relationships: this.data.relationships.map(r => {
        let _r = r;
        delete _r._id;
        return r;
      }),
      group: this.data.group
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