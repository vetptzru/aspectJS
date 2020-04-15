import { Aspect } from "../aspect";

const logger: Logger = {
  log(msg) {
    console.log(`log ${msg}`);
  },
};
const audit: Audit = {
  send(msg) {
    console.log(`audit ${msg}`);
  },
};

@Aspect({
  pattern: "getById",
  onBefore() {
    logger.log(`getById`);
  },
  onAfter(id: number) {
    audit.send(`Request: /users/${id}`);
  },
})
class UserService {
  async getById(id: number) {
    const users = await apiGetAll(`/users/${id}`);
    return users;
  }
}

function apiGetAll(url: string): Promise<string> {
  return new Promise((r) => {
    r(url);
  });
}

interface Logger {
  log(msg: string): void;
}

interface Audit {
  send(msg: string): void;
}

export default UserService;
