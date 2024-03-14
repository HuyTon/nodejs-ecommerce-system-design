const Page = require("../models/Page");

async function saveWebPage(url, title, content, metadata = undefined) {
  try {
    const page = new Page({ url, title, content, metadata });
    await page.save();
    console.log(`Page ${url} saved successfully.`);
  } catch (error) {
    console.error(`Error saving page ${url}:`, error);
  }
}

async function getWebPage(url) {
  try {
    const page = await Page.findOne({ url });
    return page;
  } catch (error) {
    console.error(`Error retrieving page ${url}:`, error);
    return null;
  }
}

module.exports = { saveWebPage, getWebPage };
