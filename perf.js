const funcs = {
  "faster-median": require("./src/index"),
  "median-quickselect": require("median-quickselect"),
  "simple-statistics": require("simple-statistics").median,
};

const cases = {
  "1 hundred random numbers from 0 to 100": [],
  "1 thousand random decimal numbers from 0 to 1": [],
  "1 million random 8 bit numbers": [],
};

for (let i = 0; i < 100; i++) {
  cases["1 hundred random numbers from 0 to 100"].push(
    Math.round(Math.random() * 100)
  );
}
for (let i = 0; i < 100; i++) {
  cases["1 thousand random decimal numbers from 0 to 1"].push(
    Math.random() * 100
  );
}
for (let i = 0; i < 10_000_000; i++) {
  cases["1 million random 8 bit numbers"].push(Math.round(Math.random() * 255));
}

Object.entries(cases).forEach(([casename, nums]) => {
  Object.entries(funcs).forEach(([libname, func]) => {
    const times = [];
    for (let i = 0; i < 50; i++) {
      let start, finish, duration;
      if (libname === "faster-median") {
        start = Date.now();
        const result = func({ nums });
        finish = Date.now();
      } else {
        start = Date.now();
        const result = func(nums);
        finish = Date.now();
      }
      duration = finish - start;
      times.push(duration);
    }
    const avg = times.reduce((total, n) => total + n, 0) / 10;
    console.log(casename + ":" + libname + ":avg:", avg);
  });
});
