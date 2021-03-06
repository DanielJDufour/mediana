import test from "flug";
import { calculate } from "./src/index";

test("none", ({ eq }) => {
  const result = calculate({ nums: [] });
  eq(result, undefined);
});

test("no data for input", ({ eq }) => {
  const result = calculate({ nums: [99], no_data: 99 });
  eq(result, undefined);
});

test("simple", ({ eq }) => {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result1 = calculate({ nums, no_data: 99 });
  eq(result1, 4.5);

  const fibonacci = [0, 1, 1, 2, 3, 5, 8];
  const result2 = calculate({ nums: fibonacci, no_data: 99 });
  eq(result2, 2);
});

test("median of one", ({ eq }) => {
  eq(calculate({ nums: [99], threshold: 0 }), 99);
  eq(calculate({ nums: [99], precise: true }), "99");
});

test("super large amount of data", ({ eq }) => {
  const nums: number[] = [];
  for (let i = 0; i < 1_000_000; i++) {
    nums.push(Math.round(Math.random() * 255));
  }
  const result = calculate({ nums });
  eq(Math.abs(result - 127.5) < 1, true);
});

test("performance comparison", ({ eq }) => {
  const nums: number[] = [];
  for (let i = 0; i < 1_000_000; i++) {
    nums.push(Math.round(Math.random() * 255));
  }
  console.time("large");
  calculate({ nums });
  console.timeEnd("large");

  console.time("large precise=true");
  calculate({ nums, precise: true });
  console.timeEnd("large precise=true");

  console.time("old");
  const sorted = nums.sort();
  const mid = sorted.length / 2;
  (sorted[mid - 1] + sorted[mid]) / 2;
  console.timeEnd("old");
});

test("threshold", ({ eq }) => {
  // prettier-ignore
  const nums = [ 81, 86, 103, 111, 111, 110, 111, 111, 110, 113, 139, 98, 99, 108, 111, 112, 115, 115, 115, 112, 109, 138, 109, 107, 108, 110, 115, 117, 118, 114, 110, 119, 136, 110, 108, 110, 115, 118, 121, 119, 115, 111, 122, 138, 113, 111, 113, 118, 122, 122, 119, 113, 116, 132, 139, 118, 117, 117, 120, 123, 123, 118, 114, 121, 134, 139, 119, 121, 121, 123, 124, 124, 117, 109, 126, 140, 143, 116, 118, 120, 123, 125, 122, 114, 118, 133, 139, 148, 112, 113, 115, 120, 123, 124, 117, 122, 136, 143, 154, 113, 113, 113, 114, 117, 117, 117, 128, 138, 142, 164, 113, 113, 113, 112, 113, 112, 114, 124, 137, 148, 173 ];

  // slower way
  const slowResult = calculate({
    nums,
    threshold: nums.length + 10,
  });

  // faster way
  const fastResult = calculate({ nums, threshold: 1 });

  eq(slowResult, fastResult);
});

test("hist", ({ eq }) => {
  const counts = {};
  let total = 0;
  for (let i = 0; i < 100; i++) {
    total += i;
    counts[i] = { n: i, ct: i };
  }
  const result = calculate({ counts, total });
  eq(result, 70);
});

test("precise", ({ eq }) => {
  const nums: number[] = [];
  for (let i = 0; i < 1_000_000; i++) {
    nums.push(Math.round(Math.random() * 255));
  }
  const result = calculate({ nums, precise: true });
  eq(typeof result, "string");
  eq(Math.abs(Number(result) - 127.5) < 1, true);
});
