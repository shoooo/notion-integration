const { Client } = require("@notionhq/client");
require("dotenv").config();

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

const getData = async () => {
  // const query = {
  //   path: `databases/${database_id}/query`,
  //   method: "POST",
  // };

  const { results } = await notion.databases.query({
    database_id: database_id,
  });

  const data = results.map((page) => {
    return {
      data: page,
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      date: page.properties.date.date.start,
      type: page.properties.type.multi_select[0].name,
      stage: page.properties.stage.select.name,
      image: page.properties.image.files[0].file.url,
    };
  });

  return data;
};

const updateData = async (page_id) => {
  const { results } = await notion.pages.update({
    page_id: page_id,
    properties: {
      stage: {
        select: {
          name: "公開済み",
        }
      },
    },
  });
  return results;
};

module.exports = { getData, updateData };
