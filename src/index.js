const count = require("./count");
const mean = require("./mean");

function calculate(nums, { no_data = undefined, precise = false } = { no_data: undefined, precise: false }) {
  const { counts, total } = count(nums);

  let total_valid = total;

  if ("NaN" in counts) {
    total_valid -= counts["NaN"][1];
    delete counts["NaN"];
  }

  if ("undefined" in counts) {
    total_valid -= counts["undefined"][1];
    delete counts["undefined"];
  }

  if ("null" in counts) {
    total_valid -= counts["null"][1];
    delete counts["null"];
  }

  if ("" in counts) {
    total_valid -= counts[""][1];
    delete counts[""];
  }

  // delete no data value(s), so they'll be ignored later
  if (Array.isArray(no_data)) {
    for (let i = 0; i < no_data.length; i++) {
      const n = no_data[i];
      if (n in counts) {
        total_valid -= counts[n][1];
        delete counts[n];
      }
    }
  } else if (no_data in counts) {
    total_valid -= counts[no_data][1];
    delete counts[no_data];
  }

  // sort counts by value
  const countArray = Object.values(counts).sort((a, b) => a[0] - b[0]);
  const half = total_valid / 2;
  const number_of_unique_values = countArray.length;
  if (number_of_unique_values === 0) {
    return undefined;
  } else if (number_of_unique_values === 1) {
    return precise ? countArray[0][0].toString() : countArray[0][0];
  } else {
    let x = 0;

    if (total % 2 === 0) {
      for (let i = 0; i < number_of_unique_values; i++) {
        const [n, ct] = countArray[i];
        x += ct;
        if (x > half) {
          // handle if odd or even
          // just barely pass cut off
          if (x - ct === half) {
            return mean(countArray[i - 1][0], n, { precise });
          } else {
            return precise ? n.toString() : n;
          }
        }
      }
    } else {
      for (let i = 0; i < number_of_unique_values; i++) {
        const [n, ct] = countArray[i];
        x += ct;
        if (x > half) return precise ? n.toString() : n;
      }
    }
  }
}

const mediana = { calculate };

if (typeof define === "function" && define.amd) {
  define(function () {
    return mediana;
  });
}

if (typeof module === "object") {
  module.exports = mediana;
  module.exports.default = { calculate };
}

if (typeof window === "object") {
  window.mediana = mediana;
}

if (typeof self === "object") {
  self.mediana = mediana;
}
