const express = require("express");
const { getAllblogs, addBlog, updateBlog, getById, deleteBlog, getByUserId } = require("../controllers/blog-controller");

const blogrouter = express.Router();

blogrouter.get("/", getAllblogs);
blogrouter.post("/add", addBlog);
blogrouter.put("/update/:id", updateBlog);
blogrouter.get("/:id", getById);
blogrouter.delete("/:id", deleteBlog);
blogrouter.get("/user/:id", getByUserId);

module.exports = blogrouter;
