import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

    // Create the tilemap from the loaded JSON key
    const map = this.make.tilemap({ key: "map" });

    // Link the tileset image to the tilemap
    const tileset = map.addTilesetImage("tiles1", "tiles");

    // Create and render the ground layer
    const groundLayer = map.createLayer("Tile Layer 1", tileset, 0, 0);

    // Center the ground layer within the canvas
    const offsetX = (config.width - map.widthInPixels) / 2;
    const offsetY = (config.height - map.heightInPixels) / 2;
    groundLayer.setPosition(offsetX, offsetY);

    console.log("Ground layer created and centered!");
}

function update() {
    console.log("Updating...");
}

// Initialize the Phaser game instance
const game = new Phaser.Game(config);
