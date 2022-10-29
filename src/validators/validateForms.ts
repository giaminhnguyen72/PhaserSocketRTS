export function validateRoomName(name: string): boolean {
    //validate for escape characters

    if (name == null || name.length <= 0) {
        console.log("error")
        return false
    } else {
        console.log(name)
        return true
    }
}
export function validateName(name:String):boolean {
    if (name == null || name.length <= 0) {
        console.log("error")
        return false
    } else {
        console.log(name)
        return true
    }
}