import { IAspect, IConstructor } from './interfaces';

export function Wrapper<T extends IConstructor, A>(
  constructorFunction: T,
  aspect: IAspect<A>
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
        const reg = RegExp(aspect.pattern);
        if (!reg.test(String(prop))) {
          return property;
        }
        return new Proxy(property, {
          apply(target, thisArg, args) {
            aspect.onBefore?.apply(thisArg, args);
            const result = target.apply(thisArg, args);
            aspect.onAfter?.apply(thisArg, args);
            return result;
          },
        });
      },
    });
  };
  newConstructorFunction.prototype = constructorFunction.prototype;
  return newConstructorFunction;
}