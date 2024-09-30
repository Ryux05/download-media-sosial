const axios = require("axios");

async function tiktokInfo(url) {
  const urlTiktok = decodeURIComponent(url);
  const domain_api = `https://itzpire.com/download/tiktok?url=${urlTiktok}`;

  const response = await axios.get(domain_api);
  console.log(response.data);

  if (response.data.author) {
    delete response.data.author;
  }

  return response.data;
}

async function tiktokDownloader(url) {
  const urlTiktok = decodeURIComponent(url);
  const domain_api = `https://itzpire.com/download/tiktok?url=${urlTiktok}`;

  const response = await axios.get(domain_api);
  console.log(response.data.data.video);

  if (response.data.author) {
    delete response.data.author;
  }

  return response.data.data.video;
}

module.exports = { tiktokInfo, tiktokDownloader };
