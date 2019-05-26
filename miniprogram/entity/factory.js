import Pirate from './pirate';
import Navy from './navy';

export class CharacterFactory {
  constructor({ type}) {
    this.type = type;
  }
  create({data}) {
    switch(this.type){
      case 1: return new Pirate(data);
      case 2: return new Navy(data);
    }
  }
}