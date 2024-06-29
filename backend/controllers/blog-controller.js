const Mongoose = require("mongoose");
const Blog = require("../model/Blog");
const User = require("../model/User");

const getAllblogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate('user');
    } catch (err) {
        return console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "blog not found" })
    }
    return res.status(200).json({ blogs })
}

const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        const session = await Mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog); //blogs get From User.js
        await existingUser.save({ session });
        await session.commitTransaction();
        session.endSession();

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }

    return res.status(200).json({ blog });
};

const updateBlog = async (req, res, next) => {
    const { title, description, image } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
            image
        })
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to update the blog" })
    }
    return res.status(200).json({ blog })
}

const getById = async (req, res, next) => {
    const id = req.params.id;
    
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "No blog found" })
    }
    return res.status(200).json({ blog })
}

/*const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return console.log(err)
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
}*/
const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        // Find the blog by id and populate the user field
        blog = await Blog.findById(id).populate('user');
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Remove the blog from the user's blogs array
        await blog.user.blogs.pull(blog._id);
        await blog.user.save();

        // Delete the blog
        await Blog.findByIdAndDelete(id);

        return res.status(200).json({ message: "Successfully Deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unable to delete the blog" });
    }
};

const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blogs');
    } catch (err) {
        return console.log(err);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "no blog found" })
    }
    return res.status(200).json({ user: userBlogs })
}


exports.getAllblogs = getAllblogs;
exports.addBlog = addBlog;
exports.updateBlog = updateBlog;
exports.getById = getById;
exports.deleteBlog = deleteBlog;
exports.getByUserId = getByUserId;