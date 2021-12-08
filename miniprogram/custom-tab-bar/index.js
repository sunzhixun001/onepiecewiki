// custom-tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        "pagePath": "pages/user/user",
        "text": "篇章",
        "iconPath": "/images/timeline.png",
        "selectedIconPath": "/images/timeline_selected.png"
      },
      {
        "pagePath": "/pages/timeLine/timeLine",
        "text": "时间线",
        "iconPath": "/images/timeline.png",
        "selectedIconPath": "/images/timeline_selected.png"
      },
      {
        "pagePath": "/pages/characters/characters",
        "text": "人物",
        "iconPath": "/images/character.png",
        "selectedIconPath": "/images/character_selected.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
