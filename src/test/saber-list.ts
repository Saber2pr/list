import { List } from '../core/saber-list'

export function test_saber_list() {
  console.log(
    List.link(1, 2, 3, 4)
      .reverse()
      .toArray()
  )
}
