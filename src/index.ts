import { Aspect } from "./aspect";

@Aspect<{
  a: number;
  b: number;
}>({
  onBefore(a, b) {
    console.log("before", a, b);
  },
  onAfter() {
    console.log("after");
  },
  pattern: /fetchN/,
})
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
