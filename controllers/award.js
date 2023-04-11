const Award = require('../models/award');
exports.addAward = async (req, res, next) => {

    console.log(req.body);
    const { name, image, Year, team } = req.body;
    const new_award = new Award({
        name,
        image,
        Year,
        team
    });
 
    await new_award.save();
    res.status(201).json({
        message: 'Award added successfully',
        Award: new_award
    });
}

exports.getAwards = async (req, res, next) => {
    const Awards = await Award.find();
    res.status(200).json({
        message: 'Awards fetched successfully',
        Awards: Awards
    });
}

exports.getAward = async (req, res, next) => {
    const getAwardId = req.params.id;
    const Award = await Award.findById(getAwardId);
    res.status(200).json({
        message: 'Award fetched successfully',
        Award: Award
    });
}

exports.updateAward = async (req, res, next) => {
}

exports.deleteAward = async (req, res, next) => {
    const deleteAwardId = req.params.id;
    const Award = await Award.findByIdAndDelete(deleteAwardId);
    res.status(200).json({
        message: 'Award deleted successfully',
        Award: Award
    });
}


