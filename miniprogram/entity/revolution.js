// 革命军
import Biological from './biological';

export default class Revolution extends Biological {
  constructor({ name, avator, img, role, fullname, position, devilfruitType, devilfruitName, height, birthday, age, relationships, group }) {
    super({ name, avator, img, role, fullname, devilfruitType, devilfruitName, height, birthday, age, relationships, group });
    // 级别
    this.position = position;
  }
}