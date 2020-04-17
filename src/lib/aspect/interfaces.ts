export interface IAspect<T> {
  onBefore?(...args: T[]): void;
  onAfter?(...args: T[]): void;
  pattern: string | RegExp;
}

export interface IConstructor {
  new(...constructorArgs: any[]);
}