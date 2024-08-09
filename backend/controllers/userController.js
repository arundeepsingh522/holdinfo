const Ticker = require("../models/Tickers");

const getData = async (req, res) => {
  try {
    // Fetch all tickers from the database
    const tickers = await Ticker.find({});

    // Check if no tickers are found
    if (tickers.length === 0) {
      return res
        .status(404)
        .json({ message: "No tickers found in the database." });
    }

    // Send the found tickers as a JSON response
    res.status(200).json({
      data: tickers,
    });
  } catch (error) {
    // Handle and send error details
    console.error("Error fetching tickers:", error);
    res.status(500).json({
      message: "An error occurred while fetching the tickers.",
      error: error.message,
    });
  }
};

module.exports = {
  getData,
};
