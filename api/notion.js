const { Client } = require("@notionhq/client");
require('dotenv').config();


// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

const getData = async (req, res) => {
  const query = {
    path: `databases/${database_id}/query`,
    method: "POST",
  };

  const { results } = await notion.request(query);
  return results
};

module.exports = { getData };