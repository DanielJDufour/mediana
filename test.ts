import test from "flug";
import { calculate } from "./src/index";

test("none", ({ eq }) => {
  const result = calculate([]);
  eq(result, undefined);
});

test("no data for input", ({ eq }) => {
  const result = calculate([99],{ no_data: 99 });
  eq(result, undefined);
});

test("simple", ({ eq }) => {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result1 = calculate(nums, { no_data: 99 });
  eq(result1, 4.5);

  const fibonacci = [0, 1, 1, 2, 3, 5, 8];
  const result2 = calculate(fibonacci, { no_data: 99 });
  eq(result2, 2);
});

test("median of one", ({ eq }) => {
  eq(calculate([99]), 99);
  eq(calculate([99], { precise: true }), "99");
});

test("super large amount of data", ({ eq }) => {
  const nums: number[] = [];
  for (let i = 0; i < 1_000_000; i++) {
    nums.push(Math.round(Math.random() * 255));
  }
  const result = calculate(nums);
  eq(Math.abs(result - 127.5) < 1, true);
});

test("performance comparison", ({ eq }) => {
  const nums: number[] = [];
  for (let i = 0; i < 1_000_000; i++) {
    nums.push(Math.round(Math.random() * 255));
  }
  console.time("large");
  calculate(nums);
  console.timeEnd("large");

  console.time("large precise=true");
  calculate(nums, { precise: true });
  console.timeEnd("large precise=true");

  console.time("old");
  const sorted = nums.sort();
  const mid = sorted.length / 2;
  (sorted[mid - 1] + sorted[mid]) / 2;
  console.timeEnd("old");
});

test("precise", ({ eq }) => {
  const nums: number[] = [];
  for (let i = 0; i < 1_000_000; i++) {
    nums.push(Math.round(Math.random() * 255));
  }
  const result = calculate(nums, { precise: true });
  eq(typeof result, "string");
  eq(Math.abs(Number(result) - 127.5) < 1, true);
});

test("iter", ({ eq }) => {
  const nums: number[] = [];
  for (let i = 0; i < 1_000_000; i++) {
    nums.push(Math.round(Math.random() * 255));
  }
  const result = calculate(nums[Symbol.iterator](), { precise: true });
  eq(typeof result, "string");
  eq(Math.abs(Number(result) - 127.5) < 1, true);
});

test("invalid values", ({ eq }) => {
  const nums: number[] = [];
  for (let i = 0; i < 1_000_000; i++) {
    // @ts-ignore
    nums.push(null);
    // @ts-ignore
    nums.push(undefined);
    // @ts-ignore
    nums.push("");
    // @ts-ignore
    nums.push(1/'a'); // NaN
    nums.push(Math.round(Math.random() * 255));
  }
  const result = calculate(nums, { precise: true });
  eq(typeof result, "string");
  eq(Math.abs(Number(result) - 127.5) < 1, true);
});