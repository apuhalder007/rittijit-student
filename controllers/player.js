const Player = require('../models/player');
exports.addPlayer = (req, res, next) => {
    const { name, image, role, age, country, runs, wickets, team } = req.body;
    const player = new Player({
        name,
        image,
        role,
        age,
        country,
        runs,
        wickets,
        team
    });
    player.save()
        .then(result => {
            res.status(201).json({
                message: 'Player added successfully',
                player: result
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getPlayers = async (req, res, next) => {
    const players = await Player.find();
    res.status(200).json({
        message: 'Players fetched successfully',
        players: players
    });
}

exports.getPlayer = async (req, res, next) => {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);
    res.status(200).json({
        message: 'Player fetched successfully',
        player: player
    });
}

exports.updatePlayer = async (req, res, next) => {
    const playerId = req.params.id;
    const { name, image, role, age, country, runs, wickets, team } = req.body;

}

exports.deletePlayer = async (req, res, next) => {
    const playerId = req.params.id;
    const player = await Player.findByIdAndDelete(playerId);
    res.status(200).json({
        message: 'Player deleted successfully',
        player: player
    });
}