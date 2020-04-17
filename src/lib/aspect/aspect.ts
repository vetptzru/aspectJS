import { IAspect, IConstructor } from './interfaces';
import { Wrapper } from './wrapper'

export function Aspect<T>(aspect: IAspect<T>) {
  return <C extends IConstructor>(constructor: C) =>
    Wrapper(constructor, aspect);
}
