// 海军
import Biological from './biological';

export default class Navy extends Biological {
  constructor({ name, avator, role, fullname, level, devilfruitType, devilfruitName }) {
    super({ name, avator, role, fullname, devilfruitType, devilfruitName });
    // 级别
    this.level = level;
  }
}