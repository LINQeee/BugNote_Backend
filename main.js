const MysqlServiceClass = require('./Services/MysqlService').MysqlService;
const express = require('express');
const bodyParser = require('body-parser');

let mysqlService = new MysqlServiceClass();

mysqlService.setup();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    bodyParser.json();
    next();
});

app.post('/user', (req, res) => {
    const userData = req.body;

    mysqlService.createUser(userData).then(result => {
        res.json({message: 'Created user', sqlData: result});
    })
        .catch((error) => {
            res.json(error);
        });
});

app.post('/users-contains', bodyParser.text({type: 'text/*'}), (req, res) => {
    const containsString = req.body;

    mysqlService.getUsersWithStringInName(containsString).then((result) => {
        res.json(result);
    })
        .catch((error) => {
            res.json(error);
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});