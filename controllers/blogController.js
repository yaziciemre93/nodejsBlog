const Blog = require("../models/blogs")

const blog_get = (req,res) => {
    Blog.find().sort({createdAt : -1})
    .then((result) => {
        res.render("index", {title: "Anasayfa",blogs : result})
    })
    .catch((err) => {console.log(err);})
}

const blog_getOne = (req,res) => {
    const id = req.params.id

    Blog.findById(id)
    .then((result) => {
        res.render("blog",{blog: result, title:"Detay"})
    })
    .catch((err) => {
        res.render("404")
    })

}

module.exports= {
    blog_get,
    blog_getOne
}