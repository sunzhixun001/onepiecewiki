// components/wiki-item-component/wiki-item-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    wikiid: String,
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
      const query = wx.createSelectorQuery().in(this);
      const { wikiid } = this.data;
      query.select('#wiki' + wikiid).boundingClientRect(rect => {
        const { height} = rect;
        this.triggerEvent('imageload', { height, width:0, left: this.data.left, index: this.data.index }, {});
      }).exec();
    }
  }
})
