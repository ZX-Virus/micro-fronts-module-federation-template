const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "angular_content": "angular_content@http://localhost:4201/remoteEntry.js",
    "react_content": "react_content@http://localhost:3001/remoteEntry.js",
    "vue_content": "vue_content@http://localhost:3002/remoteEntry.js",
    native_js_content: "native_js_content@http://localhost:8082/remoteEntry.js",
    mobx_store: "mobx_store@http://localhost:8081/remoteEntry.js",
    "angular_components": "angular_components@http://localhost:4201/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
