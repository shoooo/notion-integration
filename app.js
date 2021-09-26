const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const { getData } = require('./api/notion')
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(cors());

app.get('/', async (req, res) => {
  const data = await getData()
//   console.log(data[0].data.id)
//   console.log(data[0].image)
//   console.log(data[0].data.properties.image.files[0].file.url)
  res.render('page', {
    data: data
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server started on port ${PORT}`))

// const { Client } = require("@notionhq/client");

// const notion = new Client({
//   auth: process.env.NOTION_TOKEN,
// });

// const getDatabase = async () => {
//     const res = await notion.databases.list()
//     console.log(res);
// };

// getDatabase();
