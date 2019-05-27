// 海盗
import Biological from './biological';

export default class Pirate extends Biological{
  constructor({ name, avator, img, role, fullname, bounty, priateRegimentName, devilfruitType, devilfruitName, height, birthday, age, relationships, group}){
    super({ name, avator, img, role, fullname, devilfruitType, devilfruitName, height, birthday, age, relationships, group});
		// 悬赏金
    this.bounty = bounty;
    // 所属海贼团名字
    this.priateRegimentName = priateRegimentName;
	}
}