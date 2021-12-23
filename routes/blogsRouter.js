const express = require("express");
const bodyParser = require("body-parser");
const blogsCtrl = require("../controllers/blogsCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const authDoctor = require("../middleware/authDoctor");

const router = express();
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/postBlog", auth, authDoctor, blogsCtrl.postBlog);
router.get("/getAllBlogs", blogsCtrl.getAllBlogs);
router.get("/blog/:id", blogsCtrl.getBlog);
router.post('/rateBlog', auth,blogsCtrl.rateBlog)
router.delete("/delete/:id", blogsCtrl.deleteBlog);

module.exports = router;
