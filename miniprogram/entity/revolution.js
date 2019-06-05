// 革命军
import Biological from './biological';

export default class Revolution extends Biological {
  constructor({ name, avator, img, role, fullname, position, devilfruitType, devilfruitName, height, birthday, age, relationships, group, pinyinName, englishName, japaneseName,bounty }) {
    super({ name, avator, img, role, fullname, devilfruitType, devilfruitName, height, birthday, age, relationships, group, pinyinName, englishName, japaneseName });
    // 级别
    this.position = position;
    // 悬赏金
    this.bounty = bounty;
  }
}