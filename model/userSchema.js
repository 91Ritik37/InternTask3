const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
    }
)

module.exports = User = mongoose.model("User", userSchema)