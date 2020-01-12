
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene'})
    }
    preload() {
        this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
        this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
      }
      createPlatforms(x, y, size) {
        const platforms = this.physics.add.staticGroup();
        platforms.create(x, y, 'platform').setScale(size).refreshBody(); 
        this.physics.add.collider(gameState.player, platforms);
      }
      createJumpPads(x, y, size) {
        const jumpPads = this.physics.add.staticGroup();
        jumpPads.create(x, y, 'platform').setScale(size).setTint(0x000000).refreshBody();
        this.physics.add.collider(gameState.player, jumpPads, function() {
          gameState.player.setVelocityY(-500)
        });
      }
    create() {
        gameState.player = this.physics.add.sprite(320, 500, 'codey').setScale(.5);
        const platforms = this.physics.add.staticGroup();
        platforms.create(320, 580, 'platform').setScale(1.5).refreshBody();
        this.createPlatforms(640, 500, 1);
        this.createPlatforms(320, 420, .1);
        this.createPlatforms(200, 360, .1);
        this.createPlatforms(360, 200, .5);
        this.createJumpPads(100, 400, .1);
        const warpPads = this.physics.add.staticGroup();
        warpPads.create(360, 185, 'platform').setScale(.1).setTint(0xffff00).refreshBody();
        this.physics.add.collider(gameState.player, warpPads, ()=> {
          this.scene.stop('GameScene');
          this.scene.start('Level1');
        });
        gameState.player.setCollideWorldBounds(true);
        this.physics.add.collider(gameState.player, platforms);
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