const obj = {
  foo(...args) {
    console.log(...args);
  },
};

function addAspect<T extends Object, B, A>(
  obj: T,
  method: string,
  before: (args: B[]) => B[],
  after: (result: A) => A
): T {
  return new Proxy(obj, {
    get: (target, prop) => {
      if (typeof target[prop] === "function" && String(prop) === method) {
        return new Proxy(target[prop], {
          apply(target, thisArg, args: B[]) {
            const _args = before(args);
            const result: A = target.apply(thisArg, _args);
            const _result = after(result);
            return _result;
          },
        });
      }
      return target[prop];
    },
  });
}

// _o.foo<typeof obj>(1, 2, 3);

const _op = addAspect<typeof obj, number, number>(
  obj,
  "foo",
  (args) => args,
  (result) => result
);

_op.foo(1, 2, 3);
