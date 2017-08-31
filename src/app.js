const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const pg = require('pg')
const pug = require('pug')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')


const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const database = new Sequelize('flavorappdb', process.env.POSTGRES_USER, null, {
    host: 'localhost',
    dialect: 'postgres'
});

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
    secret: "Your secret key",
    resave: true,
    saveUninitialized: false
}))




// request.setRequestHeader('X-Application-ID', '4d3622c7')
// request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
// request.setRequestHeader('X-API-Version', '1')
// request.setRequestHeader('Accept', 'application/json')
// // request.open('GET', 'https://api.foodpairing.com/ingredients');

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
Recipe.hasMany(Ingredient);
Ingredient.belongsTo(Recipe);	//belongsTo adds the UUID (of eg. recipe) to the ingredient table
User.hasMany(Recipe);
Recipe.belongsTo(User);
Method.belongsTo(Recipe);


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

database.sync() //{force: true}


//RELATIONSHIPS BETWEEN TABLES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//ROUTES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//GET 	- RENDER HOMEPAGE (CONTAINS LOGIN AND REGISTER FORMS)

app.get('/', (req, res) =>{
	res.render('index', {
		message: req.query.message,
		user: req.session.user
	})
});

//POST 	- REGISTER USER

app.post('/register', (req, res) =>{

	const password = req.body.password

    bcrypt.hash(password, 8, function(err, hash) {
        if (err !== undefined) {
            console.log(err)
        } else {
            User.create({
                    username: req.body.username,
                    fname:req.body.fname,
                    lname:req.body.lname,
                    email: req.body.email,
                    password: hash
                })
                .then(function() {
                    res.redirect('/')
                }).catch(err => {
                    console.error(err)
                })
        }
    })
})
//GET 	- RENDER LOGIN PAGE

app.get('/loginform', (req,res) =>{
	res.render ('login')
});

//POST 	- LOGIN USER

app.post('/login', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    User.findOne({
            where: {
                username: username
            }
        })
        .then(user => {

            bcrypt.compare(password, user.password, function(err, result) {
                if (err !== undefined) {
                    console.log(err);
                    res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
                } else {
                    req.session.user = user;
                    res.redirect('/profile');
                }
            })
        })
        .catch(error => {
            console.error(error)
            res.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
        })

})

//GET 	- USER'S JOURNAL

app.get('/journal', (req, res) =>{
	const user = req.session.user

	if (user){
		Recipe.findAll({
			where: {

			}
		})
	}
})

//POST 	- SUBMIT FORM TO CREATE RECIPE

//GET 	- FLAVOR MATCHING TOOL

app.get ('/flavortool', (req, res)=>{
	res.render('flavortool')
})

app.post ('/search', (req, res) =>{
    var searchTerm = req.body.q
})




app.listen(3000, function() {
    console.log("Listening on port 3000")
})






