class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene'})
    }
    create() {
        this.add.text(150, 50, "Congrats! You've reached the end of the \ngame. You may be wondering where is the human. \nDead. All the humans have died", {align: 'center', fontFamily: 'Georgia', fill: '#000000', fontSize: '15px'});
    }
}