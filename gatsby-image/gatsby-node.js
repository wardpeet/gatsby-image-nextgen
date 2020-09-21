exports.onCreateWebpackConfig = ({ stage, plugins, actions }) => {
  if (stage !== 'develop' && stage !== 'build-javascript') {
    return;
  }

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        [`global.GATSBY___IMAGE`]: true,
      }),
    ],
  });
};
