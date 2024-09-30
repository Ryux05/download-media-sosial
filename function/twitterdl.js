const { default: axios } = require("axios");

async function twitterDownloader(url) {
  const urlTwitter = decodeURIComponent(url);
  const domain_api = `https://itzpire.com/download/twitter?url=${urlTwitter}`;

  const response = await axios.get(domain_api);
  //console.log(response.data);

  if (response.data.author) {
    delete response.data.author;
  }

  return response.data.data.video_hd;
}

module.exports = twitterDownloader;
