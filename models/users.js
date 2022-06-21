const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    username: {
        type : String,
        require : true,
        unique: true
    },
    password: {
        type: String,
        require : true
    }
}, {timestamps: true})

// CHECK USERNAME AND PASSWORD
userSchema.statics.login = async function(username,password,next) {
    const user = await this.findOne({username})
    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user
        } else {
            return null
        }
    } else {
        return null
    }
}

// BCRYPT PASSWORD BEFORE SAVE
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model("User", userSchema)

module.exports = User