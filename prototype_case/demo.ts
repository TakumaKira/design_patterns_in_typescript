/// <reference path="prototypeCase.ts" />

namespace PrototypeCase {
	export namespace Demo {
		export function show() : void {
			const game = new MazeGame()
      const simpleMazeFactory = new MazePrototypeFactory(new Maze, new Room, new Wall, new Door)
      const simpleMaze = game.createMaze(simpleMazeFactory)
      console.log(simpleMaze)
      const bombedMazeFactory = new MazePrototypeFactory(new Maze, new RoomWithABomb, new BombedWall, new Door)
      const bombedMaze = game.createMaze(bombedMazeFactory)
      console.log(bombedMaze)
		}
	}
}