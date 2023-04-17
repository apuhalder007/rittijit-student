const Team = require('../models/Team');
exports.addTeam = async (req, res, next) => {

    const { name, owner, homeStadium, captain, coach } = req.body;
    const image = req.file.path;
    //console.log("file", req.file);
    const team = new Team({
        name,
        image,
        owner,
        homeStadium,
        captain,
        coach
    });
    await team.save();
    res.status(201).json({
        message: 'Team added successfully',
        team: team
    });
}

exports.getTeams = async (req, res, next) => {
    const teams = await Team.find();
    res.status(200).json({
        message: 'Teams fetched successfully',
        teams: teams
    });
}

exports.getTeam = async (req, res, next) => {
    const getTeamId = req.params.id;
    const team = await Team.findById(getTeamId);
    res.status(200).json({
        message: 'Team fetched successfully',
        team: team
    });
}

exports.updateTeam = async (req, res, next) => {
}

exports.deleteTeam = async (req, res, next) => {
    const deleteTeamId = req.params.id;
    const team = await Team.findByIdAndDelete(deleteTeamId);
    res.status(200).json({
        message: 'Team deleted successfully',
        team: team
    });
}


