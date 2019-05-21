export const getDatabase = () => {
  const db = wx.cloud.database();
  return db;
}