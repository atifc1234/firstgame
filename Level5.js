class Level5 extends Phaser.Scene  {
    constructor() {
        super({ key: 'Level5'})
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
    createTeleporters(x1, y1, size1, x2, y2, size2) {
        const teleporter2 = this.physics.add.staticGroup();
        teleporter2.create(x1, y1, 'platform').setScale(size1).setTint(0xfa67d8).refreshBody();
        this.physics.add.collider(gameState.player, teleporter2);
        const teleporter1 = this.physics.add.staticGroup();
        teleporter1.create(x2, y2, 'platform').setScale(size2).setTint(0xfa67d8).refreshBody();
        this.physics.add.collider(gameState.player, teleporter1, ()=> {
          gameState.player.x = x1;
          gameState.player.y = y1 - 20;
        });
    }
    create() {
        gameState.player = this.physics.add.sprite(320, 500, 'codey').setScale(.5);
        const platforms = this.physics.add.staticGroup();
        platforms.create(320, 580, 'platform').setScale(1.5).refreshBody();
        this.physics.add.collider(gameState.player, platforms);
        gameState.player.setCollideWorldBounds(true);
        const warpPads = this.physics.add.staticGroup();
        warpPads.create(550, 40, 'platform').setScale(.1).setTint(0xffff00).refreshBody();
        this.physics.add.collider(gameState.player, warpPads, ()=> {
          this.scene.stop('Level5');
          this.scene.start('EndScene');
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
