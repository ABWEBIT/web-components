export default function (eleventyConfig){
  const baseUrl = process.env.BASE_URL || "/";

  eleventyConfig.addGlobalData("site",{
    baseUrl
  });

  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets",
    "library": "library"
  });

  return {
    dir: {
      input: "src",
      output: "docs"
    }
  };
}