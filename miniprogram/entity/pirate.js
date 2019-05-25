// 海盗
import Biological from './biological';

export default class Pirate extends Biological{
  constructor({ name, avator, role, fullname, bounty, priateRegimentName}){
    super({ name, avator, role, fullname});
		// 悬赏金
    this.bounty = bounty;
    // 所属海贼团名字
    this.priateRegimentName = priateRegimentName;
	}
}