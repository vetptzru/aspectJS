// class UserService {
//   async getById(id: number, logger: Logger, audit: Audit) {
//     logger.log("getById");
//     const users = await apiGetAll(`/users/${id}`);
//     audit.send(`Request: /users/${id}`);
//     return users;
//   }
// }

// interface Logger {
//   log(msg: string): void;
// }

// interface Audit {
//   send(msg: string): void;
// }

// function apiGetAll(url: string): Promise<string> {
//   return new Promise((r) => {
//     r(url);
//   });
// }
