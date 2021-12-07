// components/timeline/list/timeline-list/timeline-list.js
let loading = false;
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datasource: Array,
    total: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    idend: false,
    isempty: false,
    isloading: false,
    pageindex: 1,
    pagesize: 20,
    showImage: app.globalData.showImage
  },

  observers: {
    'datasource, total': function (datasource, total) {
      this.setData({
        idend: (datasource.length >= total) && (datasource.length > 0),
        isempty: total === 0,
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
    tap: function (e) {
      this.triggerEvent('agechange', {}, {})
    },
    scrolltolower: function (e) {
      if (!this.data.idend && !loading) {
        this.setData({ isloading: true});
        loading = true;
        const next = this.data.pageindex + 1;
        this.setData({ pageindex: next});
        this.triggerEvent('scrolltolower', { pageindex: next, pagesize: this.data.pagesize}, {})
      }
    },
    binddragend: function (e) {
      const {detail} = e
      const index = Math.ceil(detail.scrollTop / 170)
      const timeline = this.data.datasource[index]
      wx.nextTick(() => {
        this.triggerEvent('agechange', {age: timeline.age}, {})
      })
      
    }
  }
})
