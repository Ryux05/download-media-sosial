const { default: axios } = require("axios");

async function spotifyDownloader(url) {
  const urlSpotify = decodeURIComponent(url);
  const domain_api = `https://api.agatz.xyz/api/spotifydl?url=${urlSpotify}`;

  try {
    const response = await axios.get(domain_api);

    // Check if response.data is a string or an object
    let cleanResponseData;

    if (typeof response.data === "string") {
      // If it's a string, clean it
      cleanResponseData = response.data.replace(/\n/g, "");
    } else {
      // If it's already an object, use it directly
      cleanResponseData = response.data;
    }

    // Now we can check for the 'creator' field
    if (cleanResponseData.creator) {
      delete cleanResponseData.creator;
    }

    // Assuming 'data' field is a string and needs parsing
    const data = JSON.parse(cleanResponseData.data); // Parse the data field

    // Extract audio information
    const audioInfo = {
      nama_channel: data.nama_channel,
      title: data.judul,
      duration: data.durasi,
      imageUrl: data.gambar_kecil[0]?.url, // Use optional chaining to avoid errors
      audioUrl: data.url_audio_v1,
    };

    return audioInfo;
  } catch (error) {
    console.error(
      "Error fetching Spotify data:",
      error.message
    );
    throw error; // Rethrow the error for handling outside
  }
}

module.exports = spotifyDownloader;
