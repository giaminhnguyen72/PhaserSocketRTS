import { UIDATA } from "./UISkillData.js";


export function updateFist() {
    let index = 0
    let branchLocation = 0
    updateSwordSwing(branchLocation + 0.3)
    updateEnergyBlast(branchLocation - 0.3)
    updateBubble(branchLocation + 0.5)
}
function updateSwordSwing(loc: number) {
    UIDATA[2].posY = loc
    updateAxeSwing(loc - 0.2)
    updateKnifeStab(loc )
    updateRockThrow(loc +  0.2 )
    updateSwordStab(loc + 0.4)
    
}
function updateRockThrow(loc: number) {
    let index = 5
    UIDATA[index].posY = loc
    // BOW
    UIDATA[9].posY = loc

}

function updateAxeSwing(loc: number) {
    let index = 8
    UIDATA[index].posY = loc

    //Rage
    UIDATA[7].posY = loc - 0.15
    //ax Earthquake
    UIDATA[1].posY = loc - 0
    //Axe ullswing
    UIDATA[2].posY = loc + 0.15


}

function updateKnifeStab(loc: number) {
    let index = 8
    UIDATA[index].posY = loc

    // Create Banages
    UIDATA[10].posY = loc - 0.15
    //StaffSwing
    //UIDATA[1].posY = loc - 0
    // Knife Throw
    UIDATA[12].posY = loc 
    
    //BearTrap
    UIDATA[4].posY = loc

    


}

function updateSwordStab(loc: number) {
    let index = 29
    UIDATA[index].posY = loc

    // Regen
    UIDATA[3].posY = loc - 0.1
    
    //BearTrap
    UIDATA[4].posY = loc 

    
    UIDATA[27].posY = loc + 0.1
}
function updateEnergyBlast(loc: number) {
    let index = 23
    UIDATA[index].posY = loc
    updateFirebulb(loc - 0.1)

    updateSelfSlowHeal(loc + 0.1)
    //Wind Slash
    UIDATA[27].posY = loc + 0.2
}

function updateFirebulb(loc: number) {
    let index = 22
    UIDATA[index].posY = loc

    //Firebolt

    updateFirebolt(loc - 0.1)
    //Lightning
    UIDATA[24].posY = loc + 0.1

}
function updateFirebolt(loc: number) {
    let index = 21
    UIDATA[index].posY = loc

    //Fireball
    UIDATA[20].posY = loc + 0.2
    //Lightning
    UIDATA[24].posY = loc +  0.1


    //FireField
    UIDATA[14].posY = loc + 0.2 - 0.1
    


}

function updateBubble(loc: number) {
    let index = 28
    UIDATA[index].posY = loc
    //Snowball
    UIDATA[17].posY = loc 
}

function updateSelfSlowHeal(loc: number) {
    let index = 25
    UIDATA[index].posY = loc

    //Web
    UIDATA[15].posY = loc -0.1
    //Heal ball
    UIDATA[16].posY = loc - 0

}

