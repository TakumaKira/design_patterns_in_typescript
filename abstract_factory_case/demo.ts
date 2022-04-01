/// <reference path="abstractFactoryCase.ts" />

namespace AbstractFactoryCase {
	export namespace Demo {
		export function show() {
    	const game = new MazeGame()
      const maze = game.createMaze(new MazeFactory())
			console.log(maze)
      const enchantedMaze = game.createMaze(new EnchantedMazeFactory())
			console.log(enchantedMaze)
      const bombedMaze = game.createMaze(new BombedMazeFactory())
			console.log(bombedMaze)
		}
	}
}

