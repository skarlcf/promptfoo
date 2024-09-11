import { getDb } from '@promptfoo/database';
import { v4 as uuidv4 } from 'uuid';

export default class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async findById(id: string) {
    return new User(id, 'name', 'email', 'password');
  }

  create(email: string, password: string) {
    return new User(uuidv4(), 'name', email, password);
  }
}
