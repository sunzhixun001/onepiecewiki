import { CharacterFactory } from '../../entity/factory';
const getFetchObj = function() {
  let data = {
    name: this.data.name,
    fullname: this.data.fullname,
    avator: this.data.avator,
    img: this.data.img,
    role: this.data.role,
    bounty: this.data.bounty,
    priateRegimentName: this.data.priateRegimentName,
    devilfruitType: this.data.devilfruitType,
    devilfruitName: this.data.devilfruitName,
    levelName: this.data.levelName,
    age: this.data.age,
    height: this.data.height,
    birthday: this.data.birthday,
    relationships: this.data.relationships.map(r => {
      let _r = r;
      delete _r._id;
      return r;
    }),
    group: this.data.group,
    job: this.data.job,
    pinyinName: this.data.pinyinName,
    englishName: this.data.englishName,
    japaneseName: this.data.japaneseName,
    position: this.data.position
  };
  const factory = new CharacterFactory({ type: this.data.role });
  const biological = factory.create({ data });
  return biological;
}
export {
  getFetchObj
};