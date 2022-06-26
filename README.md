# faster-median
🔥 A Quick Way to get the Median Value of an Array of Numbers (Typed or Untyped)

# install
```bash
npm install faster-median
```

## usage
```js
const fasterMedian = require("faster-median");

const nums = [0, 56, 123, 63, 763, ...];
fasterMedian({ nums, no_data: 0 })
128.1231236542

// calculate median with infinite precision using preciso
fasterMedian({ nums, no_data: 0, precise: true })
"128.1231236542451283153614234128736127354564"
```