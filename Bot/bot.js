import { HfInference } from "@huggingface/inference";
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const apiKey = "";
const client = new HfInference(apiKey);
const app = express();
app.use(cors());
// Uncomment later for additional middleware
app.use(express.json());

async function run() {
  // Validate Pinecone configuration
  //   if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ENVIRONMENT) {
  //     throw new Error("Missing Pinecone configuration (API key or environment).");
  //   }

  // Initialize Pinecone
  const pc = new Pinecone({
    apiKey:
      "",
  });

  const indexName = "goutam";

  const model = "multilingual-e5-large";

  // const data = [
  //   {
  //     id: "vec7",
  //     text: "Goutam Likes apple fruit and uses Apple iphone 16 pro max.",
  //   },
  //   {
  //     id: "vec8",
  //     text: "Goutam works in a multinational company called google.",
  //   },
  //   { id: "vec9", text: "Goutam has friends named Daiwik maheshwari and dev bulchandani." },

  // ];

  // const embeddings = await pc.inference.embed(
  //   model,
  //   data.map((d) => d.text),
  //   { inputType: "passage", truncate: "END" }
  // );

  const index = pc.index(indexName);

  // const vectors = data.map((d, i) => ({
  //   id: d.id,
  //   values: embeddings[i].values,
  //   metadata: { text: d.text },
  // }));

  // await index.namespace("goutam-bot").upsert(vectors);

  app.post("/chat", async (req, res) => {
    try {
      const userQuery = req.body.query; // Frontend sends user query

      // Convert the query into a numerical vector
      const queryEmbedding = await pc.inference.embed(model, [userQuery], {
        inputType: "query",
      });

      // Search the Pinecone index for top matches
      const queryResponse = await index.namespace("goutam-bot").query({
        topK: 3,
        vector: queryEmbedding[0].values,
        includeValues: false,
        includeMetadata: true,
      });

      // Generate a response using Hugging Face's Chat Completion
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

  // Uncomment later for additional routes
  // app.post("/upsert", async (req, res) => {});

  // Start the Express server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Run the program
run().catch((err) => console.error("Unhandled error:", err));
