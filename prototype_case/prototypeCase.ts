namespace PrototypeCase {
  export class MazeGame {
    createMaze(factory: MazeFactory): Maze {
      const aMaze = factory.makeMaze()
      const r1 = factory.makeRoom(1)
      const r2 = factory.makeRoom(2)
      const aDoor = factory.makeDoor(r1, r2)

      aMaze.addRoom(r1)
      aMaze.addRoom(r2)

      r1.setSide(Direction.North, factory.makeWall())
      r1.setSide(Direction.East, aDoor)
      r1.setSide(Direction.South, factory.makeWall())
      r1.setSide(Direction.West, factory.makeWall())

      r2.setSide(Direction.North, factory.makeWall())
      r2.setSide(Direction.East, factory.makeWall())
      r2.setSide(Direction.South, factory.makeWall())
      r2.setSide(Direction.West, aDoor)

      return aMaze
    }
  }

  export interface MazeFactory {
    makeMaze(): Maze
    makeWall(): Wall
    makeRoom(n: number): Room
    makeDoor(r1: Room, r2: Room): Door
  }

  export class MazePrototypeFactory implements MazeFactory {
    constructor(
      private _prototypeMaze: Maze,
      private _prototypeRoom: Room,
      private _prototypeWall: Wall,
      private _prototypeDoor: Door,
    ) {}

    makeMaze(): Maze {
      return this._prototypeMaze.clone()
    }
    makeWall(): Wall {
      return this._prototypeWall.clone()
    }
    makeRoom(n: number): Room {
      const room = this._prototypeRoom.clone()
      room.initialize(n)
      return room
    }
    makeDoor(r1: Room, r2: Room): Door {
      const door = this._prototypeDoor.clone()
      door.initialize(r1, r2)
      return door
    }
  }

  export class Maze {
    private _rooms: Room[] = []
    constructor()
    constructor(maze: Maze)
    constructor(maze?: Maze) {
      maze && this.maze(maze)
    }
    maze(other: Maze) {
      // Clone private properties when base instance passed
      this._rooms = [...other._rooms]
    }
    clone(): Maze {
      return new Maze(this)
    }
    addRoom(room: Room): void {
      this._rooms.push(room)
    }
    roomNo(roomNumber: number): Room {
      return this._rooms.filter(room => room.roomNumber === roomNumber)?.[0]
    }
  }

  export abstract class MapSite {
    abstract clone(): MapSite
    abstract enter(): void
  }

  export class Wall extends MapSite {
    constructor()
    constructor(wall: Wall)
    constructor(wall?: Wall) {
      super()
      wall && this.wall(wall)
    }
    wall(other: Wall) {
      // Clone private properties when base instance passed
    }
    clone(): Wall {
      return new Wall(this)
    }
    override enter(): void {}
  }

  export class Room extends MapSite {
    private _roomNumber: number
    private _sides = new Array<MapSite>(4)
    constructor()
    constructor(room: Room)
    constructor(room?: Room) {
      super()
      room && this.room(room)
    }
    room(other: Room) {
      // Clone private properties when base instance passed
      this._roomNumber = other._roomNumber
      this._sides = [...other._sides]
    }
    clone(): Room {
      return new Room(this)
    }
    initialize(n: number): void {
      this._roomNumber = n
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
    private _room1: Room
    private _room2: Room
    constructor()
    constructor(door: Door)
    constructor(door?: Door) {
      super()
      door && this.door(door)
    }
    door(other: Door) {
      // Clone private properties when base instance passed
      this._room1 = other._room1
      this._room2 = other._room2
    }
    clone(): Door {
      return new Door(this)
    }
    initialize(r1: Room, r2: Room) {
      this._room1 = r1
      this._room2 = r2
    }
    override enter(): void {}
    otherSideFrom(room: Room): Room {
      return room === this._room1 ? this._room2 : this._room1
    }
  }

  enum Direction { North, South, East, West }

  // Bomb extensions
  export class BombedWall extends Wall {
    private _bomb: boolean
    constructor()
    constructor(wall: BombedWall)
    constructor(wall?: BombedWall) {
      super()
      wall && this.wall(wall)
    }
    wall(other: BombedWall) {
      // Clone private properties when base instance passed
      this._bomb = other._bomb
    }
    clone(): Wall {
      return new BombedWall(this)
    }
    hasBomb(): boolean {
      return this._bomb
    }
  }

  export class RoomWithABomb extends Room {
    constructor()
    constructor(room: RoomWithABomb)
    constructor(room?: RoomWithABomb) {
      super()
      room && this.room(room)
    }
    room(other: RoomWithABomb) {
      // Clone private properties when base instance passed
    }
    clone(): Room {
      return new RoomWithABomb(this)
    }
  }
}