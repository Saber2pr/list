/*
 * @Author: saber2pr
 * @Date: 2019-03-08 12:52:34
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-17 11:14:06
 */
export interface Component {
  type?: any
  props?: any
  children?: this[]
}

export interface IFiber<T extends Component = Component> {
  instance: T
  parent: IFiber<T>
  child: IFiber<T>
  sibling: IFiber<T>
  origin: any
}

export class Fiber<T extends Component = Component> implements IFiber<T> {
  constructor(public instance: T) {}
  public parent: Fiber<T>
  public child: Fiber<T>
  public sibling: Fiber<T>
  public origin: any
  set = <K extends keyof IFiber<T>>(key: K) => (value: this[K]) => {
    this[key] = value
    return this
  }
}

export const link = <T extends Component>(fiber: Fiber<T>) =>
  fiber.instance.children &&
  fiber.set('child')(
    fiber.instance.children.reduceRight(
      (sibling, instance) =>
        new Fiber(instance)
          .set('parent')(fiber)
          .set('sibling')(sibling),
      null as Fiber<T>
    )
  ).child

export const walk = <T extends Component>(fiber: Fiber<T>) => {
  fiber.child || link(fiber)
  let current = fiber
  if (current.child) {
    return current.child
  }
  if (current.sibling) {
    return current.sibling
  }
  if (!current.parent) {
    return current
  }
  while (!current.parent.sibling) {
    current = current.parent
    if (!current.parent) {
      return null
    }
  }
  return current.parent.sibling
}

export function walkAll<T extends Component>(
  component: T,
  cat: (component: T) => void
) {
  let current = new Fiber(component)
  while (current) {
    cat(current.instance)
    current = walk(current)
  }
}
