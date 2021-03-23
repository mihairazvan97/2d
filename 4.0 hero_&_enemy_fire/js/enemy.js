class Enemy{
    x 
    y 
    width = 30
    height = 15
    angle = 0
    heroX
    heroY 
    game

    constructor({x, y, game}){
        this.x = x
        this.y = y
        this.game = game
    }

    step(){
        this.heroX = this.game.hero.x
        this.heroY = this.game.hero.y

        let dx = this.heroX - this.x
        let dy = this.heroY - this.y
        this.angle = Math.atan2(dy, dx) 
    }

    draw(){
        this.game.ctx.save()
        this.game.ctx.fillStyle = '#e1112e'
        this.game.ctx.fillRect(this.x - 15, this.y - 15, 30, 30)

        this.game.ctx.translate(this.x, this.y)
        this.game.ctx.rotate(this.angle)

        this.game.ctx.fillStyle = '#211366'
        this.game.ctx.fillRect(0, -7.5, this.width, this.height)
        this.game.ctx.restore()
    } 
}






