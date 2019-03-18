import { List } from '../core/saber-list'

// export function test_saber_list() {
//   console.log(
//     List.link(1, 2, 3, 4)
//       .reverse()
//       .toArray()
//   )
// }

import { Component, Fiber, walk, walkAll } from '../core/fiber'

interface MyComponent extends Component {
  value: number
}

const second_3: MyComponent = {
  value: 30
}

const second_2: MyComponent = {
  value: 25
}

const first: MyComponent = {
  value: 10,
  children: [second_2, second_3]
}

const second: MyComponent = {
  value: 20
}

const first_2: MyComponent = {
  value: 11
}

const Root: MyComponent = {
  value: 0,
  children: [first, first_2]
}

// walk(new Fiber(Root), fiber => console.log(fiber.instance.value))
walkAll(Root, component => console.log(component.value))
