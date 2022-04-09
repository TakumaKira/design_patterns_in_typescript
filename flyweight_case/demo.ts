/// <reference path="flyweightCase.ts" />

namespace FlyweightCase {
	export namespace Demo {
		export function show() : void {
      const str1 = 'Object-oriented prog' // 1-20
      const str2 = 'people expect to ch' // 95-113
      const str3 = 'an iterator Foo can' // 299-317
      let str = str1
      for (let i = 20; i < 94; i++) {
        str += '.'
      }
      str += str2
      for (let i = 113; i < 298; i++) {
        str += '.'
      }
      str += str3
      for (let i = 317; i < 500; i++) {
        str += '.'
      }
      const charStr: Character[] = []
      const factory = new GlyphFactory
      for (let i = 0; i < str.length; i++) {
        charStr.push(factory.createCharacter(str[i]))
      }

      const window = new Window
      const gc = new GlyphContext
      const times24 = new Font('Times-24')
      const times12 = new Font('Times-12')
      const timesItalic12 = new Font('Times-Italic-12')
      const timeBold12 = new Font('Time-Bold-12')
      const courier24 = new Font('Courier-24')

      /**
       * Now, tree is like below
       *            0
       *            |
       *            |
       *            |
       *            |
       *            |
       *            |
       *            |
       *        undefined
       * A:Times24
       * B:Times-Italic12
       * C:Times12
       * D:Times-Bold12
       * E:Courier24
       */

      gc.insert(196)
      gc.setFont(times24, 196)

      /**
       * Now, tree is like below
       *           196
       *            |
       *            |
       *            |
       *            |
       *            |
       *            |
       *            |
       *            A
       * A:Times24
       * B:Times-Italic12
       * C:Times12
       * D:Times-Bold12
       * E:Courier24
       */

      gc.first()
      gc.next(1)

      gc.insert(294)
      gc.setFont(times12, 294)
      gc.next(294)

      gc.setFont(timeBold12, 195)

      /**
       * Now, tree is like below
       *           490
       *     /     /     \
       *    1    294     195
       *    |     |       |
       *    |     |       |
       *    |     |       |
       *    |     |       |
       *    |     |       |
       *    A     C       D
       * A:Times24
       * B:Times-Italic12
       * C:Times12
       * D:Times-Bold12
       * E:Courier24
       */

      gc.first()
      gc.next(101)
      gc.insert(6)
      gc.setFont(timesItalic12, 6)

      gc.first()
      gc.next(309)
      gc.insert(3)
      gc.setFont(courier24, 3)

      gc.next(3)
      gc.setFont(times12, 187)

      /**
       * Now, tree is like below
       *           499
       *     /     /     \
       *    1    300     198
       *    |   / | \    /| \
       *    | 100 6 194 8 3  187
       *    |  |  |  |  | |   |
       *    |  |  |  |  | |   |
       *    |  |  |  |  | |   |
       *    A  C  B  C  D E   C
       * A:Times24
       * B:Times-Italic12
       * C:Times12
       * D:Times-Bold12
       * E:Courier24
       */

      gc.first()
      gc.next(309)
      gc.insert(1)
      gc.setFont(times12, 1)

      /**
       * Now, tree is like below
       *           500
       *     /     /     \
       *    1    300     199
       *    |   / | \    /| \
       *    | 100 6 194 8 4  187
       *    |  |  |  |  | /\  |
       *    |  |  |  |  | 1 3 |
       *    |  |  |  |  | | | |
       *    A  C  B  C  D C E C
       * A:Times24
       * B:Times-Italic12
       * C:Times12
       * D:Times-Bold12
       * E:Courier24
       */

      console.log('Render 1st state')
      gc.first()
      for (const char of charStr) {
        char.draw(window, gc)
        gc.next()
      }

      gc.first()
      gc.next(101)
      gc.setFont(times12, 6)

      /**
       * Now, tree is like below
       *           500
       *     /     /     \
       *    1    300     199
       *    |     |      /| \
       *    |     |     8 4  187
       *    |     |     | /\  |
       *    |     |     | 1 3 |
       *    |     |     | | | |
       *    A     C     D C E C
       * A:Times24
       * B:Times-Italic12
       * C:Times12
       * D:Times-Bold12
       * E:Courier24
       */

      console.log('Render 2nd state')
      gc.first()
      for (const char of charStr) {
        char.draw(window, gc)
        gc.next()
      }

      charStr.splice(101, 0, factory.createCharacter('x'), factory.createCharacter('x'), factory.createCharacter('x'), factory.createCharacter('x'), factory.createCharacter('x'), factory.createCharacter('x'))

      gc.first()
      gc.next(101)
      gc.insert(6)
      gc.setFont(timesItalic12, 6)

      /**
       * Now, tree is like below
       *           506
       *     /     /     \
       *    1    306     199
       *    |   / | \    /| \
       *    | 100 6 200 8 4  187
       *    |  |  |  |  | /\  |
       *    |  |  |  |  | 1 3 |
       *    |  |  |  |  | | | |
       *    A  C  B  C  D C E C
       * A:Times24
       * B:Times-Italic12
       * C:Times12
       * D:Times-Bold12
       * E:Courier24
       */

      console.log('Render 3rd state')
      gc.first()
      for (const char of charStr) {
        char.draw(window, gc)
        gc.next()
      }
		}
	}
}
