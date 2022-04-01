namespace BuilderCase {
  export class MazeGame {
    createMaze(builder: MazeBuilder): Maze {
      builder.buildMaze()

      builder.buildRoom(1)
      builder.buildRoom(2)
      builder.buildDoor(1, 2)

      return builder.getMaze()
    }

    createComplexMaze(builder: MazeBuilder): Maze {
      for (let i = 1; i <= 1001; i++) {
        builder.buildRoom(i)
        if (i < 2) continue
        builder.buildDoor(i - 1, i)
      }
      return builder.getMaze()
    }
  }

  export interface MazeBuilder {
    buildMaze(): void
    buildRoom(room: number): void
    buildDoor(roomFrom: number, roomTo: number): void
    getMaze(): Maze
  }

  export class StandardMazeBuilder implements MazeBuilder {
    private _currentMaze: Maze
    buildMaze(): void {
      this._currentMaze = new Maze()
    }
    buildRoom(n: number): void {
      if (!this._currentMaze.roomNo(n)) {
        const room = new Room(n)
        this._currentMaze.addRoom(room)

        room.setSide(Direction.North, new Wall())
        room.setSide(Direction.South, new Wall())
        room.setSide(Direction.East, new Wall())
        room.setSide(Direction.West, new Wall())
      }
    }
    buildDoor(n1: number, n2: number): void {
      const r1 = this._currentMaze.roomNo(n1)
      const r2 = this._currentMaze.roomNo(n2)
      const d = new Door(r1, r2)

      r1.setSide(this.commonWall(r1, r2), d)
      r2.setSide(this.commonWall(r2, r1), d)
    }
    getMaze(): Maze {
      return this._currentMaze
    }
    commonWall(r1: Room, r2: Room): Direction {
      return
    }
  }

  export class CountingMazeBuilder implements MazeBuilder {
    private _doors = 0
    private _rooms = 0
    buildMaze(): void {}
    buildRoom(room: number): void {
      this._rooms++
    }
    buildDoor(roomFrom: number, roomTo: number): void {
      this._doors++
    }
    getMaze(): Maze {
      return
    }
    getCounts(): {rooms: number, doors: number} {
      return {rooms: this._rooms, doors: this._doors}
    }
  }

  export class Maze {
    private rooms: Room[] = []
    addRoom(room: Room): void {
      this.rooms.push(room)
    }
    roomNo(roomNumber: number): Room {
      return this.rooms.filter(room => room.roomNumber === roomNumber)?.[0]
    }
  }

  export abstract class MapSite {
    enter(): void {}
  }

  export class Wall extends MapSite {
    override enter(): void {}
  }

  export class Room extends MapSite {
    private _sides = new Array(4)
    constructor(private _roomNumber: number) {
      super()
    }
    get roomNumber(): number {
      return this._roomNumber
    }
    getSide(direction: Direction): MapSite {
      return this._sides[direction]
    }
    setSide(direction: Direction, mapSite: MapSite): void {
      this._sides[direction] = mapSite
    }
    override enter(): void {}
  }

  export class Door extends MapSite {
    private _isOpen: boolean
    constructor(private _room1: Room, private _room2: Room) {
      super()
    }
    override enter(): void {}
    otherSideFrom(room: Room): Room {
      return room === this._room1 ? this._room2 : this._room1
    }
  }

  enum Direction { North, South, East, West }
}