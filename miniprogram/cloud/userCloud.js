const getOpenId = ({ success, fail}) => {
  wx.cloud.callFunction({
    name: 'login',
    data: {}
  })
    .then(res => {
      const { errMsg, requestID, result } = res;
      if (errMsg === "cloud.callFunction:ok"){
        success && success(result);
      }else{
        fail && fail(errMsg);
      }
      
    })
    .catch(err => {

    })
}
export {
  getOpenId
};