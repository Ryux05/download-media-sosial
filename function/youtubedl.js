const axios = require("axios");

async function youtubeDownloader(url) {
  const parseUrl = new URL(url);
  const ytid = parseUrl.searchParams.get("v");
  //console.log(ytid);

  const domain_api = `https://itzpire.com/download/youtube?url=https://www.youtube.com/watch?v=${ytid}`;

  const response = await axios.get(domain_api);
  //console.log(response.data);

  if (response.data.author) {
    delete response.data.author;
  }
  return response.data.data.video.url;
}

async function youtubeInfo(url) {
  const parseUrl = new URL(url);
  const ytid = parseUrl.searchParams.get("v");
  //console.log(ytid);

  const domain_api = `https://itzpire.com/download/youtube?url=https://www.youtube.com/watch?v=${ytid}`;

  const response = await axios.get(domain_api);
  //console.log(response.data);

  if (response.data.author) {
    delete response.data.author;
  }
  return response.data;
}

module.exports = { youtubeDownloader, youtubeInfo };
