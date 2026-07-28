self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/feedback/[id]": [
    "static/chunks/pages/feedback/[id].js"
  ],
  "/upload": [
    "static/chunks/pages/upload.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/api/auth/[...newAuth]",
    "/api/roast",
    "/api/upload",
    "/feedback/[id]",
    "/upload"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()