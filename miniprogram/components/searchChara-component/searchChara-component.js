// components/searchChara-component/searchChara-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    characters: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    keyWord: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearchTap: function() {
      let searchEventDetail = { keyword: this.data.keyWord};
      this.triggerEvent('search', searchEventDetail, {});
    },
    bindKeyWordInput: function(e) {
      this.setData({ keyWord: e.detail.value });
    },
    bindCharacterTap: function(e) {
      const { avator, id, name } = e.currentTarget.dataset;
      this.triggerEvent('itemTap', { avator, id, name}, {})
    },
    onCloseTap: function(e) {
      this.triggerEvent('close', {}, {});
    }
  }
})
