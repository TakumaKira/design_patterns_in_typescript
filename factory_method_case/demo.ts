/// <reference path="factoryMethodCase.ts" />

namespace FactoryMethodCase {
	export namespace Demo {
		export function show() : void {
    	const game = new MazeGame()
      const maze = game.createMaze()
			console.log(maze)
    	const enchantedMazeGame = new EnchantedMazeGame()
      const enchantedMaze = enchantedMazeGame.createMaze()
			console.log(enchantedMaze)
    	const bombedMazeGame = new BombedMazeGame()
      const bombedMaze = bombedMazeGame.createMaze()
			console.log(bombedMaze)
		}
	}
}
