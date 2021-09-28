const updateProfile = (req, res) => {
    console.log('aqui');
    res.status(200).json(req.body);
}

module.exports = updateProfile 