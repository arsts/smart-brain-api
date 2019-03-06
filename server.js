const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=> {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
   // Load hash from your password DB.
   bcrypt.compare(myPlaintextPassword, hash).then(function (res) {
       // res == true
   });
   bcrypt.compare(someOtherPlaintextPassword, hash).then(function (res) {
       // res == false
   });
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log(hash);
        
    });
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
           found = true; 
           return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })  
    if (!found) {
        res.status(400).json('not found')
    }
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})



