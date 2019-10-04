// 事件
export default class Event{
  constructor({ age, showAge, title, photo, tags, img, source}){
    this.age = age;
    this.showAge = showAge;
		this.photo = photo;
    this.title = title;
    this.tags = tags;
    this.img = img;
    this.source = source;
	}
}