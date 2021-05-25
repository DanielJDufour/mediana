const test = require("flug");
const fasterMedian = require("./faster-median");

test("none", ({ eq }) => {
  const result = fasterMedian({ nums: [] });
  eq(result, undefined);
});

test("no data for input", ({ eq }) => {
  const result = fasterMedian({ nums: [99], no_data: 99 });
  eq(result, undefined);
});

test("super large amount of data", ({ eq }) => {
  const nums = [];
  for (let i = 0; i < 1_000_000; i++) {
    nums.push(Math.round(Math.random() * 255));
  }
  const result = fasterMedian({ nums });
  eq(Math.abs(result - 127.5) < 1, true);
});

test("performance comparison", ({ eq }) => {
  const nums = [];
  for (let i = 0; i < 1_000_000; i++) {
    nums.push(Math.round(Math.random() * 255));
  }
  console.time("large");
  fasterMedian({ nums });
  console.timeEnd("large");

  console.time("old");
  const sorted = nums.sort();
  const mid = sorted.length / 2;
  (sorted[mid - 1] + sorted[mid]) / 2;
  console.timeEnd("old");
});