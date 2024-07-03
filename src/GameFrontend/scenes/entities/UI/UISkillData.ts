import { updateFist } from "./SetYPos.js"

type PosX= number
type PosY= number
type Width = number
type Height = number
type Tile  = number
type Title = string
type Descripton = string
type UIConfig = [
    number, Tile, PosX, PosY, Width, Height, Title, Descripton, UIClass[]
]
const startPos = -0.75
const xOffset = 0.15
class UIClass {
    SkillID!: number
    tileNum!: number
    posX!: number
    posY!: number
    width!: number
    height!: number
    title!: string
    skillPointCost: number = 0
    description!: string
    children!:UIClass[]
    parent:UIClass[] = []
    branchHeight: number = 0.3
    branchWidth: number = 0
    updatePos(depth: number) {
        this.posX += depth * xOffset + startPos
        if (this.children.length == 1) {
            this.children[0].parent.push(this)
            this.children[0].posY += this.posY
            this.children[0].updatePos(depth + 1)
        } else if (this.children.length > 0) {
            let yOFfset = this.posY +  this.branchHeight / 2
            for (let i of this.children) {
                i.parent.push(this)
                i.posY += yOFfset
                yOFfset -= this.branchHeight/ (this.children.length - 1)
                i.updatePos(depth + 1)
            }
        }

    }



}
function CreateUIClass(config: UIConfig, branchHeight: number = 0.2) {
    let ui = new UIClass()
    ui.SkillID = config[0]
    ui.tileNum = config[1]
    ui.posX = config[2]
    ui.posY = config[3]
    ui.width = config[4]
    ui.height = config[5]
    ui.title = config[6]
    ui.description = config[7]
    ui.children = config[8]
    ui.branchHeight = branchHeight
    return ui

}
function UIClassInit(skillID: number, tileNum: number, x: number, y:number, width: number, height: number, title: string, description: string, children: UIClass[], branchHeight: number) {
    let ui = new UIClass()
    ui.tileNum = tileNum
    ui.posX = x
    ui.posY = y
    ui.width = width
    ui.height = height
    ui.title = title
    ui.description = description
    ui.children = children
    ui.branchHeight = branchHeight
    return ui

}
const AxeCircle: UIClass = CreateUIClass ([
    13,11,0 ,0,0.10,0.10,"Axe Tornado", "Spins an Axe in a Circle", []
])
const Web: UIClass = CreateUIClass ([
    26,15, 0 , 0 ,0.10, 0.10, "Web", "         Spawns a web \n that slows people down", []
])
const HealBall: UIClass = CreateUIClass ([
    8,16, 0 , 0 ,0.10, 0.10, "Heal Ball","Heals Characters it Hits", []
])
const Snowball: UIClass = CreateUIClass ([
    30, 17, 0 , 0 ,0.10, 0.10, "Snowball", "Launches a Snowball", []
])
const Bandage: UIClass = CreateUIClass ([
    33,6,0 ,0,0.10,0.10, "Bandages", "Drops Bandages that\n      heal the Player", []
])
const Icicle: UIClass = CreateUIClass ([
    16, 18, 0 , 0 ,0.10, 0.10, "Icicle", " Launches a Icicle", []
])
const Barricade: UIClass = CreateUIClass ([
    34,0,0 ,0,0.10,0.10, "Barricade", "Creates a Barricade",[]
])
const AxeEarthQuake: UIClass = CreateUIClass ([
    15,1,0 ,0,0.10,0.10, "Axe tremor", "     An Axe Attack that \n  creates an Earthquake \n   after hitting the ground", [AxeCircle]
])

const Bow: UIClass = CreateUIClass ([
    7, 9,0 ,0,0.10,0.10,"Bow and Arrow", "A Bow that shoots an Arrow", []
])
const Regen: UIClass = CreateUIClass ([
    5,3,0,0,0.10,0.10, "Regeneration", "     Allows Player to \n   Regenerate Health", []
])
const RockThrow: UIClass = CreateUIClass ([
    35,5,0 ,0.05,0.10,0.10, "Rock Throw", "Throws a Rock", [Bow]
])
const MagmaPool: UIClass = CreateUIClass ([
    36, 14, 0 , 0 ,0.10, 0.10, "Magma Pool", "Spawns a Magma Pool that\n    deals damage over time", []
])

const FireballCircle: UIClass = CreateUIClass ([
    37, 19, 0 , 0 ,0.10, 0.10, "Circle of Fireballs", "Creates a Circle of Fireballs\n     that follows the players", []
])
const Rage: UIClass = CreateUIClass ([
    38,7,0 ,0,0.10,0.10, "Rage","Activates Rage Effect that \n Doubles Speed for a while", []
])
const AxeSwing: UIClass = CreateUIClass ([
    12,8,0 ,0.2,0.10,0.10,"Axe Swing","Swings an Axe", [Rage,AxeEarthQuake]
], 0.1)


const KnifeThrow: UIClass = CreateUIClass ([
    10,12,0 ,0,0.10,0.10,"Knife Throw", "Throws a Knife", []
])

const Lightning: UIClass = CreateUIClass ([
    39, 24, 0 , 0 ,0.10, 0.10, "Lightning", "Shoots a Lghtning Bolt", []
])
const BearTrap: UIClass = CreateUIClass (
    [
        25, 4,0 ,0,0.10,0.10,"Bear Trap", "     Creates Bear Trap\n that damages anyone \n      when stepped on", []
    ])
    
const Slowball: UIClass = CreateUIClass ([
    31,25, 0 , 0 ,0.10, 0.10, "Slowball", "Creates a small ball that\n      slows target when hit"
    , [HealBall,Web]
])
const Katana: UIClass = CreateUIClass ([
    40,26, 0 , 0 ,0.10, 0.10, "Katana", "Thrusts Katana ", []
])
const WindSlash: UIClass = CreateUIClass ([
    42,27, 0 , 0 ,0.10, 0.10, "Wind Slash", "      A slash of air\n that cuts enemies", []
])
const Bubble: UIClass = CreateUIClass ([
    43,28, 0 , 0 ,0.10, 0.10, "Basic Fist Attack", "", [Snowball,Icicle]
])
const SwordStab: UIClass = CreateUIClass ([
    44,2,0 ,0,0.10,0.10,"A Basic Sword Stab", "A Sword Thrust ", [Katana,Regen,Barricade]
])
const Fireball: UIClass = CreateUIClass ([
    45, 20, 0 , 0 ,0.10, 0.10, "Fireball", "Launches a Ball of Fire", [FireballCircle,MagmaPool]
])
const FireBlast: UIClass = CreateUIClass ([
    1,21, 0 , 0 ,0.10, 0.10, "Fire Blast", "Launches a large blast\n             of Fire ", [Fireball]
])
const Firebulb: UIClass = CreateUIClass ([
    41,22, 0 , 0 ,0.10, 0.10, "Fire bulb", "Launches a small ball of fire", [FireBlast,Lightning]
])
const EnergyBlast: UIClass = CreateUIClass ([
    20,23, 0 , 0 ,0.10, 0.10, "Energy Blast", "Launches a small blast\n              of Ki", [Firebulb, Bubble,Slowball,WindSlash]
])
const KnifeStab: UIClass = CreateUIClass ([
    11,10,0 ,0.125,0.10,0.10,"Knife Stab", "Sabs with Knife", [Bandage,KnifeThrow,BearTrap]
])
const SwordSwing: UIClass = CreateUIClass ([
    2,2,0 ,-0.1,0.10,0.10,"Sword Swing", "A Basic Sword Swing", [AxeSwing,KnifeStab,RockThrow,SwordStab]
], 0.4)


const Fist: UIClass = CreateUIClass (
[
    0,13, 0,0,0.10,0.10,"A Bsic Punch", "Throws a Punch", 
    [EnergyBlast, SwordSwing]
], 0.6)



function SetY(parentPos: number, childrenCount: number) {
    
}

const UIDATA: UIClass[] = [
    Barricade,        //0
    AxeEarthQuake,
    SwordSwing,
    Regen,
    BearTrap,
    RockThrow,       //5
    Bandage,
    Rage,
    AxeSwing,
    Bow,
    KnifeStab,      //10
    AxeCircle,
    KnifeThrow,
    Fist,
    MagmaPool,
    Web,            //15
    HealBall,
    Snowball,
    Icicle,
    FireballCircle,
    Fireball,       //20
    FireBlast,
    Firebulb,
    EnergyBlast,
    Lightning,Slowball, //25
    Katana, WindSlash, Bubble,SwordStab
]
Fist.updatePos(0)


export {UIDATA}