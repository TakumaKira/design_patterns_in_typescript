/// <reference path="singletonCase.ts" />

namespace SingletonCase {
  let MAZESTYLE: string
	export namespace Demo {
		export function show() : void {
    	const game = new MazeGame()
      const mazeFactory1 = MazeFactory.instance()
      const mazeFactory2 = MazeFactory.instance()
      console.log(mazeFactory1 === mazeFactory2)
      const maze = game.createMaze(mazeFactory1)
			console.log(maze)
      MazeFactory.resetInstance()
      const bombedMazeFactory1 = MazeFactory.instance('bombed')
      const bombedMazeFactory2 = MazeFactory.instance()
      console.log(bombedMazeFactory1 === bombedMazeFactory2)
      const bombedMaze = game.createMaze(bombedMazeFactory1)
			console.log(bombedMaze)
      MazeFactory.resetInstance()
      const enchantedMazeFactory1 = MazeFactory.instance('enchanted')
      const enchantedMazeFactory2 = MazeFactory.instance()
      console.log(enchantedMazeFactory1 === enchantedMazeFactory2)
      const enchantedMaze = game.createMaze(enchantedMazeFactory1)
			console.log(enchantedMaze)
		}
	}
}
