// components/wiki-item-component/wiki-item-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: String,
    img: String,
    title: String,
    url: String,
    left: Boolean,
    index: Number
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
    onImageLoad: function(e) {
      const { height, width} = e.detail;
      this.triggerEvent('imageload', { height, width, left: this.data.left, index: this.data.index}, {});
    }
  }
})
