require('dotenv').config();

module.exports.index = (req, res) => {
    return res.json({message: 'working'});
};