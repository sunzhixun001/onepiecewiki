import { getOpenId as getOpenIdFromCloud} from '../cloud/userCloud';
import { setStorage, getStorage } from './storage';

// 从云函数获取openid
const fetchOpenIdCloud = ({ successCallback}) => {
  getOpenIdFromCloud({
    success: result => {
      const { openid } = result;
      setStorage({ key: 'openid', data: openid });
      successCallback(openid);
    },
    fail: err => {

    }
  });
};
// 从缓存获取openid
const getOpenIdStorage = ({ success, fail}) => {
  getStorage({
    key: 'openid',
    successCallback: value => {
      success && success(value);
    },
    failCallback: err => {
      fail && fail();
    }
  });
};
// 从缓存获取userid
const getUserIdStorage = ({ success, fail}) => {
  getStorage({
    key: 'userid',
    successCallback: value => {
      success && success(value);
    },
    failCallback: err => {
      fail && fail();
    }
  });
};
export const getOpenId = ({gotCallback}) => {
  getOpenIdStorage({ 
    success: value => {
      gotCallback && gotCallback(value);
    },
    fail: () => {
      fetchOpenIdCloud({
        successCallback: value => {
          gotCallback && gotCallback(value);
        }
      });
    }
  });
};
export const getUserId = ({ gotCallback }) => {
  getUserIdStorage({ success: value => {
    gotCallback(value);
  }});
}