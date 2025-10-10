import multer from "multer";
import path from "path";

const storege = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.mimetype.startsWith("image/")){
        cb(null,"uploads/image/");
        } else{
            cb(null,"uploads/books/")
        }
    },
    filename:(req,file,cb)=>{
       cb(
        null,
        DataTransfer.new() + file.fieldname + path.extname(file.originalname)
       ); 
    },
});

const fileFilter = (req,file,cb)=>{
    const allowedFileTypes =[
        "image/jpeg",
        "image/png",
        "appliaction/pdf",
        "application/epub+zip",
    ];
    if (allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    } else{
        cb(new Error("Invalid file type!"),false);
    }
};

const upload = multer({
    storage: fileFilter,
});

export default upload;