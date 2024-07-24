const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'angular_components',

  exposes: {
    './component1': './src/app/components/component1/component1.component',
    './component2': './src/app/components/component2/component2.component',
    './component3': './src/app/components/component3/component3.component',
  },
  shared: {
    "@angular/core": { singleton: true, requiredVersion:'auto' },
    "@angular/common": { singleton: true, requiredVersion:'auto' },
    "@angular/router": { singleton: true, requiredVersion:'auto' },
  },
});
