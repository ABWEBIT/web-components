export default function (eleventyConfig){
  const isBuild = process.env.ELEVENTY_RUN_MODE === "build";
  const baseUrl = isBuild ? "/web-components/" : "/";

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