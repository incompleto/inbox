require("dotenv").config();

const Arena = require("are.na");
const arena = new Arena();
const rss = require("rss");

const express = require("express");
const path = require("path");
const app = express();

const URL = "inbox-zero";
const TITLE = "Incompleto – Inbox zero";
const FEED_URL = "https://inbox.incomple.to";
const SITE_URL = "https://www.are.na/incompleto/inbox-zero";
const AUTHOR = "Incompleto";
const PER_PAGE = 25;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

const generateFeedFromChannel = channel => {
  let feed = new rss({
    title: TITLE, // channel.title
    description: channel.metadata.description,
    feed_url: FEED_URL,
    site_url: SITE_URL,
    author: AUTHOR
  });

  channel.contents.reverse().map(item => {
    let url = "";

    if (item && item.source && item.source.url) {
      url = item.source.url;
    }

    if (item && item.image) {
      enclosure = {
        url: item.image.display.url
      };
    }

    feed.item({
      title: item.title,
      description: item.description_html,
      url,
      enclosure,
      author: item.author,
      date: item.updated_at
    });
  });

  return feed;
};

const getBlocksFromChannel = channel => {
  let page = Math.ceil(channel.length / PER_PAGE);

  return arena
    .channel(URL, { page, PER_PAGE })
    .get()
    .then(generateFeedFromChannel)
    .catch(error => {
      console.log(error);
    });
};

const getFeed = () => {
  return arena
    .channel(URL, { PER_PAGE })
    .get()
    .then(getBlocksFromChannel)
    .catch(error => {
      console.log(error);
    });
};

app.get("/rss", function(request, response) {
  let feed = getFeed();

  feed.then(function(result) {
    response.setHeader("Content-Type", "application/rss+xml");
    response.send(result.xml({ indent: true }));
  });
});

app.get("/", function(req, res) {
  let feed = getFeed();

  feed.then(function(result) {
    res.render("index", { feed: result });
  });
});

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
