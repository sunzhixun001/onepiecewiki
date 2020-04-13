// components/timeline/list/ad/ad.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose: function() {
      this.triggerEvent("close", {}, {});
    }
  }
})
