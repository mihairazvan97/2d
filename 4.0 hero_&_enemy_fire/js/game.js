class Game {
    canvas
    ctx
    gameLoop
    hero
    obstacles = []
    bullets = []
    
    //
    enemy = []
    fire_enemy = []  
    
    // Controlls
    upPress
    rightPress
    leftPress
    downPress
    
    constructor() {
        this.start = this.start.bind(this)
        this.registerKeyPressEvents = this.registerKeyPressEvents.bind(this)
        this.step = this.step.bind(this)
        this.draw = this.draw.bind(this)
        this.start()
    }

    /**
     * Start
     */
    start() {
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = 500
        this.canvas.height = 300

        //add keyboard event
        this.registerKeyPressEvents()

        //add hero
        this.hero = new Hero({ x: 40, y: 1, game: this })        

        //add enemy
        for(let i = 0; i < 5; i++){
            this.enemy.push(new Enemy({
                x: 0 + 250 * i,
                y: 25,
                game: this
            }))
        }
        this.auto_shoot()
        //add obstaclecs
        for (let i=0; i<100; i++) {
            this.obstacles.push(new Obstacle({
                x: 0 + 25 * i,
                y: 275,
                width: 25,
                height: 25,
                type: 1,
                game: this,
            }))
        }

        for (let i=0; i<100; i++) {
            this.obstacles.push(new Obstacle({
                x: 0 + 25 * i,
                y: 265,
                width: 25,
                height: 10,
                type: 2,
                game: this,
            }))
        }

        for (let i=0; i<20; i++) {
            this.obstacles.push(new Obstacle({
                x: -100 + 125 * i,
                y: 215,
                width: 30,
                height: 50,
                type: 1,
                game: this,
            }))
        }       

        // create game loop
        this.gameLoop = setInterval(this.step, 1000/60)

        //draw canvas background
        this.ctx.fillStyle = '#f4f9f9'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }// END start method

    /**
     *  registerKeyPressEvents method
     */
    
    registerKeyPressEvents() {
        document.addEventListener('keydown', event => {
            if  (event.code === 'KeyW' && this.upPress || event.code === 'ArrowUp' && this.upPress) {
                this.hero.vel.y = -11
                this.upPress = false
            } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                this.rightPress = true
            } else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                this.leftPress = true
            } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
                this.downPress = true
            }
        })//END keydown event
    
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyD' || event.code === 'ArrowRight') {
                this.rightPress = false
            } else if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
                this.leftPress = false
            } else if (event.code === 'KeyS' || event.code === 'ArrowDown') {
                this.downPress = false
            }
        })//END keyup event

        //create bullet area
        document.addEventListener('click', event =>{
            const angle = Math.atan2(
                event.clientY - this.hero.y,
                event.clientX - this.hero.x
            ) 
            const velBullet = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }

            this.bullets.push(new Bullet({
                x: this.hero.x,
                y: this.hero.y,
                velBullet,
                game: this
            }))
        })//END click event

        // document.addEventListener('mousemove', (event) =>{
        //     this.mouseX = event.x
        //     this.mouseY = event.y

        //     var dx = this.mouseX - this.turret.x
        //     var dy = this.mouseY - this.turret.y
        //     this.turret.angle = Math.atan2(dy, dx)

        // })

    }//END registerKeyPressEvents method

    auto_shoot(){
        let angle = 0
        let velBullet = 0
        let distance = 0
        
        for(let i = 0; i < this.enemy.length; i++){
            angle = Math.atan2(
                this.hero.y - this.enemy[i].y,
                (this.hero.x + this.hero.width /2) - this.enemy[i].x
            ) 
            velBullet = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }

            
            distance =  Math.sqrt(
                Math.pow((this.hero.x + this.hero.width /2) - this.enemy[i].x, 2) +
                Math.pow(this.hero.y - this.enemy[i].y, 2)
                )
              
           
            if(distance < this.canvas.height){
                this.fire_enemy.push(new Bullet({
                    x: this.enemy[i].x,
                    y: this.enemy[i].y,
                    velBullet,  
                    game: this
                }))
            }
        
        }//END for loop
         

    }//END auto_shoot
   
    /**
     * Step method
     */
    step() {
        this.hero.fire()
        this.hero.step()
        this.enemy.forEach(t => t.step())
        this.bullets.forEach(b => b.step())
        this.fire_enemy.forEach(fe => fe.step())   
        this.draw()  
    }//END step method
    
    


    /**
     * Draw method
     */
    draw() {
        this.ctx.fillStyle = '#f4f9f9' // clear canvas
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height) // clear canvas
        this.bullets.forEach(b => b.draw())
        this.fire_enemy.forEach(fe => fe.draw())
        this.hero.draw() // call function draw from Hero constructor
        this.enemy.forEach(t => t.draw())
        this.obstacles.forEach(o => o.draw())        
    }//END draw method

}//END Game constructor