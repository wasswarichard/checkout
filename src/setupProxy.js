const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware("/pay", {
            target: "https://topup.vercel.app",
            changeOrigin: true
        })
    );
    app.use(
        createProxyMiddleware("/widget", {
            target: "https://topup.vercel.app",
            changeOrigin: true
        })
    );

};