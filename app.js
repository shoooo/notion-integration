const express = require('express')
const { getData } = require('./api/notion')

const PORT = process.env.PORT || 3000

const app = express();
require('dotenv').config();

app.use(express.static('public'));

app.get('/', async (req, res) => {
  const results = await getData()
  res.json(results)
  console.log(results)
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))

// const { Client } = require("@notionhq/client");

// const notion = new Client({
//   auth: process.env.NOTION_TOKEN,
// });

// const getData = async () => {
//     console.log(process.env.NOTION_TOKEN)
//     const res = await notion.databases.list()
//     console.log(res);
// };

// getData();
