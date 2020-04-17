import { Aspect } from '../lib/aspect/aspect';

export function Logger() {
  return Aspect({
    onBefore(a, b) {
      console.log("before", a, b);
    },
    onAfter() {
      console.log("after");
    },
    pattern: /fetch/,
  }
  )
}