const users = []

/**
 * Add user to users array
 *
 * @param {Number} id Unique ID of the user
 * @param {String} username Username
 * @param {String} room Room name
 */
const addUser = (id, username, room) => {
    // clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // validate the data
    if (!username || !room)
        return { error: 'Username and room are required!' }

    // check for existing user
    const existingUser = users.find(user => user.room === room && user.username === username)

    // validate username
    if (existingUser)
        return { error: 'Username is already in use!' }

    // store user
    const user = { id, username, room }
    users.push(user)
    return user
}

/**
 * remove user from users array
 * 
 * @param {Number} id ID of the user to remove
 */
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    if (index != -1)
        return users.splice(index, 1)[0]
}