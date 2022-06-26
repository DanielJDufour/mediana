const median_of_a_lot = require("./median-of-a-lot.js");
const median_of_a_few = require("./median-of-a-few.js");

function fasterMedian({
  counts,
  nums,
  no_data,
  precise,
  threshold = 50,
  total,
}) {
  if (counts !== undefined || total !== undefined || nums.length > threshold) {
    return median_of_a_lot({ counts, no_data, nums, precise, total });
  } else {
    return median_of_a_few({ no_data, nums, precise });
  }
}

if (typeof define === "function" && define.amd) {
  define(function () {
    return fasterMedian;
  });
}

if (typeof module === "object") {
  module.exports = fasterMedian;
  module.exports.default = fasterMedian;
  module.exports.fasterMedian = fasterMedian;
}

if (typeof window === "object") {
  window.fasterMedian = fasterMedian;
}

if (typeof self === "object") {
  self.fasterMedian = fasterMedian;
}
