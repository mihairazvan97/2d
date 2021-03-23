/**
 * Check collision
 * 
 * @param {Object} obj1 
 * @param {Object} obj2
 * @returns {Boolean}
 */
function checkCollision(obj1, obj2) {
    if (
        obj1.x + obj1.width > obj2.x &&
        obj1.x < obj2.x + obj2.width &&
        obj1.y + obj1.height > obj2.y &&
        obj1.y < obj2.y + obj2.height
    ) {
        return true;
    } else {
        return false;
    }

}

function game_over_click(){
    let gm = newFunction()
    return new Game

    function newFunction() {
        return document.getElementById('game_over').style.display = 'none'
    }
}
window.onload = () => {//start onload function
    window.__GAME__ = new Game()
}//END onload function