import { update, getListField } from '../../../database/characterRepository';
import { CharacterFactory } from '../../../entity/factory';
import { getList as getGroupsList } from '../../../database/groups';
import { fetchRegexp, fetchCharacter } from '../../../domain/characterDomain';

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
    pinyinName: '',
    englishName: '',
    japaneseName: '',
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
    relationshipIndex: 0,
    roles: [{ type: 0, name: '无' }, { type: 1, name: '海贼' }, { type: 2, name: '海军' }, { type: 3, name: '革命军' }],
    devilfruitTypes: ['无', '自然系', '动物系', '超人系'],
    levels: ['元帅', '大将', '中将', '大佐','三等兵'],
    relationTypes: ['爷爷','父亲', '义兄', '母亲'],
    groups: ['极恶的世代', '王下七武海', '四皇', '甜点四将星', 'CP9', 'CP0', '达旦家族'],
    job: '',
    characters: [],
    searchModalActivate: false,
    statusBarHeight: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getCharacter({id: options.id});
    this.setData({ statusBarHeight: getApp().globalData.statusBarHeight });
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
    fetchCharacter({
      id, 
      success: res => {
			if(res.data){
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
          job,
          pinyinName,
          englishName,
          japaneseName,
          position
        } = res.data;
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
          job: job || '',
          pinyinName: pinyinName || '',
          englishName: englishName || '',
          japaneseName: japaneseName || '',
          position: position || ''
				});
			}
		}})
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
  bindPosition: function(e) {
    this.setData({position: e.detail.value});
  },
  bindAddGroup: function(e) {
    let _group = this.data.group;
    _group.push("");
    this.setData({ group: _group});
  },
  bindRelationTypesInput: function(e){
    const { id} = e.currentTarget.dataset;
    const value = e.detail.value;
    this.setData({
      relationships: this.data.relationships.map(r => {
        if (r._id === id){
          r.type = value;
        }
        return r;
      })
    });
  },
  bindRelationCharactersInput: function(e){
    const { id } = e.currentTarget.dataset;
    const _chara = e.detail.value;
    // this.setData({
    //   relationships: this.data.relationships.map(r => {
    //     if (r._id === id) {
    //       r.name = _chara.name;
    //       r.avator = _chara.avator;
    //       r.charaId = _chara._id;
    //     }
    //     return r;
    //   })
    // });
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
  bindPinyinNameInput: function (e) {
    this.setData({ pinyinName: e.detail.value });
  },
  bindEnglishNameInput: function (e) {
    this.setData({ englishName: e.detail.value });
  },
  bindJapaneseNameInput: function (e) {
    this.setData({ japaneseName: e.detail.value });
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
      job: this.data.job,
      pinyinName: this.data.pinyinName,
      englishName: this.data.englishName,
      japaneseName: this.data.japaneseName,
      position: this.data.position
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
	},
  bindSearchTap: function (e) {
    const { keyword } = e.detail;
    if (keyword) {
      this.searchCharacters({ keyword });
    }
  },
  searchCharacters: function ({ keyword }) {
    fetchRegexp({
      keyword,
      success: res => {
        this.setData({ characters: res });
      }
    })
  },
  bindCharacterTap: function (e) {
    const { avator, id, name } = e.detail;
    const { relationshipIndex } = this.data;
    this.setData({
      searchModalActivate: false,
      relationships: this.data.relationships.map((r, i) => {
        if (i === relationshipIndex) {
          r.name = name;
          r.avator = avator;
          r.name = name;
          r.charaId = id;
        }
        return r;
      })
    });
  },
  closeModal: function () {
    this.setData({ searchModalActivate: false });
  },
  bindRelationCharactersTap: function (e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      searchModalActivate: true,
      relationshipIndex: index
    });
  }
})