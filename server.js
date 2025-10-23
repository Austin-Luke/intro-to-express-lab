const express = require('express');
// const morgan = require('morgan');

// Use Morgan middleware with the 'dev' option for concise output


// Rest of your Express app code

const app = express()
// app.use(morgan('dev'));

app.listen(3000, () => {
    console.log(`listening on port 3000`)
})

// =======================================================

// Exercise 1: Greet the User --
app.get(`/greetings/:name`, (req, res) => {
    res.send(`<h1>Hello ${req.params.name}!</h1>`)
})

// ^ concatenate user input into a message string
// =======================================================

// Exercise 2: Evaluate a Dice Roll --
app.get(`/roll/:number`, (req, res) => {
    
    if (parseInt(`${req.params.number}`)) {
        res.send(`<h1>You rolled a ${req.params.number}!</h1>`)
    } 
    else {
        res.send(`<h1>You must specify a number.</h1>`)
    }
})

// ^ convert the string number into an integer
// ^ simple concatenation
// ^ simple error message
// ===========================================================

// Exercise 3: Array Shopping -- 
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ]

app.get(`/collectibles/:index`, (req, res) => {
let arrayIndex = parseInt(`${req.params.index}`)

// ^ convert the string number into an integer

if (arrayIndex >= collectibles.length) {
    res.send(`<h1>Error: <em>out of stock</em></h1><h2>Please check back soon!</h2>`)
}

// ^ I placed the error coding ahead of the mvp functionality

res.send(`So you want the <strong>${collectibles[arrayIndex].name}</strong>? 
    For <strong>$${collectibles[arrayIndex].price}</strong>, it can be yours!`)
})

// ^ concatenate the user's selection into a nicely worded message
// =================================================================

// Exercise 4: Filtering Shoes -- 

const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

app.get(`/shoes`, (req, res) => {

    let shoeFilter = req.query.filter
    let cost = parseInt(`${req.query.cost}`)
    let style = req.query.style
    let minCost = parseInt(`${req.query.minCost}`)
    let maxCost = parseInt(`${req.query.maxCost}`)
    let filteredShoes = []

// ^ defining variables and converting strings into numbers

    if (shoeFilter === `min`) {
        shoes.forEach(shoe => {
            if (shoe.price >= cost) {
                filteredShoes.push(shoe)
            }
        })
        res.send(filteredShoes)
    }

// ^ evaluate minimum cost filter for the user

    else if (shoeFilter === `max`) {
        shoes.forEach(shoe => {
            if (shoe.price <= cost) {
                filteredShoes.push(shoe)
            }
        })
        res.send(filteredShoes)
    
    }

// ^ evaluate maximum cost filter for the user

    else if (shoeFilter === `type`) {
        shoes.forEach(shoe => {
            if (shoe.type == style) {
                filteredShoes.push(shoe)
            }
        })
        res.send(filteredShoes)
    
    }

// ^ evaluate filter for shoe styles

    else if (shoeFilter === `between`) {
        shoes.forEach(shoe => {
            if (shoe.price <= maxCost && shoe.price >= minCost) {
                filteredShoes.push(shoe)
            }
        })
        res.send(filteredShoes)
    
    }

    else{
        res.send(shoes)
    }
})

// ^ evaluate both cost filters simultaneously