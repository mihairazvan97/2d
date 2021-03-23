class Bullet{
    game
    x
    y
    width = 10
    height = 10
    color = 'red'

    constructor({x, y, velBullet, game}){
        this.x = x
        this.y = y
        this.velBullet = velBullet
        this.game = game
    }

    step(){
        this.x = this.x + (this.velBullet.x * 5.5)
        this.y = this.y + (this.velBullet.y * 5.5)

        for(let i = 0; i < this.game.obstacles.length; i++){
            for(let j = 0; j < this.game.bullets.length; j++){   
                if(checkCollision(this.game.obstacles[i], this.game.bullets[j]) ||
                    this.game.bullets[j].x < 0 || 
                    this.game.bullets[j].x + this.game.bullets[j].width > this.game.canvas.width ||
                    this.game.bullets[j].y < 0 ||
                    this.game.bullets[j].y + this.game.bullets[j].height > this.game.canvas.height) {
                    this.game.bullets.splice(j, 1) 
                }
            }
            for(let j = 0; j < this.game.fire_enemy.length; j++){   
                if(checkCollision(this.game.obstacles[i], this.game.fire_enemy[j]) ||
                    this.game.fire_enemy[j].x < 0 || 
                    this.game.fire_enemy[j].x + this.game.fire_enemy[j].width > this.game.canvas.width ||
                    this.game.fire_enemy[j].y < 0 ||
                    this.game.fire_enemy[j].y + this.game.fire_enemy[j].height > this.game.canvas.height) {
                    this.game.fire_enemy.splice(j, 1) 
                }
            }
        }


    }
    
    draw(){
        // this.game.ctx.fillStyle = this.color
        // this.game.ctx.fillRect(this.x, this.y, this.width, this.height) 
        
        this.game.ctx.beginPath()
        this.game.ctx.fillStyle = this.color
        this.game.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI)
        this.game.ctx.fill()
        this.game.ctx.strokeStyle = this.color
        this.game.ctx.stroke()
    }
}

