/*
 * @Author: saber2pr
 * @Date: 2019-03-17 20:55:19
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-03-17 21:48:51
 */
export class List<T = any> {
  constructor(public instance: T) {}
  public next: List<T>
  get foot(): List<T> {
    let current: List<T> = this
    while (current.next) {
      current = current.next
    }
    return current
  }
  public set<K extends keyof this>(key: K) {
    return (value: this[K]) => {
      this[key] = value
      return this
    }
  }
  static link<T>(...instances: T[]) {
    return instances.reduceRight(
      (next, instance) => new List(instance).set('next')(next),
      null as List
    )
  }
  toArray(): T[] {
    const result: T[] = []
    this.forEach(value => result.push(value))
    return result
  }
  forEach(
    callbackfn: (value: T, index: number, list: List<T>) => void,
    thisArg?: any
  ): void {
    let current: List = this
    let index = 0
    while (current) {
      callbackfn.call(thisArg, current.instance, index, this)
      current = current.next
      index++
    }
  }
  reverse(): List<T> {
    const result = new List(null)
    result.next = this
    let pre: List = result.next
    let current: List = pre.next
    while (current) {
      pre.next = current.next
      current.next = result.next
      result.next = current
      current = pre.next
    }
    return result.next
  }
}
