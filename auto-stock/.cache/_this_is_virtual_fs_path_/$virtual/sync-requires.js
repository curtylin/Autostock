
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": preferDefault(require("/home/curtis/code-repo/auto-stock/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/home/curtis/code-repo/auto-stock/src/pages/404.js")),
  "component---src-pages-algorithms-js": preferDefault(require("/home/curtis/code-repo/auto-stock/src/pages/algorithms.js")),
  "component---src-pages-create-algorithm-js": preferDefault(require("/home/curtis/code-repo/auto-stock/src/pages/createAlgorithm.js")),
  "component---src-pages-index-js": preferDefault(require("/home/curtis/code-repo/auto-stock/src/pages/index.js"))
}

