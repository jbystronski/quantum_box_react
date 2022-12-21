[![NPM](https://shields.io/npm/v/@quantum_box/react.svg?style=flat-square&color=blueviolet)](https://www.npmjs.com/package/@quantum_box/react)

 <h4>Overview</h4>
      <p>React components for data virtualization</p>
      <p>
        What's virtualization ? Only a subset of data of a bigger dataset gets
        exposed to the user. It is later discarded in favor of a new content.
        User experiences continuity through smooth scrolling and at the same
        time great load is taken off of your CPU as the browser needs to render
        only a handful of elements at a time instead of let's say hundreds or
        thousands of them. It may be an overkill for limited lists with
        relatively little amount of data to display, however, as it's gets
        bigger and bigger then virtualization effectively solves the problem.
      </p>

  <h4>Install</h4>

```bash

  npm i @quantum_box/react

  // alt

  yarn add @quantum_box/react

```

  <h4>List component</h4>

```jsx
import { List } from "@quantum_box/react";

<List
  containerHeight={600}
  itemHeight={100}
  data={data}
  nextData={() => someFunctionThatGeneratesData(100)}
  Item={({ itemData, itemKey }) => (
    <div>
      key: {itemKey}
      <span>
        user: {itemData["username"]}, email: {itemdata["email"]}
      </span>
    </div>
  )}
/>;
```

  <h4>Grid component</h4>

```jsx
import { Grid } from "@quantum_box/react";

<Grid
  containerHeight={600}
  itemHeight={200}
  itemWidth={200}
  rowItems={4}
  data={data}
  nextData={() => someFunctionThatGeneratesData(100)}
  Item={({ itemData, itemKey }) => (
    <div>
      key: {itemKey}
      <span>
        user: {itemData["username"]}, email: {itemdata["email"]}
      </span>
    </div>
  )}
/>;
```

  <h4>Tree component</h4>

```jsx
import { Tree } from "@quantum_box/react";

<Tree
  containerHeight={600}
  itemHeight={44}
  indent={20}
  data={data}
  Item={({ id, isLeaf, isOpen, toggle, nestingLevel, itemData }) => (
    <span>{id}</span>
  )}
/>;
```

<p>
  See <a href="https://quantum_box_react.surge.sh/">official docs</a> for
  examples and props description
</p>
