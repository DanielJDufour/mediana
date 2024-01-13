function count(nums) {
  const counts = {};
  let total = 0;
  for (let n of nums) {
    total++;
    if (n in counts) counts[n][1]++;
    else counts[n] = [n, 1];
  }
  return { counts, total };
}

module.exports = count;
module.exports.default = count;
