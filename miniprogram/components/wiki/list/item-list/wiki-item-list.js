// components/wiki/list/item-list/wiki-item-list.js
let isLoading = false;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    total: Number,
    left: Array,
    right: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageindex: 1,
    pagesize: 20,
    isend: false,
    loading: false
  },

  observers: {
    'total,left,right': function (total, left, right) {
      this.setData({
        isend: (total <= (left.length + right.length)) && (total > 0),
        loading: false
      });
      isLoading = false;
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrolltolower: function () {
      if ((this.data.total > (this.data.left.length + this.data.right.length)) && !isLoading) {
        isLoading = true;
        const nextindex = this.data.pageindex + 1;
        this.setData({
          pageindex: nextindex,
          loading: true
        });
        this.triggerEvent('scrolltolower', { pageindex: nextindex, pagesize: this.data.pagesize }, {});
      }
    }
  }
})
