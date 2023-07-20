import CatapultGame from "../game"

interface IParams {
    x: number
    y: number
    game: CatapultGame
}

export class Catapult {
    game: CatapultGame

    constructor({ game } : IParams) {
        this.game = game
    }


}