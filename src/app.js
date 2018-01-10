const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const pg = require('pg')
const pug = require('pug')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const sightengine = require('sightengine')("73493561", "EPXTnQqzEPV4TPKWvNTY");
const ce = require('colour-extractor')
const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  projectId: "flavornote-191619",
  keyFilename: './flavornote-60fedd8be4a4.json',
  key: 'AIzaSyBw1NqrQFdihd0LJTNGpR_fyZ3B095IhgU'
});

const database = new Sequelize('flavorappdb', process.env.POSTGRES_USER, null, {
    host: 'localhost',
    dialect: 'postgres'
});

const app = express()

// Creates a client

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
    secret: "Your secret key",
    resave: true,
    saveUninitialized: false
}))


//DEFINITION OF TABLES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var User = database.define('users', {
    username: {
        type: Sequelize.STRING,
        unique: true,

    },
    fname: {
    	type:Sequelize.STRING
    },
    lname: {
    	type:Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
    }

}, {
    timestamps: false
});

var Recipe = database.define('recipes', {
	name: {
		type:Sequelize.STRING,
		unique: true
	},
	// uuid: {
 //    	type: Sequelize.UUID,
 //    	primaryKey: true
 //  }
})


var Ingredient = database.define('ingredients', {
	name: {
		type: Sequelize.STRING
	}

}, {
    timestamps: false
});

var Method = database.define('methods', {
	recipeID: {
		type: Sequelize.UUID,
		primaryKey: true
	},
	stepNumber: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	}
})



var RecipeIngredients = database.define('recipeingredients', {
	recipeID: {
		type: Sequelize.UUID,

	},
	ingredientID: {
		type: Sequelize.UUID
	},
	qty: {
		type: Sequelize.STRING
	}
});

database.sync({force: true})


//RELATIONSHIPS BETWEEN TABLES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Recipe.hasMany(Ingredient);
Ingredient.belongsTo(Recipe);   //belongsTo adds the UUID (of eg. recipe) to the ingredient table
User.hasMany(Recipe);
Recipe.belongsTo(User);
Method.belongsTo(Recipe);

//ROUTES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//GET 	- RENDER HOMEPAGE (CONTAINS LOGIN AND REGISTER FORMS)

app.get('/', (req, res) =>{
	res.render('index')
});



app.post ('/vision', (req,res)=>{
    var ingredientImage = req.body.imgUrl
    
    // ce.topColours(ingredientImage, true, function (colours) {
    // console.log(colours);
    // res.send(colours)
    // });

    // sightengine.check(['properties']).set_url(ingredientImage)
    // .then(function(result) {
    //     console.log(result)
    //     res.json(result)
    // })
    // .catch(function(err) {
    //     // handle the error
    // });


    client
      .imageProperties(`${ingredientImage}`)
      .then(results => {
        const properties = results[0].imagePropertiesAnnotation;
        const colors = properties.dominantColors.colors;
        colors.forEach(color => 
            console.log(color));
            res.send(colors)
      })
      .catch(err => {
        console.error('ERROR:', err);
      });

    
})





app.listen(3000, function() {
    console.log("Listening on port 3000")
})


// //POST   - REGISTER USER

// app.post('/register', (req, res) =>{

//     const password = req.body.password

//     bcrypt.hash(password, 8, function(err, hash) {
//         if (err !== undefined) {
//             console.log(err)
//         } else {
//             User.create({
//                     username: req.body.username,
//                     fname:req.body.fname,
//                     lname:req.body.lname,
//                     email: req.body.email,
//                     password: hash
//                 })
//                 .then(function() {
//                     res.redirect('/')
//                 }).catch(err => {
//                     console.error(err)
//                 })
//         }
//     })
// })

// app.post('/login', (req, res) => {

//     const username = req.body.username
//     const password = req.body.password

//     User.findOne({
//             where: {
//                 username: username
//             }
//         })
//         .then(user => {

//             bcrypt.compare(password, user.password, function(err, result) {
//                 if (err !== undefined) {
//                     console.log(err);
//                     res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
//                 } else {
//                     req.session.user = user;
//                     res.redirect('/flavortool');
//                 }
//             })
//         })
//         .catch(error => {
//             console.error(error)
//             res.redirect('/?message=' + encodeURIComponent("Invalid username or password."));
//         })

// })






