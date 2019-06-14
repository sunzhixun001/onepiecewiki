const BASE_WIDTH = 375;
const BASE_SCALE = 2;
export const convertBounty  =  ({bounty}) => {
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

export const phonePx = ({ px, width}) => {
  return px * (width / 375);
}
export const px2rpx = ({ px, screenWidth}) => {
  let rpx = (screenWidth / BASE_WIDTH) * px * BASE_SCALE;
  return rpx;
}