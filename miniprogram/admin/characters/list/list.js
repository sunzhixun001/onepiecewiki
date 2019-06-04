import { fetchList } from '../../../domain/characterDomain';
Page({

  /**
   * 页面的初始数据
   */
  data: {
		characters: [],
		windowWidth: 0,
		avatarWidth: 0,
    pageIndex: 0,
    pageSize: 20,
    all: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCharacters();
		this.getSystemInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(!this.data.all) {
      this.getCharacters();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
	onItemClick(e) {
		const { id } = e.currentTarget.dataset;
		wx.navigateTo({
			url: `../edit/edit?id=${id}`,
		})
	},
  getCharacters() {
    fetchList({
      limit: this.data.pageSize,
      skip: this.data.pageSize * this.data.pageIndex,
      success: data => {
        this.setData({
          pageIndex: this.data.pageIndex + 1,
          characters: this.data.characters.concat(data)
        });
        if (data.length < this.data.pageSize){
          this.setData({all: true});
        }
      }
    });
  },
	getSystemInfo() {
		wx.getSystemInfo({
			success: res => {
				console.log(res);
				const { windowWidth} = res;
				this.setData({
					avatarWidth: windowWidth / 4
				});
			}
		})
	}
})