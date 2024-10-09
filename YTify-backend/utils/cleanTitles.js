const gen = require("@google/generative-ai");

const cleanTitles = async (title) => {
  const genAI = new gen.GoogleGenerativeAI(process.env.GEN_AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Extract the song title and artist name separately from this title: ${JSON.stringify(
    title
  )}. If the title does not include the artist's name, please search on spotify to find the best result. Return the output in the following format: songname:artist. If multiple artists are found for the same song, choose the one that best fits the vibe of other titles and is the most popular. Ensure to provide an artist name regardless of whether it is in the original title.if ur search results on spotify are different and no artist for original song is found change the one in the result u give by spotify found one. also dont give any descriptive text just songName:artistName no Speacial chars anythihng like that.also can u return array of object [{songName:Artist},{songname:artist}]`;

  const result = await model.generateContent(prompt);
  console.log(JSON.parse(result.response.text().replace(/```json|```/g, "")));
  return JSON.parse(result.response.text().replace(/```json|```/g, ""));
};

module.exports = cleanTitles;
