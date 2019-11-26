// components/timeline/list/chapters/timeline-chapters.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datasource: Array
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
    tap: function (e) {
      const { name} = e.currentTarget.dataset;
      console.log(name);
      this.triggerEvent("itemtap", { name}, {});
    }
  }
})
