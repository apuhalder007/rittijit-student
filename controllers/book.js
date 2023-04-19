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
