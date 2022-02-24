# react-timeit

### A time picker for your React app.

![](./timeit.png)

# Install

```bash
npm install --save react-timeit

# or

yarn add react-timeit
```

# Basic Usage

```tsx
import React from "react";

import Timeit from "react-timeit";

function App() {
  return <Timeit />;
}
```

# Props

### onChange

```tsx
...

function App() {
  const [time, setTime] = useState();
  return <Timeit onChange={(value) => setTime(value)} />
}
```

### defaultValue

```tsx
...

function App() {
  return <Timeit defaultValue='06:10' />
}
```

### minuteExclude | hourExclude

```tsx
...

// show just 05,10,20,30,40,50,00
function App() {
  return <Timeit minuteExclude={[
          1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22,
          23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
          58, 59
        ]} />
}

// use lodash and show just 05,10,20,30,40,50,00
function App() {
  return <Timeit minuteExclude={_.range(0, 60, 1).filter(o=> !_.range(0, 60, 10).includes(o))} />
}
```

### notShowExclude

```tsx
...

function App() {
  return <Timeit notShowExclude minuteExclude={[
          1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22,
          23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
          58, 59
        ]} />
}
```
