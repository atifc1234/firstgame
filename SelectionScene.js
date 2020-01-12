class SelectionScene extends Phaser.Scene {
	constructor() {
		super({ key: 'SelectionScene' })
    }

   preload() {
    this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
    this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
  }
  create() {
    gameState.player = this.physics.add.sprite(320, 500, 'codey').setScale(.5);
    const platforms = this.physics.add.staticGroup();
    platforms.create(320, 580, 'platform').setScale(1.5).refreshBody();
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, platforms);
    gameState.howToPlay = this.add.text(550, 400, "How To Play", {fontFamily: 'Georgia', fill:'#000000', fontSize: '15px'})
    gameState.howToPlay.setInteractive();
    gameState.howToPlay.on('pointerup', () => {
      this.scene.stop('SelectionScene');
      this.scene.start('StartScene');
    })
    this.add.text(100, 10, 'Click to select, or go to the corrosponding warp pad', {fontFamily: 'Georgia', fill: '#000000', fontSize: '20px'})
    gameState.Play = this.add.text(10, 400, "Play", {fontFamily: 'Georgia', fill:'#000000', fontSize: '15px'})
    gameState.Play.setInteractive();
    gameState.Play.on('pointerup', () => {
      this.scene.stop('SelectionScene');
      this.scene.start('GameScene');
    })
    const warpPads = this.physics.add.staticGroup();
    warpPads.create(20, 527, 'platform').setScale(.1).setTint(0xffff00).refreshBody();
      this.physics.add.collider(gameState.player, warpPads, ()=> {
        this.scene.stop('SelectionScene');
        this.scene.start('GameScene');
    });
    const warpPads2 = this.physics.add.staticGroup();
    warpPads2.create(580, 527, 'platform').setScale(.1).setTint(0xffff00).refreshBody();
      this.physics.add.collider(gameState.player, warpPads2, ()=> {
        this.scene.stop('SelectionScene');
        this.scene.start('StartScene');
    });
  }
    update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      gameState.player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      gameState.player.setVelocityX(200);
    } else {
      gameState.player.setVelocityX(0);
    };
    if (cursors.up.isDown && gameState.player.body.touching.down) {
      gameState.player.setVelocityY(-250)
    };
  }
}