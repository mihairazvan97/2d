class Hero {
    x = 0 
    y = 0
    width = 25
    height = 25
    color = "#2d4059"
    speed = 3
    gravity = 0.7
    maxYvel = 11
    vel = {y: 0}
    game
    max_count = 40 
    count = 0

    newX = 0

    constructor({ x, y, game }) {
        this.x = x
        this.y = y
        this.game = game
    }

    /**
     * Game Over method
     */
    game_over(){
        this.game.fire_enemy.forEach(fire_e =>{ 
            let game_over_a = document.getElementById('game_over')
            if(checkCollision(this, fire_e)){
                clearInterval(this.game.gameLoop)
                game_over_a.style.display = 'block'
                  
            }
        })
    }
        
    cameraMod() {
        if(this.x + this.width > this.game.canvas.width / 2 + 50){
            this.x = this.game.canvas.width / 2 + 50 - this.width
            this.game.obstacles.forEach(obs =>{
                obs.x -= this.speed
            })
            this.game.bullets.forEach(b =>{
                b.x -= this.speed
            })
            this.game.fire_enemy.forEach(fe =>{
                fe.x -= this.speed
            })
            this.game.enemy.forEach(t =>{
                t.x -= this.speed
            })
            
        }else if(this.x < this.game.canvas.width / 2 - 75){
            this.x = this.game.canvas.width / 2 - 75
            this.game.obstacles.forEach(obs =>{
                obs.x += this.speed
            })
            this.game.bullets.forEach(b =>{
                b.x += this.speed
            })
            this.game.fire_enemy.forEach(fe =>{
                fe.x += this.speed
            })
            this.game.enemy.forEach(t =>{
                t.x += this.speed
            })
            
        }
    }

    /**
     * Enemy deley fire
     */
    fire(){
        this.count ++
        if(this.count > this.max_count){
            this.count = 0
            
                this.game.auto_shoot()
        
            
        }
    }

    step() {
        this.game.hero.game_over()
        this.game.hero.cameraMod()
        /**
         * Set gravity
         */
        this.vel.y += this.gravity
        if (this.vel.y > this.maxYvel) {
            this.vel.y = this.maxYvel
        }
        this.y += this.vel.y
    
        /**
         * Jump it's posible when vel.y = 0
         */
        if (this.y + this.height + this.vel.y > this.game.canvas.height) {
            this.game.upPress = true
        }


        // When hero it's over obstacle, that can jump
        this.game.obstacles.forEach(obs => {
            if(checkCollision(this, obs) && this.y + this.height > obs.y && this.vel.y > 0){
                this.y = obs.y - this.height
                this.vel.y = 0
                this.game.upPress = true
            }
            // Hero head collision with botton of obstacles
            if(checkCollision(this, obs) && this.y > obs.y - obs.height){
                this.y = obs.y + obs.height
                this.vel.y = 0.1
            }
            
    
        });

        //Movement to right / left
        
        if (this.game.leftPress) {
            this.x = this.x - this.speed
            //alert("GAME OVER")
            // document.location.reload()
            //clearInterval(this.game.gameLoop)
             
        }
        if (this.game.rightPress) {
            this.x = this.x + this.speed
        }
        


        /**
         * Hero collision with obs, part right of obstacles && part left of obstacles
         */
        this.newX = this.x
        this.game.obstacles.forEach(obs =>{
            if(checkCollision(this, obs) && this.game.rightPress){
                this.newX = this.newX - this.speed 
                this.x = this.newX
            } 
            if(checkCollision(this, obs) && this.game.leftPress){
                this.newX = this.newX + this.speed
                this.x = this.newX
            }
        });

         // Canvas margin
         if (this.x < 0) {
            this.x = 0
        }
        if (this.x + this.width > this.game.canvas.width) {
            this.x = this.game.canvas.width - this.width
        }
        if (this.y < 0) {
            this.y = 0
        }
        if (this.y + this.height > this.game.canvas.height) {
            this.y = this.game.canvas.height - this.height
        }
        

        this.game.fire_enemy.forEach(fire_e =>{           
            if(checkCollision(this, fire_e) ){               
                //console.log('lovit')
            }
        })
        
    }

    /**
     * Draw
     */
    draw() {
        this.game.ctx.fillStyle = this.color
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
