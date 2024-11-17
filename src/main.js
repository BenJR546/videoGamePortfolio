import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    scene: {
        preload,
        create,
        update,
    },
};

function preload() {
    console.log("Preloading...");

    // Load the tileset image
    this.load.image("tiles", "./assets/map1tileset.png");

    // Load the Tiled JSON map
    this.load.tilemapTiledJSON("map", "./assets/map1.json");
}

function create() {
    console.log("Creating...");

    // Map Setup
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tiles1", "tiles");
    const groundLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);

    // Center the ground layer
    const offsetX = (config.width - map.widthInPixels) / 2;
    const offsetY = (config.height - map.heightInPixels) / 2;
    groundLayer.setPosition(offsetX, offsetY);
    console.log("Ground layer created and centered!");

    // Player Setup
    const playerSize = 16;
    this.player = this.add.rectangle(
        400,
        300,
        playerSize,
        playerSize,
        0xff0000
    );
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);
    console.log("Player sprite created physics added!");
    // this.add.text(400, 300, "Hello Phaser!", {
    //     font: "16px Arial",
    //     fill: "#ffffff",
    // });

    //Enable input
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    console.log("Updating...");

    // Player Movement
    // Config
    const speed = 200;
    this.cursors = this.input.keyboard.createCursorKeys();

    // Horizontal Movement
    if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(speed);
    } else {
        this.player.body.setVelocityX(0);
    }

    // Vertical Movement
    if (this.cursors.up.isDown) {
        this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
        this.player.body.setVelocityY(speed);
    } else {
        this.player.body.setVelocityY(0);
    }
}

// Initialize the Phaser game instance
const game = new Phaser.Game(config);
