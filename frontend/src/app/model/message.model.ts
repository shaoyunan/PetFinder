export class Message {
  _id: string;
  messagecontent: string;
  userfrom: string;
  userto: string;
  posttime: string;

  constructor (messagecontent: string, userto: string, userfrom: string) {
    this.messagecontent = messagecontent;
    this.userto = userto;
    this.userfrom = userfrom;
  }
}
