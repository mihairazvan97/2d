class Obstacle {
    x
    y
    width
    height
    type
    game

    constructor({ x, y, width, height, type, game }) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.type = type
        this.game = game
    }

    draw() {
        if(this.type === 1) {
            this.game.ctx.fillStyle = '#58391c'
        }else if (this.type === 2) {
            this.game.ctx.fillStyle = '#81b214'
        }
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
