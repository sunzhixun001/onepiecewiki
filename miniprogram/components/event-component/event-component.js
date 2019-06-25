// components/event-component/event-component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showAge: String,
    title: String,
    photo: String,
    img: String
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
    itemTap: function(e) {
      const { img} = e.currentTarget.dataset;
      if (img){
        wx.previewImage({
          urls: [img]
        })
      }
    }
  }
})
