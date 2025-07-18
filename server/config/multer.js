import multer from "multer";

// creates a storage engine that saves files to the disk.
// Multer will use default behavior for destination and filename
const storage=multer.diskStorage({})

// Initializes Multer middleware.
const upload=multer({storage})

export default upload;