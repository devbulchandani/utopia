import { HfInference } from "@huggingface/inference";
import { Pinecone} from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {v4 as uuidv4} from 'uuid'

dotenv.config();
const apiKey = "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"; // Use your Hugging Face API key
const client = new HfInference(apiKey);
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Pinecone client
const piKey=process.env.PINECONE_API_KEY;

const pc = new Pinecone( {
  apiKey: "pcsk_28iS1v_RMcjnaVH9k6wb4ssKK8RxBkUsHaQSb13rMQJr8Nm9fwBPzuzLAPps2RcgbqGLwf"
})



const indexName = "goutam";
var model = "multilingual-e5-large"; // Hugging Face embedding model

// Define the upsert route for new events
app.post("/upsert", async (req, res) => {
  try {
    const event = req.body; // Assume event data is sent from the frontend
    
    // Generate embeddings for the event (you can use title, description, etc.)
    const embeddings = await pc.inference.embed(
      model,
      [event].map((event)=> event.title+" "+event.description),
      {inputType:"passage",truncate :"END"}// Combine title and description
    );

    // Create a vector to upsert into Pinecone
    const vector = {
      id: uuidv4(), // Unique event ID
      values: embeddings[0].values, // Embedding vector
      metadata: {
        title: event.title,
        description: event.description,
        location: event.location,
        date: event.date,
        price: event.price,
        totalTickets:event.totalTickets,
        organizerName:event.organizerName,
        organizerContact:event.organizerContact,
        category:event.category
      },
    };

    const index = pc.index(indexName);
    await index.namespace("utopia-bot").upsert([vector]); // Upsert the vector

    res.status(200).json({ message: "Event upserted successfully!" });
  } catch (error) {
    console.error("Error during upsert:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle user queries with the /chat route
app.post("/chat", async (req, res) => {
  try {
    const userQuery = req.body.query // Frontend sends user query
    console.log(userQuery)
    var model="multilingual-e5-large"
    // Convert the query into a numerical vector
    const queryEmbedding = await pc.inference.embed(
      model,
      [userQuery],
      {inputType:'query'}
  );
    console.log(queryEmbedding);
    // Search the Pinecone index for top matches
    const index = pc.index(indexName);
    const queryResponse = await index.namespace("utopia-bot").query({
      topK: 1,
      vector: queryEmbedding[0].values, // Query embedding
      includeValues: false,
      includeMetadata: true,
    });

    // Generate a response using the retrieved event data
    const chatCompletion = await client.chatCompletion({
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        {
          role: "user",
          content: `Answer from the database response: ${JSON.stringify(
            queryResponse
          )} for user query: ${userQuery}`,
        },
      ],
      max_tokens: 500,
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error during chat handling:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});