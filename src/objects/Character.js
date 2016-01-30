export default class Character {

      constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.life = 1;
        this.armor = 1;
        this.agility = 1;
        this.attackSpeed = 1;
        this.isAttacking = false;
      }

      isWalking(){
        return this.animation.sprite.body.velocity.x != 0;
      }

      isAlive(){
        return this.life > 0;
      }

      update(game,system) {
          if (!!this.animation){
            game.physics.arcade.collide(this.animation.sprite,system.colliders,(spriteA,spriteB)=>{
                  if (spriteB != spriteA && !!this.behaviour)
                      this.behaviour.trigger(this,system.getCollidersEntity(spriteB));
                  return true;
            },null,this);
          }

          if (!!this.behaviour && this.isAlive())
            this.behaviour.update(this,game,system);
      }

      stop() {
        if (!!this.animation){
            this.animation.stop();
            if (!!this.animation.sprite.body)
              this.animation.sprite.body.velocity.x = 0;
        }
      }

      walk(speed){
        if (this.isAlive() && !this.isAttacking) {
          if (!!this.animation) {
            if (!!this.animation.sprite.body){
              this.animation.sprite.body.velocity.x = 30*speed*this.agility;
              this.x = this.animation.sprite.x;
              this.animation.walk(this.animation.sprite.body.velocity.x);
            } else {
              this.x += speed*this.agility;
              this.animation.sprite.x = this.x;
              this.animation.walk(speed*this.agility*30);
            }
          }
        }
      }

      attack(){
        if (!!this.animation && this.isAlive() && !this.isAttacking){
          this.animation.attack();
          this.isAttacking = true;
          const that=this;
          setTimeout(function () {
            that.isAttacking = false;
          }, 1000/this.attackSpeed);
        }
      }

      damage(amount){
        this.life -= amount*this.armor;
        if (!this.isAlive()){
          this.stop();
          this.animation.die();
        }
      }

}
