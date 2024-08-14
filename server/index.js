const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const RegisterModel = require('./models/register');
const AddempModel = require('./models/addemp');
const ViewempModel = require('./models/viewemp');

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

mongoose.connect('mongodb://localhost:27017/employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// login

app.post("login",(req, res)=>{
  const{email,password}=req.body;
  RegisterModel.findOne({email: email})
  .then(user =>{
    if(user){
      if(user.password == password){
        res.json("success")
    }else{
      res.json("error")
    }
  }else{
    res.json("not register")
  }
  })
})


// ************************register********************

app.post('/registers', (req, res) => {
  const { name, email, password } = req.body;
  RegisterModel.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("already have an account");
      } else {
        RegisterModel.create({ name, email, password })
          .then(result => res.json("Account created"))
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.json(err));
});


// ********************Employee ADD********************
app.post('/addemps', upload.single('image'), (req, res) => {
  const { name, email, contact, designation, gender, courses } = req.body;
  const image = req.file ? req.file.path : null;

  AddempModel.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("User already exists");
      } else {
        AddempModel.create({
          name,
          email,
          contact,
          designation,
          gender,
          courses,
          image
        })
          .then(result => res.json("Employee added successfully"))
          .catch(err => res.status(500).json(err));
      }
    })
    .catch(err => res.status(500).json(err));
});

// *****************display******************

app.get('/addemps', (req, res) => {
  ViewempModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});




app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
