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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
