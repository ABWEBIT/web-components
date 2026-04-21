export default function (eleventyConfig){

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