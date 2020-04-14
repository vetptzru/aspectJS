function log1(target: Function) {
  for (const propertyName of Object.keys(target.prototype)) {
    console.log(propertyName);
    const descriptor = Object.getOwnPropertyDescriptor(
      target.prototype,
      propertyName
    );
    if (!descriptor) {
      console.log("not descriptor", descriptor);
      continue;
    }
    const isMethod = descriptor.value instanceof Function;
    if (!isMethod) {
      console.log("not method");
      continue;
    }

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log("The method args are: " + JSON.stringify(args));
      const result = originalMethod.apply(this, args);
      console.log("The return value is: " + result);
      return result;
    };

    Object.defineProperty(target.prototype, propertyName, descriptor);
  }
}

function Aspect<T extends { new (...constructorArgs: any[]) }>(
  constructorFunction: T
) {
  let newConstructorFunction: any = function (...args) {
    let func: any = function () {
      return new constructorFunction(...args);
    };
    func.prototype = constructorFunction.prototype;
    let result: any = new func();
    return new Proxy(result, {
      get(target, prop) {
        const property = target[prop];
        if (typeof property !== "function") {
          return property;
        }
        console.log("Call function");
        return property;
      },
    });
  };
  newConstructorFunction.prototype = constructorFunction.prototype;
  return newConstructorFunction;
}

@Aspect
class UserService {
  foo = 1;
  auth(email: string, password: string) {
    console.log(`${email}: ${password}`);
  }
}

const user = new UserService();
user.auth("foo", "bar");
