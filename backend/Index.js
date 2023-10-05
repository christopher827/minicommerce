require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())

app.use(
    cors({
        origin: "http://localhost:3000"    })
)
//Imports the stripe library and initialized it with the PRIVATE KEY (used to authenticate server)
const stripe = require("stripe")
(process.env.STRIPE_PRIVATE_KEY)

//handles requests for creating a Stripe Checkout session.
app.post("/create-checkout-session", async (req, res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],//Specifies that we're  accepting payments via credit or debit card.
            mode:"payment",//Indicates that this session is for a one-time payment
            line_items: req.body.items.map(item => {//maps over the customer's cart in the request body, the items the customer wants to purchase
                return{
                    price_data:{
                        currency:"ngn",//Currency we are receiving
                        product_data:{
                            name: item.name
                        },
unit_amount: (item.price)*100, //Stripe receives payment in the smallest unit of the specified currency (in this case KOBO) 

                    },
                    quantity: item.quantity
                }
            }),
            success_url: 'http://localhost:3000/success',//The URL where customers will be redirected after a successful payment.
            cancel_url: 'http://localhost:3000/cancel'//The URL where customers will be redirected if they cancel the payment.
        })

        res.json({url: session.url})//If the session is created successfully, it responds with a JSON object containing the URL of the Checkout session. 

    }catch(e){
     res.status(500).json({error:e.message})
    }
})
app.listen(process.env.PORT,()=>{
    console.log('Server is running on PORT '+process.env.PORT)
})