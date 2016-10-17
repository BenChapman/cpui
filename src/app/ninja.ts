export class Ninja {
  public id: number;
  public name: string;
  public dateOfBirth: string;
  public email: string;
  public gender: string;

  constructor() {}

  completed() {
    return this.name && this.dateOfBirth && this.email && this.gender;
  }
}
