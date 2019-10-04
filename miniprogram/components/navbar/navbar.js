import { backgroundColor, navigationColor } from '../../config/theme';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    back: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    background: backgroundColor,
    color: navigationColor,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
