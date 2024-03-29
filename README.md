# mediana
Calculate the Median Value of an Array of Numbers (Typed or Untyped)

# why "mediana"?
Mediana is Spanish for median.

## install
```bash
npm install mediana
```

### usage
```js
const mediana = require("mediana");

const nums = [0, 56, 123, 63, 763, ...];
mediana.calculate(nums);
123.4567

// ignore zeros
mediana.calculate(nums, { no_data: 0 });
876.5432

// ignore multiple numbers
mediana.calculate(nums, { no_data: [-99, 0] });
987.6543

// calculate median with infinite precision using preciso
mediana.calculate(nums, { precise: true })
"128.1231236542451283153614234128736127354564"
```

### script usage
If you want to use this on a web page, you can also install using a script tag
### in a web page
```html
<script src="https://unpkg.com/mediana"></script>

<script>
  mediana.calculate(nums);
</script>
```
