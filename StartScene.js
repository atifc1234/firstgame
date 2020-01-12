class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' })
    }
    preload() {
        this.load.image('codey', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png');
        this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
    }
    create() {
        this.add.text(250, 10, "Codey's Adventure", {align: 'center', fontFamily: 'Georgia', fill: '#000000', fontSize: '20px'});
        this.add.text(150, 50, "Hello and welcome to Codey's Adventure. Codey is \na sad robot because there's no human who wants to \nprogram him so he must go on a quest to find a \nmaster.\nArrow keys and mouse.", {align: 'center', fontFamily: 'Georgia', fill: '#000000', fontSize: '15px'});
        this.input.on('pointerdown', () => {
			this.scene.stop('StartScene')
			this.scene.start('SelectionScene')
        });
        this.add.image(205, 150, 'platform').setScale(.1);
        this.add.text(230, 140, ' - Blocks this color are regular platforms',  {fontFamily: 'Georgia', fill: '#000000', fontSize: '15px'});
        this.add.image(205, 200, 'platform').setScale(.1).setTint(0x000000);
        this.add.text(230, 190, ' - Block this color are jump pads', {fontFamily: 'Georgia', fill: '#000000', fontSize: '15px'});
        this.add.image(205, 250, 'platform').setScale(.1).setTint(0xffff00);
        this.add.text(230, 240, ' - Block this color are warp pads to the next level', {fontFamily: 'Georgia', fill: '#000000', fontSize: '15px'});
        this.add.image(205, 300, 'platform').setScale(.1).setTint(0xfa67d8);
        this.add.text(230, 290, ' - Blocks this color are teleporters', {fontFamily: 'Georgia', fill: '#000000', fontSize: '15px'});
        this.add.text(270, 360, 'Click to start', {fontFamily: 'Georgia', fill: '#000000', fontSize: '15px'})
    }    
}