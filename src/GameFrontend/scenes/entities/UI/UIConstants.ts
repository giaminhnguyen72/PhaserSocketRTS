type Offsets = {pos:[number, number], dim: [number,number]}
const Barricade:Offsets = {pos: [0,0], dim: [64,64]}
const AxeEarthQuake:Offsets = {pos: [0,0.1], dim: [64,64]}
const SwordSwing:Offsets = {pos: [0,0.2], dim: [64,64]}
const Regen:Offsets = {pos: [0,0.3], dim: [64,64]}
const BearTrap:Offsets = {pos: [0,0.4], dim: [64,64]}
const RockThrow:Offsets = {pos: [0,0.525], dim: [32,32]}
const Bandage:Offsets = {pos: [0,0.6], dim: [32,32]}
const Rage:Offsets = {pos: [0,0.65], dim: [32,32]}
const AxeCircle:Offsets = {pos: [0,0.7], dim: [32,32]}
const Bow:Offsets = {pos: [0,0.75], dim: [32,32]}
const KnifeStab:Offsets = {pos: [0,0.8], dim: [32,32]}
const AxeSwing:Offsets = {pos: [0,0.85], dim: [32,32]}
const KnifeThrow:Offsets = {pos: [0,0.9], dim: [32,32]}
const Fist:Offsets = {pos: [0,0.95], dim: [32,32]}


const MagmaPool:Offsets = {pos: [0.1,0], dim: [64,64]}
const Web:Offsets = {pos: [0.1,0.1], dim: [64,64]}
const HealBall:Offsets = {pos: [0.1,0.2], dim: [64,64]}
const Snowball:Offsets = {pos: [0.1,0.3], dim: [64,64]}
const Icicle:Offsets = {pos: [0.1,0.4], dim: [64,64]}
const FireballCircle:Offsets = {pos: [0.05,0.5], dim: [64,64]}
const Fireball:Offsets = {pos: [0.05,0.6], dim: [64,64]}
const FireBlast:Offsets = {pos: [0.05,0.7], dim: [64,64]}
const Firebulb:Offsets = {pos: [0.05,0.8], dim: [64,64]}
const EnergyBlast:Offsets = {pos: [0.05,0.9], dim: [64,64]}




const Lightning:Offsets = {pos: [0.15,0.5], dim: [64,64]}
const Slowball:Offsets = {pos: [0.15,0.6], dim: [64,64]}
const Katana:Offsets = {pos: [0.15,0.7], dim: [64,64]}
const WindSlash:Offsets = {pos: [0.15,0.8], dim: [64,64]}
const Bubble:Offsets = {pos: [0.15,0.9], dim: [64,64]}



const UIOFFSETS : Offsets[] = [
    Barricade,
    AxeEarthQuake,
    SwordSwing,
    Regen,
    BearTrap,
    RockThrow, //5
    Bandage,
    Rage,
    AxeSwing,
    Bow,
    KnifeStab,   //10
    AxeCircle,
    KnifeThrow,
    Fist,       //13
    MagmaPool,
    Web,      //15
    HealBall,
    Snowball,
    Icicle,
    FireballCircle,
    Fireball,       //20
    FireBlast,
    Firebulb,
    EnergyBlast,
    Lightning,
    Slowball,      //25
     Katana, 
    WindSlash,
     Bubble,
]
export {UIOFFSETS}