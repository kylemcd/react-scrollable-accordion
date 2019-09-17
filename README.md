# react-scrollable-accordion

A basic list, that allows you to define sticky headers like this:

![React Scrollable Accordion](https://media.giphy.com/media/cNNwh9yFDzhZhceNEY/giphy.gif)

Basic list:

```jsx
import { List, ListHeader, ListItem } from "../src";

<List>
  <ListHeader key={0}>Header 1</ListHeader>
  <ListItem key={1}>Item 1</ListItem>
  <ListItem key={2}>Item 2</ListItem>
  <ListHeader key={3}>Header 2</ListHeader>
  <ListItem key={4}>Item 3</ListItem>
  <ListItem key={5}>Item 4</ListItem>
</List>;
```

Repeats a default _HTML_ unordered list behavior.

Accordion:

```jsx
import { List, ListHeader, ListItem } from "../src";

<List stickyHeaders>
  <ListHeader key={0}>Header 1</ListHeader>
  <ListItem key={1}>Item 1</ListItem>
  <ListItem key={2}>Item 2</ListItem>
  <ListHeader key={3}>Header 2</ListHeader>
  <ListItem key={4}>Item 3</ListItem>
  <ListItem key={5}>Item 4</ListItem>
</List>;
```

You can customize it with _className_ and also pass any properties to the _List_ elements.
