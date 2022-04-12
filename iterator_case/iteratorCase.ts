namespace IteratorCase {
  const DEFAULT_LIST_CAPACITY = 100

  export abstract class AbstractList<Item> {
    private _list: Array<Item> = []
    constructor(private _size: number = DEFAULT_LIST_CAPACITY) {}

    abstract createIterator(): Iterator<Item>

    count(): number {
      return this._list.length
    }
    get(index: number): Item {
      return this._list[index]
    }

    append(item: Item): void {
      this._list.push(item)
    }
  }

  export class List<Item> extends AbstractList<Item> {
    createIterator(): Iterator<Item> {
      return new ListIterator<Item>(this)
    }
  }

  export abstract class Iterator<Item> {
    abstract first(): void
    abstract next(): void
    abstract isDone(): boolean
    abstract currentItem(): Item
  }

  export class ListIterator<Item> extends Iterator<Item> {
    private _current: number = 0
    constructor(private _list: List<Item>) {
      super()
    }
    first(): void {
      this._current = 0
    }
    next(): void {
      this._current++
    }
    isDone(): boolean {
      return this._current >= this._list.count()
    }
    currentItem(): Item {
      if (this.isDone()) {
        throw new IteratorOutOfBounds
      }
      return this._list.get(this._current)
    }
  }

  export class ReverseListIterator<Item> extends Iterator<Item> {
    private _current: number = 0
    constructor(private _list: List<Item>) {
      super()
    }
    first(): void {
      this._current = this._list.count() - 1
    }
    next(): void {
      this._current--
    }
    isDone(): boolean {
      return this._current < 0
    }
    currentItem(): Item {
      if (this.isDone()) {
        throw new IteratorOutOfBounds
      }
      return this._list.get(this._current)
    }
  }

  export class SkipList<Item> extends AbstractList<Item> {
    createIterator(): Iterator<Item> {
      return new SkipListIterator<Item>(this)
    }
  }

  export class SkipListIterator<Item> extends Iterator<Item> {
    private _current: number = 0
    constructor(private _list: SkipList<Item>) {
      super()
    }
    first(): void {
      this._current = 0
    }
    next(): void {
      this._current += 2
    }
    isDone(): boolean {
      return this._current >= this._list.count()
    }
    currentItem(): Item {
      if (this.isDone()) {
        throw new IteratorOutOfBounds
      }
      return this._list.get(this._current)
    }
  }

  export function printEmployees(i: Iterator<Employee>): void {
    for (i.first(); !i.isDone(); i.next()) {
      i.currentItem().print()
    }
  }


  // Internal List Iterator
  export abstract class ListTraverser<Item> {
    private _iterator: ListIterator<Item>
    constructor(aList: List<Item>) {
      this._iterator = new ListIterator<Item>(aList)
    }
    traverse(): boolean {
      let result = false

      for (
        this._iterator.first();
        !this._iterator.isDone();
        this._iterator.next()
      ) {
        result = this.processItem(this._iterator.currentItem())

        if (!result) {
          break
        }
      }
      return result
    }
    protected processItem(item: Item): boolean {
      throw new Error("Method not implemented.")
    }
  }

  export class PrintNEmployee extends ListTraverser<Employee> {
    private _total: number
    private _count: number
    constructor(aList: List<Employee>, n: number) {
      super(aList)
      this._total = n
      this._count = 0
    }
    protected override processItem(e: Employee): boolean {
      this._count++
      e.print()
      return this._count < this._total
    }
  }

  export abstract class FilteringListTraverser<Item> {
    private _iterator: ListIterator<Item>
    constructor(aList: List<Item>) {
      this._iterator = new ListIterator<Item>(aList)
    }
    traverse(): boolean {
      let result = false

      for (
        this._iterator.first();
        !this._iterator.isDone();
        this._iterator.next()
      ) {
        if (this.testItem(this._iterator.currentItem())) {
          result = this.processItem(this._iterator.currentItem())

          if (!result) {
            break
          }
        }
      }
      return result
    }
    protected processItem(item: Item): boolean {
      throw new Error("Method not implemented.")
    }
    protected testItem(item: Item): boolean {
      throw new Error("Method not implemented.")
    }
  }

  export class FilteringPrintNEmployee extends FilteringListTraverser<Employee> {
    private _total: number
    private _count: number
    private _query: string
    constructor(aList: List<Employee>, n: number, query: string) {
      super(aList)
      this._total = n
      this._count = 0
      this._query = query
    }
    protected override processItem(e: Employee): boolean {
      this._count++
      e.print()
      return this._count < this._total
    }
    protected override testItem(e: Employee): boolean {
      return e.name.indexOf(this._query) !== -1
    }
  }


  export class Employee {
    constructor(private _name: string) {}
    print(): void {
      console.log('Employee', this._name)
    }
    get name(): string { return this._name }
  }

  export class IteratorOutOfBounds extends Error {
    constructor() {
      super('Iterator out of bounds')
    }
  }
}
