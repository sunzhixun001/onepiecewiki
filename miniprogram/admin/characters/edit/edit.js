import { get, update, getListField } from '../../../database/people';
import { CharacterFactory } from '../../../entity/factory';
import { getList as getGroupsList } from '../../../database/groups';

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
    height: 0,
    age: 0,
    birthday: '',
		priateRegimentIndex: 0,
		priateRegimentName: '',
    devilfruitType: '无',
    devilfruitName: '',
    levelName: '无',
    group: [],
    relationships: [],
		roles: [{ type: 0, name: '无' }, { type: 1, name: '海贼' }, { type: 2, name: '海军' }],
    devilfruitTypes: ['无', '自然系', '动物系', '超人系'],
    levels: ['元帅', '大将', '中将'],
    relationTypes: ['爷爷','父亲', '义兄'],
    relationCharacters: [],
    groups: [],
    job: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCharacter({id: options.id});
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
          levelName,
          age,
          height,
          birthday,
          relationships,
          group,
          job
        } = res.data[0];
				this.setData({ 
					avator, 
          img: img || '',
					name, 
					fullname, 
          bounty: bounty || 0,
					priateRegimentName:  priateRegimentName || '无',
          devilfruitType: devilfruitType || '无',
          devilfruitName: devilfruitName || '',
					id: _id, role: role || 0,
          levelName: levelName || '无',
          age: age || 0,
          height: height || 0,
          birthday: birthday || '',
          relationships: relationships || [],
          group: group || [],
          job: job || ''
				});
			}
		}})
	},
  getCharacterListField: function(){
    getListField({ fields: {
      _id: true,
      avator: true,
      name: true
    }, success: res => {
      console.log(res);
      this.setData({ relationCharacters: res.data});
    }});
  },
  getGroups: function() {
    getGroupsList({ success: res => {
      this.setData({ groups: res.data.map(g => g.name)});
    }});
  },
	bindPriateRegiments: function(e){
		const value = e.detail.value;
		this.setData({ priateRegimentName: value});
	},
  bindJob: function(e) {
    const value = e.detail.value;
    this.setData({ job: value });
  },
  bindHeightInput: function(e) {
    this.setData({ height: parseInt(e.detail.value)});
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
  bindBirthdayInput: function(e) {
    this.setData({ birthday: e.detail.value});
  },
  bindAgeInput: function(e){
    this.setData({ age: parseInt(e.detail.value) });
  },
  bindAddRelationship: function(e){
    let _relationships = this.data.relationships;
    _relationships.push({
      _id: new Date().getTime(),
      type: '',
      charaId: '',
      avator: '',
      name: ''
    });
    this.setData({ relationships: _relationships});
  },
  bindAddGroup: function(e) {
    let _group = this.data.group;
    _group.push("");
    this.setData({ group: _group});
  },
  bindRelationTypesChange: function(e){
    const { id} = e.currentTarget.dataset;
    const value = this.data.relationTypes[parseInt(e.detail.value)];
    this.setData({
      relationships: this.data.relationships.map(r => {
        if (r._id === id){
          r.type = value;
        }
        return r;
      })
    });
  },
  bindRelationCharactersChange: function(e){
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
  bindGroupsChange: function(e) {
    const _group = this.data.groups[parseInt(e.detail.value)];
    const _index = e.currentTarget.dataset.index;
    let _tempGroup = this.data.group;
    _tempGroup[_index] = _group;
    this.setData({
      group: _tempGroup
    });
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
      levelName: this.data.levelName,
      age: this.data.age,
      height: this.data.height,
      birthday: this.data.birthday,
      relationships: this.data.relationships.map(r => {
        let _r = r;
        delete _r._id;
        return r;
      }),
      group: this.data.group,
      job: this.data.job
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