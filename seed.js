/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Building = db.model('building')
var Cart = db.model('cart')
var Order = db.model('order')
var Review = db.model('review');
var PurchasedBuilding = db.model('purchasedBuilding');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            name: 'test ing',
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            name: 'Barak Obama',
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
            name: 'admin',
            email: 'admin@gmail.com',
            password: 'a',
            isAdmin: true
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedReviews = function(){
    var reviews = [
    {
     review:"This string should probably be over 250 characters just to be safe, so we know that it definetly works, and is not broken. To confirm that this string can be over 250 characters, this paragaph is going to continue on and on, till it reaches 250 characters, I am going to guess this is not over 250 characters.",
     numOfStars:"1",
     buildingId:"2",
     userId:"2"
    },{
        review:"Second Review this building is just aiiiittteeee",
     numOfStars:"2",
     buildingId:"2",
     userId:"1"
    },
    {
        review:"this building is not so good",
     numOfStars:"3",
     buildingId:"2",
     userId:"1"
    },
    {
        review:"REVIEW FOR BUILDING 3!!!!",
     numOfStars:"3",
     buildingId:"2",
     userId:"3"
    }
    ]
   var creatingReviews = reviews.map(function (reviewObj) {
        return Review.create(reviewObj);
    });

    return Promise.all(creatingReviews);

};

var seedCarts = function(){
    var carts = [
    {
     userId: "2"
    },
    {
     userId:"3"
    }
    ]
   var creatingCarts = carts.map(function (cartObj) {
        return Cart.create(cartObj);
    });

    return Promise.all(creatingCarts);

};

// create getter method for total price
var seedOrders = function() {
     var orders = [
         {
             userId: "2",
             cartId: "1",
             email: "example@email.com",
             creditCard: "1234 5678 9012 3456",
             name: "Name",
             address1: "123 Address Lane",
             city: "Fake City",
             state: "Fake State",
             zipCode: "10000"
         },
         {
             userId:"3",
             cartId:"2",
             email: "example@email.com",
             creditCard: "1234 5678 9012 3456",
             name: "Name",
             address1: "123 Address Lane",
             city: "Fake City",
             state: "Fake State",
             zipCode: "10000"
         }
     ]

    var creatingOrders = orders.map(function (orderObj) {
         return Order.create(orderObj)
            .then(order => {
                order.setPurchasedBuildings([1,2]);
            });
     });

     return Promise.all(creatingOrders);
}

var seedPurchasedBuildings = function() {
    var purchasedBuilding = [
        {
            purchasePrice: "100",
            buildingId: "1"
        },
        {
            purchasePrice: "300",
            buildingId: "2"
        }
    ]

    var creatingPurchasedBuildings = purchasedBuilding.map(function(pBuilding) {
        return PurchasedBuilding.create(pBuilding);
    })

    return Promise.all(creatingPurchasedBuildings);

}

var seedBuildings = function (){
    var buildings = [
    {
        streetAddress: "123 Main Street",
        city: "New York City",
        state: "New York",
        zipCode: "10001",
        price: "123456",
        propertyType: 'Commercial',
        lotSize: '7000 sq ft',
        stories: '25',
        numberOfUnits: '50',
        architecturalStyle: 'Modern',
        buildingAge: '7',
        photoURL: 'http://i2.cdn.turner.com/cnnnext/dam/assets/140218103215-sheraton-huzhou-hot-spring-resort-horizontal-large-gallery.jpg',
        description: "One of the first buildings ever added to the database"

    },
     {
        streetAddress: "345 Main Street",
        city: "Manhattan",
        state: "New York",
        zipCode: "10002",
        price: "223456",
        propertyType: 'Residential',
        lotSize: '2000 sq ft',
        stories: '2',
        numberOfUnits: '5',
        architecturalStyle: 'Modern',
        buildingAge: '2',
        photoURL: 'http://www.heltzelaia.com/portfolio/extra-portfolio/12_HeltzelAIA.jpg',
        description: 'Second building to ever be added to the databse'

    },
     {
        streetAddress: "789 Main Street",
        city: "Manhattan",
        state: "New York",
        zipCode: "10002",
        price: "223456",
        propertyType: 'Residential',
        lotSize: '2000 sq ft',
        stories: '100',
        numberOfUnits: '90',
        architecturalStyle: 'Modern',
        buildingAge: '2',
        photoURL: 'http://www.heltzelaia.com/portfolio/extra-portfolio/12_HeltzelAIA.jpg',
        description: 'Second building to ever be added to the databse'

    }
    ];
       var creatingBuildings = buildings.map(function (buildingObj) {
        return Building.create(buildingObj);
    });

    return Promise.all(creatingBuildings);

}




db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function (){
        return seedBuildings();
    })
    .then(function(){
        return seedCarts();
    })
    .then(function(){
        return seedOrders();
    })
    .then(function(){
        return seedPurchasedBuildings();
    })
    .then(function(){
        return seedReviews();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
