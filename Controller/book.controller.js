import Book from "../Model/book.model.js";

export const getBook = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json(error);
    }
};

export const CreateBook = async (req,res)=>{
    try{
        const { name, title, price,author, category,description} = req.body;

        const newBook = new Book({
            name, title, price, author, category, description,
            image: req.files?.image ? req.files.image[0].path : null,
            fileUrl: req.files?.file ? req.files.file[0].path : null,
            uploadedBy:req.user?._id,
        });
        await newBook.save();
        res.status(201).json({
            message:"Book created successfully",
            book:newBook,
        });
    } catch (error){
        res.status(500).json({
            message:"Server Error",
        })
    }
};

export const getBookById = async (req,res)=>{
    try{
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({
                message:"Book not found",
            });
        }  res.json(200).json(book);
        }catch(error){
            res.status(500).json({
                message:"Server Error",
            })
    }
};

export const deleteBook = async(req,res)=>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(404).json({ message:"Book not found" });
        }
        res.json(200).json({ message:"Book deleted successfully" })
        } catch (error){
            res.status(500).json({
                success:false,
                message:error.message
            });
    }
}

export const updateBook = async(req,res)=>{
    try{
        const {id} = req.params;
        const updates = req.body;
        const updateBook = await Book.findByIdAndUpdate(id,updates,{
            new:true,
            runValidators:true,
        });
        if (!updateBook) {
            return res.status(404).json({
                message:"Book Not Found"
            });
        } res.status(200).json({
            message:"Book Update Successfully",
            book: updateBook,
        })
    } catch (error){
        res.status(500).json({
            message:"Service Error"
        })
    }
}