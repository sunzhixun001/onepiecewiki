class SingletonDataBase {
  constructor() {

  }
  static getInstance() {
    if(!this.instance) {
      console.log("getDatabase");
      this.instance = wx.cloud.database();
    }
    return this.instance;
  }
}
export const db = SingletonDataBase.getInstance();