/* config-overrides.js */

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias.fs = "pdfkit/js/virtual-fs.js";

  config.module.rules.push({
    enforce: "post",
    test: /fontkit[/\\]index.js$/,
    loader: "transform-loader?brfs",
  });
  config.module.rules.push({
    enforce: "post",
    test: /unicode-properties[/\\]index.js$/,
    loader: "transform-loader?brfs",
  });
  config.module.rules.push({
    enforce: "post",
    test: /linebreak[/\\]src[/\\]linebreaker.js/,
    loader: "transform-loader?brfs",
  });
  config.module.rules.push({
    test: /src[/\\]assets/,
    loader: "arraybuffer-loader",
  });
  config.module.rules.push({ test: /\.afm$/, loader: "raw-loader" });
  return config;
};
