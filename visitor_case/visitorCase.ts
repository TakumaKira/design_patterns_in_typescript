namespace VisitorCase {
  export abstract class Equipment {
    constructor(private _name: string) {}

    name(): string { return this._name }

    abstract power(): Watt
    abstract netPrice(): Currency
    abstract discountPrice(): Currency

    abstract accept(visitor: EquipmentVisitor): void
  }

  export abstract class EquipmentVisitor {
    abstract visitFloppyDisk(equipment: FloppyDisk): void
    abstract visitCard(equipment: Card): void
    abstract visitChassis(equipment: Chassis): void
    abstract visitBus(equipment: Bus): void
  }

  export class FloppyDisk extends Equipment {
    private _netPrice: Currency = new Currency(15)
    power(): Watt {
      throw new Error("Method not implemented.")
    }
    netPrice(): Currency {
      return this._netPrice
    }
    discountPrice(): Currency {
      throw new Error("Method not implemented.")
    }
    accept(visitor: EquipmentVisitor): void {
      visitor.visitFloppyDisk(this)
    }
  }

  export class Card extends Equipment {
    power(): Watt {
      throw new Error("Method not implemented.")
    }
    netPrice(): Currency {
      throw new Error("Method not implemented.")
    }
    discountPrice(): Currency {
      throw new Error("Method not implemented.")
    }
    accept(visitor: EquipmentVisitor): void {
      visitor.visitCard(this)
    }
  }

  export class Chassis extends Equipment {
    private _discountPrice: Currency = new Currency(50)
    private _parts: Array<Equipment> = []
    power(): Watt {
      throw new Error("Method not implemented.")
    }
    netPrice(): Currency {
      throw new Error("Method not implemented.")
    }
    discountPrice(): Currency {
      return this._discountPrice
    }
    add(equipment: Equipment): void {
      this._parts.push(equipment)
    }
    accept(visitor: EquipmentVisitor): void {
      for (const i = new ListIterator<Equipment>(this._parts);
        !i.isDone();
        i.next()
      ) {
        i.currentItem().accept(visitor)
      }
      visitor.visitChassis(this)
    }
  }

  export class Bus extends Equipment {
    private _parts: Array<Equipment> = []
    power(): Watt {
      throw new Error("Method not implemented.")
    }
    netPrice(): Currency {
      throw new Error("Method not implemented.")
    }
    discountPrice(): Currency {
      throw new Error("Method not implemented.")
    }
    accept(visitor: EquipmentVisitor): void {
      for (const i = new ListIterator<Equipment>(this._parts);
        !i.isDone();
        i.next()
      ) {
        i.currentItem().accept(visitor)
      }
      visitor.visitBus(this)
    }
  }

  export class PricingVisitor extends EquipmentVisitor {
    private _total: Currency = new Currency(0)

    getTotalPrice(): Currency {
      return this._total
    }

    visitFloppyDisk(e: FloppyDisk): void {
      this._total.add(e.netPrice()) // can change pricing policy just by changing here
    }
    visitCard(e: Card): void {
      throw new Error("Method not implemented.")
    }
    visitChassis(e: Chassis): void {
      this._total.add(e.discountPrice()) // can change pricing policy just by changing here
    }
    visitBus(e: Bus): void {
      throw new Error("Method not implemented.")
    }
  }

  export class InventoryVisitor extends EquipmentVisitor {
    private _inventory: Inventory = new Inventory

    getInventory(): Inventory {
      return this._inventory
    }

    visitFloppyDisk(e: FloppyDisk): void {
      this._inventory.accumulate(e)
    }
    visitCard(e: Card): void {
      throw new Error("Method not implemented.")
    }
    visitChassis(e: Chassis): void {
      this._inventory.accumulate(e)
    }
    visitBus(e: Bus): void {
      throw new Error("Method not implemented.")
    }
  }

  export class Watt {}
  export class Currency {
    constructor(private _value: number) {}
    add(currency: Currency): void {
      this._value += currency._value
    }
  }
  export class Inventory {
    private _equipments: Array<Equipment> = []
    accumulate(equipment: Equipment): void {
      this._equipments.push(equipment)
    }
  }

  export class ListIterator<Item> {
    private _currentIndex: number = 0
    constructor(private _items: Array<Item>) {}
    next(): void {
      this._currentIndex++
    }
    currentItem(): Item {
      return this._items[this._currentIndex]
    }
    isDone(): boolean {
      return this._currentIndex >= this._items.length
    }
  }
}
