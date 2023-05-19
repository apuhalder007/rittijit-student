const Article = require('../models/Article');

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('author').populate('category');
        res.status(200).json({
            articles: articles,
            message: 'Articles fetched successfully'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

exports.getArticle = async (req, res) => {
    try {
        
        const getArticleId = req.params.id;
        const article = await Article.findById(getArticleId).populate('author').populate('category');
        res.status(200).json({
            message: 'Article fetched successfully',
            article: article
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.addArticle = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const image = req.file.path;
        const userId = req.user.id;
        const article = new Article({
            title,
            content,
            image,
            category,
            author: userId 
        });

        await article.save();
        res.status(201).json({ 
            message: 'Article added successfully',
            article: article
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateArticle = async (req, res) => {
    try{
        const updateArticleId = req.params.id;
        const { title, content, category } = req.body;
        const image = req.file.path;
        const article = await Article.findByIdAndUpdate(updateArticleId, {
            title,
            content,
            image,
            category
        });
        res.status(200).json({
            message: 'Article updated successfully',
            article: article
        });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
    
}

exports.deleteArticle = async (req, res) => {
    try{
        const deleteArticleId = req.params.id;
        const article = await Article.findByIdAndDelete(deleteArticleId);   
        res.status(200).json({
            message: 'Article deleted successfully',
            article: article
        });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
    
}
