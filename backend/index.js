require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const { connectToMongoDB } = require("./db/connectToMongoDB");
const userRoutes = require("./routes/userRoutes");
const Ticker = require("./models/Tickers");
const {
  calculatePercentageDifference,
  formatCurrencyPair,
} = require("./utils/utils");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const coreOptions = {
  origin: "*", // Allow requests from any origin, replace with specific origins if needed
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(coreOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fetch and store data from API
async function fetchDataAndStore() {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");

    const tickers = Object.values(response.data).slice(0, 10);
    console.log("tickers", tickers);

    await Ticker.deleteMany({}); // Clear existing data

    tickers.forEach(async (ticker) => {
      const { name, last, buy, sell, volume, base_unit } = ticker;
      const difference = calculatePercentageDifference(sell, buy);

      const updatedFormat = formatCurrencyPair(name);

      const newTicker = new Ticker({
        name: updatedFormat,
        last,
        buy,
        sell,
        difference,
        volume,
        base_unit,
      });
      await newTicker.save();
    });
    console.log("Data stored successfully");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//testing for server start
app.get("/", (req, res) => {
  res.send("Hello Word");
});

app.use("/api/user", userRoutes);
const startServer = async () => {
  try {
    await connectToMongoDB();
    console.log("Successfully connected to MongoDB");

    app.listen(PORT, () => {
      // Fetch data on server start
      console.log(`Server running on port ${PORT}`);

      //fetching data from api
      fetchDataAndStore();
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit the process with failure
  }
};
startServer();
