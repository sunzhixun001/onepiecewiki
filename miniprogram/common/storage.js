import regeneratorRuntime from '../common/regeneratorRuntime';

export const setStorage = async (key, data) => {
  const result = await wx.setStorage({
    key, data
  });
  return Promise.resolve(result);
}
export const getStorage = async key => {
  return await new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: function(res) {
        const { data, errMsg } = res;
        if (errMsg === 'getStorage:ok') {
          resolve(res.data);
        } else {
          resolve('');
        }
      },
      fail: function (error) {
        console.log('wx.getStorage error', error);
        resolve('');
      }
    })
  });
};
export const removeStorage = ({ key}) => {
  wx.removeStorage({
    key,
    success: function(res) {}
  })
};