const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
//require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// MongoDB setup
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Webhook endpoint for Dialogflow
app.post("/webhook", async (req, res) => {
    try {
        const intentName = req.body.queryResult.intent.displayName;
        let responseText = "";

        await client.connect();
        const db = client.db("testdb"); // your database name
        const collection = db.collection("users"); // your collection

        if (intentName === "GetUserInfo") {
            const userName = req.body.queryResult.parameters.name;
            const user = await collection.findOne({ name: userName });

            responseText = user
                ? `I found ${user.name}. Email: ${user.email}`
                : `Sorry, I couldn't find a user named ${userName}.`;
        } else {
            responseText = "Intent not handled yet.";
        }

        res.json({
            fulfillmentText: responseText,
        });
    } catch (err) {
        console.error(err);
        res.json({ fulfillmentText: "Error connecting to DB." });
    } finally {
        await client.close();
    }
});

app.get("/api/users", (req, res) => {
    res.json([{ name: "Justine" }, { name: "Lopez" }]);
});

app.get("/api/products", (req, res) => {
    res.json({
        products: [{
            name: "Notebook",
            price: 14.99,
            image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
            alt: "Notebook"
        }]
    })
})

app.get("/", (req, res) => {
    res.send("API is running...");
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

