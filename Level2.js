class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2'})
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
        gameState.player.setCollideWorldBounds(true);
        this.physics.add.collider(gameState.player, platforms);
        this.createPlatforms(640, 50, .3);
        const teleporter2 = this.physics.add.staticGroup();
        teleporter2.create(100, 100, 'platform').setScale(.1).setTint(0xfa67d8).refreshBody();
        this.physics.add.collider(gameState.player, teleporter2);
        const teleporter1 = this.physics.add.staticGroup();
        teleporter1.create(620, 520, 'platform').setScale(.1).setTint(0xfa67d8).refreshBody();
        this.physics.add.collider(gameState.player, teleporter1, ()=> {
          gameState.player.x = 100;
          gameState.player.y = 80;
        });
        this.createJumpPads(505, 350, .3);
        const warpPads = this.physics.add.staticGroup();
        warpPads.create(640, 42, 'platform').setScale(.1).setTint(0xffff00).refreshBody();
        this.physics.add.collider(gameState.player, warpPads, ()=> {
          this.scene.stop('Level2');
          this.scene.start('Level3');
        });
    
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
