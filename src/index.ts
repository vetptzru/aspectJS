import { Logger } from './helpers/logger';

@Logger()
class UserService {
  foo = 1;
  auth(email: string, password: string) {
    console.log(`--> auth ${email}: ${password}`);
  }

  fetch() {
    console.log("--> fetch");
  }

  fetchRights() {
    console.log("--> fetchRights");
  }

  fetchNotes(a: number, b: number) {
    console.log("--> fetchNotes");
  }
}

const user = new UserService();
user.auth("foo", "bar");
user.fetchNotes(1, 2);
user.fetchRights();
