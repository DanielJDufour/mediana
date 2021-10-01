const countWithTotal = ({ nums, no_data }) => {
  let len = nums.length;
  const counts = {};
  let total = 0;
  if (no_data !== undefined) {
    for (let i = 0; i < len; i++) {
      const n = nums[i];
      if (n !== no_data) {
        total++;
        if (n in counts) counts[n].ct++;
        else counts[n] = { n, ct: 1 };
      }
    }
  } else {
    for (let i = 0; i < len; i++) {
      const n = nums[i];
      total++;
      if (n in counts) counts[n].ct++;
      else counts[n] = { n, ct: 1 };
    }
  }
  return { counts, total };
};

const median_of_a_few = ({ nums, no_data }) => {
  nums = nums.filter(n => n !== no_data).sort((a, b) => a - b);
  switch (nums.length) {
    case 0:
      return undefined;
    case 1:
      return nums[0];
    default:
      const mid = nums.length / 2;
      if (nums.length % 2 === 0) {
        return (nums[mid - 1] + nums[mid]) / 2;
      } else {
        return nums[Math.floor(mid)];
      }
  }
};

const median_of_a_lot = ({ counts, nums, no_data, total }) => {
  if (counts === undefined || total === undefined) {
    ({ counts, total } = countWithTotal({ nums, no_data }));
  }

  // sort counts by value
  const countArray = Object.values(counts).sort((a, b) => a.n - b.n);
  const half = total / 2;
  const number_of_unique_values = countArray.length;
  if (number_of_unique_values === 0) {
    return undefined;
  } else if (number_of_unique_values === 1) {
    return countArray[0].n;
  } else {
    let x = 0;

    if (total % 2 === 0) {
      for (let i = 0; i < number_of_unique_values; i++) {
        const { n, ct } = countArray[i];
        x += ct;
        if (x > half) {
          // handle if odd or even
          // just barely pass cut off
          if (x - ct === half) {
            return (countArray[i - 1].n + n) / 2;
          } else {
            return n;
          }
        }
      }
    } else {
      for (let i = 0; i < number_of_unique_values; i++) {
        const { n, ct } = countArray[i];
        x += ct;
        if (x > half) return n;
      }
    }
  }
};

const fasterMedian = ({ nums, no_data, threshold = 50, counts, total }) => {
  if (counts !== undefined || total !== undefined || nums.length > threshold)
    return median_of_a_lot({ counts, total, nums, no_data });
  else return median_of_a_few({ nums, no_data });
};

if (typeof module === "object") module.exports = fasterMedian;
if (typeof window === "object") window.fasterMedian = fasterMedian;
if (typeof self === "object") self.fasterMedian = fasterMedian;
