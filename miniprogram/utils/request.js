class SingletonDataBase {
  constructor() {

  }
  static getInstance() {
    if(!this.instance) {
      this.instance = wx.cloud.database()
    }
    return this.instance
  }
}
export const database = SingletonDataBase.getInstance()

export const request = async (query) => {
  const result = await query.get()
  const {data, errMsg} = result
  if (errMsg === 'collection.get:ok')
    return data
  else 
    throw new Error(errMsg)
}
