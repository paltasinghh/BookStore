import express from "express";
import upload from "../Middlewares/upload.js"

import { getBook,CreateBook,getBookById,deleteBook,updateBook } from "../Controller/book.controller.js";

const router = express.Router();

router.post ("/",upload.fields([
    {name:"image", maxCount:1},
    {name:"file",maxCount:1},
]),
CreateBook);
router.get("/", getBook);
router.put("/:id",updateBook);
router.get("/:id",getBookById);
router.delete("/:id",deleteBook);

export default router;
