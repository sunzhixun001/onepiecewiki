import Pirate from './pirate';

export class CharacterFactory {
  constructor({ type}) {
    this.type = type;
  }
  create({data}) {
    switch(this.type){
      case 1: return new Pirate(data);
    }
  }
}