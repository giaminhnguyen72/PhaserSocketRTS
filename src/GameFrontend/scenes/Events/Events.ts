export class Collision {
    // Event between two colliders
    collided: [number, number]
    type: [Collider, Collider]
    constructor(one: number = 0, two:number = 0,c1: Collider  = {}, c2: Collider = {}) {
        this.collided = [one, two]
        this.type = [c1,c2]
    }

}
interface Collider {
    
}
interface TypeFinder{
    accept(t: TypeFinder): void
}

interface Projectile {
    accept(t: TypeFinder): void
}
interface Character {
    accept(t: TypeFinder): void
}
export class HandleCollisionEvent {
    handleProjectile(p: Projectile, c: Character| Projectile) {

    }
    handleCharacter(c: Character, o: Character | Projectile) {

    }
}
class FireBall implements Projectile {
    accept(t: TypeFinder): void {
        let e = new HandleCollisionEvent()
        e.handleProjectile(this,t)
        
    }
}

