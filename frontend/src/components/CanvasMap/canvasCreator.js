import { getMap } from '../../storage/canvasMap';
import { HeroDataset } from '../../utils/constants';

function createMap() {
    const map = getMap();
    const img = new Image();
    img.src = map.background;

    return {
        img: img,
        playerStartX: map.startCol,
        playerStartY: map.startRow,
        binMap: map.binaryRepresentation,
        imgWidth: map.imgWidth,
        imgHeight: map.imgHeight,
    };
}

export let GameMap = function (canvas, heroType) {
    this.scale = 25;
    this.canvas = canvas;
    this.step = 0;
    this.ctx = this.canvas.getContext('2d');
    this.map = null;
    this.player = null;
    this.playerImgIterator = 0;
    this.flipHorizontally = false;

    this.setCanvasSize = () => {
        this.canvas.style.width = '100%';
        this.canvas.width = canvas.offsetWidth;
        const height = Math.round((this.canvas.width * 3) / 4); // game map has a proportion 4:3
        this.canvas.style.height = height + 'px';
        this.canvas.height = canvas.offsetHeight;
    };

    this.createPlayer = () => {
        const playerSizeX = Math.min(this.canvas.width, this.canvas.height) / this.scale;
        const img = new Image();
        img.src = HeroDataset[heroType][0];

        return {
            img: img,
            sizeX: playerSizeX,
            sizeY: (img.height * playerSizeX) / img.width,
            x: this.map.playerStartX,
            y: this.map.playerStartY,
        };
    };

    this.draw = () => {
        // draw game map
        this.ctx.drawImage(this.map.img, 0, 0, this.canvas.width, this.canvas.height);

        // draw player hero
        const img = new Image();
        const imgDataset = HeroDataset[heroType];
        this.playerImgIterator = ++this.playerImgIterator % imgDataset.length;
        img.src = HeroDataset[heroType][this.playerImgIterator];

        if (this.flipHorizontally) {
            this.ctx.translate(
                this.player.x * this.step + 2 * img.width,
                this.player.y * this.step - img.height
            );
            this.ctx.scale(-1, 1);
        }

        this.player.img = this.ctx.drawImage(
            img,
            this.flipHorizontally ? 0 : this.player.x * this.step,
            this.flipHorizontally ? 0 : this.player.y * this.step - img.height,
            this.player.sizeX,
            this.player.sizeY
        );

        if (this.flipHorizontally) this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    this.clear = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    this.move = pressedKey => {
        switch (pressedKey.key) {
            case 'ArrowUp':
                if (this.player.y - 1 > 0) {
                    this.player.y -= this.map.binMap[this.player.y - 1][this.player.x];
                }
                break;
            case 'ArrowDown':
                if (this.player.y + 1 < this.map.binMap.length) {
                    this.player.y += this.map.binMap[this.player.y + 1][this.player.x];
                }
                break;
            case 'ArrowLeft':
                if (this.player.x - 1 > 0) {
                    this.player.x -= this.map.binMap[this.player.y][this.player.x - 1];
                }
                this.flipHorizontally = true;
                break;
            case 'ArrowRight':
                if (this.player.x + 1 < this.map.binMap[this.player.y].length) {
                    this.player.x += this.map.binMap[this.player.y][this.player.x + 1];
                }
                this.flipHorizontally = false;
                break;
            default:
                console.log('unrecognised');
                break;
        }

        this.clear();
        this.draw(this.flipHorizontally);
    };

    window.addEventListener('keydown', this.move);
    window.addEventListener('resize', () => {
        this.setCanvasSize();
        this.draw();
    });

    this.run = function () {
        this.setCanvasSize();
        this.map = createMap();
        this.step = (16 * this.canvas.width) / this.map.imgWidth;
        this.player = this.createPlayer();
        this.map.img.onload = this.draw;
    };
};
