const Image = require("@11ty/eleventy-img");
const fg = require('fast-glob');
const paintingImages = fg.sync(["paintings/*.{jpg,png}"]);

module.exports = function (eleventyConfig) {
    // Passthrough copy paintings to _site
	// eleventyConfig.addPassthroughCopy("paintings");
    // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

    // Add paintings collection
    eleventyConfig.addCollection("paintings", function() {
        return paintingImages.map(async (src) => (
            await Image(src, {
                widths: [400],
                formats: ["jpeg"]
            })
        ))
      });
};

