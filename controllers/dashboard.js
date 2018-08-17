let api = {};
api.index = (req, res) => {
    res.json({
        status: 'success',
        mesage: 'Hello world'
    })
}

module.exports = api;