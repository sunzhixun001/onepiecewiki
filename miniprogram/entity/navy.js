// 海军
import Biological from './biological';

export default class Navy extends Biological {
  constructor({ name, avator, img, role, fullname, levelName, devilfruitType, devilfruitName }) {
    super({ name, avator, img, role, fullname, devilfruitType, devilfruitName, levelName});
    // 级别
    this.levelName = levelName;
  }
}