namespace AbstractFactoryCase {
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

  export class MazeFactory {
    makeMaze(): Maze {
      return new Maze()
    }
    makeWall(): Wall {
      return new Wall()
    }
    makeRoom(n: number): Room {
      return new Room(n)
    }
    makeDoor(r1: Room, r2: Room): Door {
      return new Door(r1, r2)
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

  // Enchanted extensions
  export class EnchantedMazeFactory extends MazeFactory {
    override makeRoom(n: number): Room {
      return new EnchantedRoom(n, this.castSpell())
    }
    override makeDoor(r1: Room, r2: Room): Door {
      return new DoorNeedingSpell(r1, r2)
    }
    protected castSpell(): Spell {
      return new Spell()
    }
  }

  export class EnchantedRoom extends Room {
    constructor(_roomNumber: number, private _spell: Spell) {
      super(_roomNumber)
    }
  }

  export class DoorNeedingSpell extends Door {}

  export class Spell {}

  // Bomb extensions
  export class BombedMazeFactory extends MazeFactory {
    override makeWall(): Wall {
      return new BombedWall()
    }
    override makeRoom(n: number): Room {
      return new RoomWithABomb(n)
    }
  }

  export class BombedWall extends Wall {}

  export class RoomWithABomb extends Room {}
}