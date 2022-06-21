const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const Blog = require("./models/blogs")
const User = require("./models/users")
const adminRoutes = require("./routes/adminRoutes")
const blogRoutes = require("./routes/blogRoutes")
const authRoutes = require("./routes/authRoutes")
const {requireAuth, checkUser} = require("./middlewares/authMiddleware")
const { render } = require("ejs")
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

const dbURL = "mongodb+srv://admin-blog:admin1234@cluster0.s8yr4.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURL)

app.listen(3000)

app.use(morgan("tiny"))
app.use(cookieParser())


app.get("*",checkUser)
app.get("/", (req,res) => {
    res.redirect("/blog")
})

app.use("/",authRoutes )
app.use("/blog",blogRoutes)
app.use("/admin",requireAuth,adminRoutes)

app.get("/about", (req,res) => {
    res.render("about" , {title: "Hakkımızda"})

})

app.use((req,res) => {
    res.render("404")
})