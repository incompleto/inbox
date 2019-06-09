require('dotenv').config()

const express = require('express')
const app = express()
const Arena = require('are.na')
const arena = new Arena()
const rss = require('rss')

const URL = 'inbox-zero'
const AUTHOR = 'Incompleto'
const SITE_URL = 'https://www.are.na/incompleto/inbox-zero'
const PER_PAGE = 25

const generateFeedFromChannel = (channel) => {

  let feed = new rss({
    title: channel.title,
    description: channel.metadata.description,
    feed_url: 'https://incompleto-rss.glitch.me',
    site_url: SITE_URL,
    author: AUTHOR
  })

  channel.contents.reverse().map(item => {
    let url = ''

    if (item && item.source && item.source.url) {
      url = item.source.url
    }

    let description 

    if (item && item.image) {
      description = `<img src="${item.image.display.url}" />`
    }

    description += item.description_html

    feed.item({
      title: item.title,
      description,
      url,
      author: item.author,
      date: item.updated_at
    })
  })

  return feed
}

app.use(express.static('public'))

app.get('/', function(request, response) {
  let per = PER_PAGE

  arena.channel(URL, { per })
    .get().then(chan => {

      let page = Math.ceil(chan.length / per)

      const getBlocks = (channel) => {
        let feed = generateFeedFromChannel(channel)
        response.setHeader('Content-Type', 'application/rss+xml')
        response.send(feed.xml({ indent: true }))
      }

      arena.channel(URL, { page, per })
        .get().then(getBlocks)

    }).catch((error) => {
      console.log(error)
      response.json({ error })
    })
})

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port)
})
