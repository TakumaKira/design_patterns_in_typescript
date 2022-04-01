/// <reference path="builderCase.ts" />

namespace BuilderCase {
	export namespace Demo {
		export function show() : void {
      const builder = new StandardMazeBuilder()
      const game = new MazeGame()
      game.createMaze(builder)
			const maze = builder.getMaze()
      console.log(maze)

      const countingBuilder = new CountingMazeBuilder()
      const countingGame = new MazeGame()
      countingGame.createMaze(countingBuilder)
      const {rooms, doors} = countingBuilder.getCounts()
      console.log(`The maze has ${rooms} rooms and ${doors} doors`)

      const countingComplexBuilder = new CountingMazeBuilder()
      const countingComplexGame = new MazeGame()
      countingComplexGame.createComplexMaze(countingComplexBuilder)
      const {rooms: complexRooms, doors: complexDoors} = countingComplexBuilder.getCounts()
      console.log(`The maze has ${complexRooms} rooms and ${complexDoors} doors`)
		}
	}
}
