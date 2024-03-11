const axios = require("axios");
const cheerio = require("cheerio");
const { Queue } = require("bull");
const { saveWebPage } = require("./storage");

// Define a task queue using Bull
const taskQueue = new Queue("webCrawler");

// Function to fetch and process a URL
async function processURL(url) {
  try {
    // Fetch HTML content of the URL
    const response = await axios.get(url);
    const html = response.data;

    // Parse HTML using Cheerio
    const $ = cheerio.load(html);

    // Extract relevant information from the webpage
    const title = $("title").text();
    const bodyText = $("body").text();

    // Store the extracted data in the storage system
    await saveWebPage({ url, title, bodyText });

    // Extract and enqueue links from the webpage
    $("a").each((index, element) => {
      const link = $(element).attr("href");
      if (link && link.startsWith("http")) {
        taskQueue.add("crawlTask", { url: link });
      }
    });

    console.log(`Crawled URL: ${url}`);
  } catch (error) {
    console.error(`Error processing URL ${url}: ${error.message}`);
  }
}

// Define a Bull worker to process crawl tasks.
// It will be invoked whenever a task of a specific
// type is received in the queue
taskQueue.process("crawlTask", async (job) => {
  const { url } = job.data;
  await processURL(url);
});

// Seed the task queue with initial URLs to crawl
const initialURLs = ["https://example.com"];
initialURLs.forEach((url) => {
  taskQueue.add("crawlTask", { url });
});
