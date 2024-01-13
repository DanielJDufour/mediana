export function calculate<P>(
  nums: number[] | Iterable<number>,
  options?: {
    no_data?: number | number[] | undefined | null;
    precise?: P & boolean;
  }
): P extends true ? string : number;