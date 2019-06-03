import {
  getListInPriateReg,
  getListHasDevilfruit,
  getListOrderByBountyDesc
} from '../database/people';
const convertBounty = ({ bounty }) => {
  let result = "";
  if (bounty < 10000) {
    result = `${bounty}贝利`;
  } else if (10000 <= bounty && bounty < 100000000) {
    result = `${bounty / 10000}万贝利`;
  } else {
    const billion = parseInt(bounty / 100000000);
    let tenthousand = 0;
    const remainder = bounty % 100000000;
    if (remainder > 0) {
      tenthousand = remainder / 10000;
    }
    result = `${billion > 0 ? billion + '亿' : ''}${tenthousand > 0 ? tenthousand + '万' : ''}贝利`;
  }
  return result;
}
export const fetchStrawCharactersList = ({ success, faild}) => {
  const promise = getListInPriateReg({ priateRegimentName: '草帽海贼团' });
  promise
    .then(res => {
      const data = res.data.map(c => {
        return {
          id: c._id,
          avator: c.avator,
          fullname: c.fullname,
          job: c.job
        };
      });
      success && success(data);
    })
    .catch();
};
export const fetchListHasDevilfruit = ({ limit = 20, skip = 0, success }) => {
  const promise = getListHasDevilfruit({ limit, skip });
  promise
    .then(res => {
      const data = res.data.map(c => {
        return {
          id: c._id,
          avator: c.avator,
          fullname: c.fullname,
          devilfruit: c.devilfruitType + ' ' + c.devilfruitName
        };
      });
      success && success(data);
    })
    .catch();
};
export const fetchListOrderByBountyDesc = ({ limit = 20, skip = 0, success}) => {
  const promise = getListOrderByBountyDesc({ limit, skip });
  promise
    .then(res => {
      const data = res.data.map(c => {
        return {
          id: c._id,
          avator: c.avator,
          fullname: c.fullname,
          bounty: convertBounty({bounty: c.bounty})
        };
      });
      success && success(data);
    })
    .catch();
}