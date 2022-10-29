
import WaitingScene from "./scenes/WaitingScene.js";

let CONFIG: any = {
    type: Phaser.AUTO,
    title: 'test',
    parent: 'game',
    scene: [
        new WaitingScene()
    ]

}
class Game extends Phaser.Game {
    constructor(config: any) {
        super(config)
    }
}
function startGame() {
    let gameState: number = 1
    while (gameState != 0) {
        console.log("Start game loop")
        gameState = 0
    }

}
window.onload = () => {
    var game: Phaser.Game = new Phaser.Game(CONFIG)
}