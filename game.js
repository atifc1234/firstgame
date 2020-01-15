const gameState = {}

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 560,
    backgroundColor: "b9eaff",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 400},
            enableBody: true,
            debug: false,
        }
    },
    scene: [StartScene, SelectionScene, GameScene, Level1, Level2, Level3, Level4, Level5, EndScene]
  }
  
  const game = new Phaser.Game(config)
