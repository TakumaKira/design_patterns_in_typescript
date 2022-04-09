namespace FlyweightCase {
  export abstract class Glyph {
    draw(window: Window, context: GlyphContext): void {
      console.log('draw on Glyph with...', window, context)
    }

    setFont(font: Font, context: GlyphContext): void {
      context.setFont(font)
    }
    getFont(context: GlyphContext): Font {
      return context.getFont()
    }

    first(context: GlyphContext): void {
      context.first()
    }
    next(context: GlyphContext): void {
      context.next()
    }
    isDone(context: GlyphContext): boolean {
      return context.isDone()
    }
    current(context: GlyphContext): Glyph {
      return this
    }

    insert(glyph: Glyph, context: GlyphContext): void {
      context.insert()
    }
    remove(context: GlyphContext): void {
      context.remove()
    }
  }

  export class Character extends Glyph {
    private _charcode: number
    constructor(char: string) {
      super()
      this._charcode = char.charCodeAt(0)
    }
    override draw(window: Window, context: GlyphContext): void {
      console.log(context.index, String.fromCharCode(this._charcode), context.getFont())
    }
  }

  export class GlyphContext {
    private _index: number = 0
    private _fonts: BTree<Font> = new BTree()

    get index(): number { return this._index }

    first(): void {
      this._index = 0
    }
    next(step: number = 1): void {
      this._index += step
    }
    isDone(): boolean {
      return this._index > this._fonts.lastIndex
    }

    getFont(): Font {
      return this._fonts.find(this._index).value
    }
    setFont(font: Font, span: number = 1): void {
      if (span < 1) {
        throw new Error(`span must be above 1, ${span}`)
      }
      this._fonts.override(this._index, span, font)
    }

    insert(quantity: number = 1): void {
      if (quantity < 1) {
        throw new Error(`quantity must be above 1, ${quantity}`)
      }
      this._fonts.insert(this._index, quantity)
    }
    remove(quantity: number = 1): void {
      if (quantity < 1) {
        throw new Error(`quantity must be above 1, ${quantity}`)
      }
      console.log('remove with...', quantity)
    }
  }

  export const NCHARCODES = 128

  export class GlyphFactory {
    private _character: Character[] = new Array<Character>(NCHARCODES)
    constructor() {
      for (let i = 0; i < NCHARCODES; i++) {
        this._character[i] = undefined
      }
    }
    createCharacter(c: string): Character {
      const charCode = c.charCodeAt(0)
      if (!this._character[charCode]) {
        this._character[charCode] = new Character(c)
      }
      return this._character[charCode]
    }
    createRow(): Row {
      return new Row
    }
    createColumn(): Column {
      return new Column
    }
  }

  export class Font {
    constructor(private _name: string) {}
    get name(): string {return this._name}
  }

  export class BTree<U extends {name: string}> {
    private root: INode<U> = this.createNewNode(0)

    get lastIndex(): number {
      return this.root.sumChildIndexes
    }

    find(index: number): INode<U> {
      return this.traverse(this.root, index).targetNode
    }

    insert(index: number, quantity: number): void {
      if (quantity < 1) {
        throw new Error(`quantity must be above 1, ${quantity}`)
      }
      const {targetNode, targetIndexInTargetNode} = this.traverse(this.root, index)
      // targetNode has no children
      if (targetNode.sumChildIndexes === 0) {
        // targetNode is root which doesn't have any children yet
        targetNode.sumChildIndexes = quantity
      } else {
        const inserted = this.createNewNode(quantity)
        inserted.parent = targetNode
        if (targetIndexInTargetNode > 0 && targetIndexInTargetNode < targetNode.sumChildIndexes - 1) {
          // Insert in between
          const existingBeforeInsertedNode = this.createNewNode(targetIndexInTargetNode)
          existingBeforeInsertedNode.parent = targetNode
          existingBeforeInsertedNode.value = targetNode.value
          const existingAfterInsertedNode = this.createNewNode(targetNode.sumChildIndexes - targetIndexInTargetNode)
          existingAfterInsertedNode.parent = targetNode
          existingAfterInsertedNode.value = targetNode.value
          targetNode.children.push(existingBeforeInsertedNode)
          targetNode.children.push(inserted)
          targetNode.children.push(existingAfterInsertedNode)
        } else {
          const existing = this.createNewNode(targetNode.sumChildIndexes)
          existing.parent = targetNode
          existing.value = targetNode.value
          if (targetIndexInTargetNode === 0) {
            // Insert before
            targetNode.children.push(inserted)
            targetNode.children.push(existing)
          } else {
            // Insert after
            targetNode.children.push(existing)
            targetNode.children.push(inserted)
          }
        }
        targetNode.value = undefined
        this.updateSumChildIndexes(targetNode, quantity)
      }
    }

    override(index: number, span: number, value: U) {
      const {targetNode, targetIndexInTargetNode} = this.traverse(this.root, index)

      if (targetIndexInTargetNode !== 0) {
        throw new Error('Overriding the part of node is not implemented')
      }
      if (span < targetNode.sumChildIndexes) {
        throw new Error('Overriding the part of node is not implemented')
      }
      if (span > targetNode.sumChildIndexes) {
        throw new Error('Overriding the range of multiple nodes is not implemented')
      }

      targetNode.value = value

      if (targetNode.parent) {
        let indexInSiblings = -1
        for (let i = 0; i < targetNode.parent.children.length; i++) {
          if (targetNode.parent.children[i] === targetNode) {
            indexInSiblings = i
            break
          }
        }
        if (indexInSiblings === -1) {
          throw new Error('indexInSiblings must be found')
        }
        const isSameAsBigBrother = targetNode.parent.children[indexInSiblings - 1]?.value.name === targetNode.value.name
        const isSameAsLittleBrother = targetNode.parent.children[indexInSiblings - 1]?.value.name === targetNode.value.name
        if (isSameAsBigBrother && isSameAsLittleBrother) {
          targetNode.parent.value = targetNode.value
          targetNode.children = []
        } else if (isSameAsBigBrother || isSameAsLittleBrother) {
          throw new Error('Merging only with big or little brother is not implemented')
        }
      }
    }

    private traverse(currentNode: INode<U>, targetIndex: number, currentIndex: number = 0): {targetNode: INode<U>, targetIndexInTargetNode: number} {
      if (currentNode.children.length === 0) return {targetNode: currentNode, targetIndexInTargetNode: targetIndex - currentIndex}

      for (const child of currentNode.children) {
        if (currentIndex + child.sumChildIndexes > targetIndex) {
          return this.traverse(child, targetIndex, currentIndex)
        }
        currentIndex += child.sumChildIndexes
      }

      throw new Error(`targetIndex ${targetIndex} is above currentNode's range ${currentNode.sumChildIndexes}`)
    }

    private updateSumChildIndexes(currentNode: INode<U>, quantity: number): void {
      currentNode.sumChildIndexes += quantity
      currentNode.parent && this.updateSumChildIndexes(currentNode.parent, quantity)
    }

    private createNewNode(sumChildIndexes: number): INode<U> {
      return {
        sumChildIndexes,
        parent: null,
        children: [],
      }
    }
  }
  interface INode<U> {
    sumChildIndexes: number
    value?: U
    parent: INode<U> | null
    children: INode<U>[]
  }

  export class Window {}
  export class Row {}
  export class Column {}
}