const Book = require('../models/book');

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
        books: books,
        message: 'Books fetched successfully'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getBook = async (req, res) => {
    try {
        const book = await Book.find({ _id: req.params.id});
        res.status(200).json({
        book,
        message: 'Book fetched successfully'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getBooksByCategory = async (req, res) => {
    try {
        const books = await Book.find({ category: req.params.id }).populate('category');
        res.status(200).json({
        books: books,
        message: 'Books fetched successfully'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.searchBooks = async (req, res) => {
    try {
        const books = await Book.find({
            $or: [
              { name: { $regex: req.params.term, $options: "i" } },
              { author: { $regex: req.params.term, $options: "i" } },
              { publisher: { $regex: req.params.term, $options: "i" } },
            ],
          })
        res.status(200).json({
        books: books,
        message: 'Books fetched successfully'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.addBook = async (req, res) => {
    try{
        const { name, author, publisher, category } = req.body;
        const book = new Book({
            name,
            author,
            publisher,
            category
        });

        await book.save();
        res.status(201).json({ message: 'Book added successfully' });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
    
}

exports.updateBook = async (req, res) => {
    const _id = req.params.id;
    const { name, descriptions, author, publisher, category, status } = req.body;
    try{
        const bookUpdate = await Book.findByIdAndUpdate(_id, {
            name,
            descriptions,
            author,
            publisher,
            category,
            status
        });

        res.status(201).json({ 
            message: 'Book updated successfully' ,
            book: bookUpdate
        });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
} 

exports.deleteBook = async (req, res) => {
    const _id = req.params.id;
    try{
        const bookDelete = await Book.findByIdAndDelete(_id);
        res.status(201).json({ 
            message: 'Book deleted successfully' ,
            book: bookDelete
        });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}
