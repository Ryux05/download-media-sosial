const { default: axios } = require("axios");
const { video } = require("tiktok-scraper");

async function instagramDownloader(url) {
  const urlTwitter = decodeURIComponent(url);
  const domain_api = `https://api.agatz.xyz/api/instagram?url=${urlTwitter}`;

  const response = await axios.get(domain_api);
  //console.log(response.data);

  if (response.data.creator) {
    delete response.data.creator;
  }

  return response.data.data.video[0].video;
}

module.exports = instagramDownloader;
