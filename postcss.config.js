module.exports = ({env}) => {
  const isProd = (env === 'production');
  const plugins = {
    'postcss-nested': {},
  }

  return {plugins}
}
