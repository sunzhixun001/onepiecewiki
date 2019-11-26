// components/character/list/character-list/character-list.js

let loading = false;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: Array,
    total: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageindex: 1,
    pagesize: 20,
    isloading: false,
    idend: false
  },

  observers: {
    'items, total': function (items, total) {
      this.setData({
        idend: (items.length >= total) && (items.length > 0),
        isloading: false
      }, () => {
        loading = false;
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindscrolltolower: function () {
      if (this.data.items.length < this.data.total && !loading) {
        this.setData({ isloading: true});
        loading = true;
        const nextindex = this.data.pageindex + 1;
        this.setData({ pageindex: nextindex});
        console.log("bindscrolltolower");
        this.triggerEvent("scrolltolower", { pageindex: nextindex, pagesize: 20}, {})
      }
    }
  }
})
