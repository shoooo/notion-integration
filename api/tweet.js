const Twitter = require('twitter');
require('dotenv').config();

const client = new Twitter({
    consumer_key: process.env.TWITTER_API,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.AccessToken,
    access_token_secret: process.env.AccessToken_SECRET
});

function tweet(text) {
    let params = {
        status: text,
    }

    client.post('statuses/update', params, (error, tweets, response) => {
        if (error) {
            console.log(error);
        } else {
            console.log(tweets);
        }
    });
};

function tweetImg(text) {
    const data = require('fs').readFileSync(`./images/`);

    client.post('media/upload', { media: data }, (error, media, response) => {
        if (error) {
            console.log(error);
        } else if (!error) {
            console.log(media);

            let params = {
                status: text,
                media_ids: media.media_id_string
            }

            client.post('statuses/update', params, (error, tweets, response) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(tweets);
                }
            });
        }
    });
}

module.exports = { tweet, tweetImg };