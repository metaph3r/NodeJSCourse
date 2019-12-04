// const square = function (a) {
//     return a*a
// }

// const square = (a) => {
//     return a*a
// }

// const square = (a) => a * a

// console.log(square(5))

const event = {
    name: 'Birtday party',
    guestList: ['Silvio', 'Sophia', 'Anja', 'Beate'],
    printGuestList() {
        console.log('Guest list for ' + this.name)
        this.guestList.forEach((guest) => {
            console.log(guest + ' is joining ' + this.name)
        })
    }
}

event.printGuestList()