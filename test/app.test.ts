const { serverApp } = require("../public/app.js")
import { promises as fs } from "fs"
test("to static html", function() {
  return fs.writeFile("app.html", serverApp())
})
