namespace CompositeCase {
  export abstract class Equipment {
    constructor(private _name: string) {}
    name(): string {return this._name}

    abstract power(): Watt
    netPrice(): number {
      return this.discountPrice()
    }
    abstract discountPrice(): number

    add(equipment: Equipment): void {
      throw new Error("Method not implemented.")
    }
    remove(equipment: Equipment): void {
      throw new Error("Method not implemented.")
    }
  }

  export class FloppyDisk extends Equipment {
    power(): Watt {
      throw new Error("Method not implemented.")
    }
    discountPrice(): number {
      return 10
    }
  }

  export class Card extends Equipment {
    power(): Watt {
      throw new Error("Method not implemented.")
    }
    discountPrice(): number {
      return 100
    }
  }

  export abstract class CompositeEquipment extends Equipment {
    private _equipment: Array<Equipment> = []
    abstract power(): Watt
    netPrice(): number {
      let total = this.discountPrice()
      for (let i = 0; i < this._equipment.length; i++) {
        total += this._equipment[i].netPrice()
      }
      return total
    }
    abstract discountPrice(): number
    override add(equipment: Equipment) {
      this._equipment.push(equipment)
    }
    override remove(equipment: Equipment) {
      let index = -1
      for (let i = 0; i < this._equipment.length; i++) {
        if (
          this._equipment[i].constructor['name'] === equipment.constructor['name'] &&
          this._equipment[i].name() === equipment.name()
        ) {
          index = i
          break
        }
      }
      if (index === -1) return
      this._equipment.splice(index, 1)
    }
  }

  export class Chassis extends CompositeEquipment {
    power(): Watt {
      throw new Error("Method not implemented.")
    }
    discountPrice(): number {
      return 50
    }
  }

  export class Cabinet extends CompositeEquipment {
    power(): Watt {
      throw new Error("Method not implemented.")
    }
    discountPrice(): number {
      return 25
    }
  }

  export class Bus extends CompositeEquipment {
    power(): Watt {
      throw new Error("Method not implemented.")
    }
    discountPrice(): number {
      return 100
    }
  }

  export class Watt {}
}
