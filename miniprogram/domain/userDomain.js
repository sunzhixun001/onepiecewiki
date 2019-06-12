import {
  getWithOpenId,
  create
} from '../database/userRepository';
const fetchUserWithOpenId = ({ openid, success, fail}) => {
  const promise = getWithOpenId({ openid});
  promise
    .then(res => {
      success && success(res);
    })
    .catch(err => {
      fail && fail(err);
    });
};
const createUser = ({user, success}) => {
  const promise = create({ user});
  promise
    .then(res => {
      success && success(res);
    })
};
export { fetchUserWithOpenId, createUser};