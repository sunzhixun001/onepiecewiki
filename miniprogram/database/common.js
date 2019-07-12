class SingletonDataBase {
  constructor() {

  }
  static getInstance() {
    if(!this.instance) {
      this.instance = wx.cloud.database();
    }
    return this.instance;
  }
}
export const db = SingletonDataBase.getInstance();