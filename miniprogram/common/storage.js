export const setStorage = ({ key, data}) => {
  wx.setStorage({
    key, data
  });
}
export const getStorage = ({ key, successCallback, failCallback}) => {
  wx.getStorage({
    key,
    success(res) {
      const { data, errMsg} = res;
      if (errMsg === "getStorage:ok"){
        successCallback && successCallback(data);
      }
    },
    fail(err) {
      failCallback && failCallback(err);
    } 
  })
};