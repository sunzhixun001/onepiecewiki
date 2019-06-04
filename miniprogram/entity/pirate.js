// 海盗
import Biological from './biological';

export default class Pirate extends Biological{
  constructor({ name, avator, img, role, fullname, bounty, priateRegimentName, devilfruitType, devilfruitName, height, birthday, age, relationships, group, job, pinyinName, englishName, japaneseName}){
    super({ name, avator, img, role, fullname, devilfruitType, devilfruitName, height, birthday, age, relationships, group, pinyinName, englishName, japaneseName});
		// 悬赏金
    this.bounty = bounty;
    // 所属海贼团名字
    this.priateRegimentName = priateRegimentName;
    // 在海贼团中担任的职业
    this.job = job;
	}
}