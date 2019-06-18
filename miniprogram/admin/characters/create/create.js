import Biological from '../../../entity/biological';
import Pirate from '../../../entity/pirate';
import { CharacterFactory} from '../../../entity/factory';
import { getListField } from '../../../database/characterRepository';
import { fetchRegexp, createCharacter } from '../../../domain/characterDomain';

Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    avator: '',
    img: '',
    name: '',
    fullname: '',
    pinyinName: '',
    englishName: '',
    japaneseName: '',
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
    levels: ['元帅', '大将', '中将', '大佐','三等兵'],
    positions: ['总司令官','参谋总长'],
    relationTypes: ['爷爷', '父亲', '义兄'],
    relationCharacters: [],
    relationships: [],
    relationshipIndex: 0,
    group: [],
    groups: ['极恶的世代', '王下七武海', '四皇', '甜点四将星', 'CP9', 'CP0','达旦家族'],
    job: '',
    characters: [],
    searchModalActivate: false,
    statusBarHeight: 0
    
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    this.getCharacterListField(); 
    this.setData({ statusBarHeight: getApp().globalData.statusBarHeight });
    wx.showModal({
      title: 'aaa',
      content: 'bbb',
    })
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
  bindRelationTypesInput: function (e) {
    const { index } = e.currentTarget.dataset;
    const value = e.detail.value;
    this.setData({
      relationships: this.data.relationships.map((r, i) => {
        if (i === index) {
          r.type = value;
        }
        return r;
      })
    });
  },
  bindImgInput: function (e) {
    this.setData({ img: e.detail.value });
  },
  bindRelationCharactersTap: function(e){
    const { index} = e.currentTarget.dataset;
    this.setData({
      searchModalActivate: true,
      relationshipIndex: index
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
  bindPinyinNameInput: function(e) {
    this.setData({ pinyinName: e.detail.value });
  },
  bindEnglishNameInput: function (e) {
    this.setData({ englishName: e.detail.value });
  },
  bindJapaneseNameInput: function (e) {
    this.setData({ japaneseName: e.detail.value });
  },
  onSureClick(e) {
    let data = {
      name: this.data.name,
      fullname: this.data.fullname,
      pinyinName: this.data.pinyinName,
      englishName: this.data.englishName,
      japaneseName: this.data.japaneseName,
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
      group: this.data.group,
      job: this.data.job
    };
    const factory = new CharacterFactory({ type: this.data.role});
    const biological = factory.create({data});
    // console.log(biological);
		createCharacter({ 
      biological, 
      success: result => {
        if (result){
          wx.showToast({
            title: '新建成功'
          })
        }
		}});
  },
  getBiological: () => {
    
  },
  bindSearchTap: function(e) {
    const { keyword} = e.detail;
    if (keyword) {
      this.searchCharacters({ keyword});
    }
  },
  searchCharacters: function({keyword}) {
    fetchRegexp({
      keyword, 
      success: res => {
        this.setData({ characters: res});
      }
    })
  },
  bindCharacterTap: function(e) {
    const { avator, id, name} = e.detail;
    const { relationshipIndex} = this.data;
    this.setData({
      searchModalActivate: false,
      relationships: this.data.relationships.map((r, i) => {
        if (i === relationshipIndex) {
          r.avator = avator;
          r.name = name;
          r.charaId = id;
        }
        return r;
      })
    });
  },
  closeModal: function() {
    this.setData({searchModalActivate: false});
  },
  formReast: function() {

  }
})