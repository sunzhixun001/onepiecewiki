import Pirate from './pirate';
import Navy from './navy';
import Revolution from './revolution';
import Biological from './biological';
export class CharacterFactory {
  constructor({ type}) {
    this.type = type;
  }
  create({data}) {
    switch(this.type){
      case 0: return new Biological(data); break;
      case 1: return new Pirate(data); break;
      case 2: return new Navy(data); break;
      case 3: return new Revolution(data); break;
    }
  }
}