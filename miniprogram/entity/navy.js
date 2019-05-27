// 海军
import Biological from './biological';

export default class Navy extends Biological {
  constructor({ name, avator, img, role, fullname, levelName, devilfruitType, devilfruitName, height, birthday, age, relationships, group }) {
    super({ name, avator, img, role, fullname, devilfruitType, devilfruitName, levelName, height, birthday, age, relationships, group});
    // 级别
    this.levelName = levelName;
  }
}