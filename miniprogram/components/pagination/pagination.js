// components/pagination/pagination.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    total: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        const pagecount = Math.ceil(newVal / 20);
        let pageList = [];
        for (let i = 0; i < pagecount; i ++){
          pageList.push( i + 1 );
        }
        this.setData({ pageList, pagecount});
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageindex: 1,
    pagecount: 0,
    pageSize: 20,
    pageList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump: function (e) {
      const { pageindex } = e.currentTarget.dataset;
      this.triggerEvent('buttontap', { pageindex }, {});
      this.setData({ pageindex});
    }
  }
})
