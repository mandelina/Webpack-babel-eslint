class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("My Plugin", (stats) => {
      console.log("MyPlugin worked");
    });

    compiler.hooks.emit.tapAsync("My Plugin", (compilation, callback) => {
      console.log(compilation.assets["main.js"].source());

      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
