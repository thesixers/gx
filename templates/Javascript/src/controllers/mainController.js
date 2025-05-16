/***** genesix *****/

const homePage = (req,res) => {
    res.sendFile('index.html')
}

module.exports = { homePage }