import * as express from "express"
import { JSDOM, DOMWindow } from "jsdom"
import { performance } from "perf_hooks"

const render = require("./app.webpack.module.js")

const server = express()

server.use(express.static("public"))
server.use(express.static("src"))

server.use("/favicon.ico", (req, res) => {
  res.sendStatus(200)
})

server.use((req, res) => {
  const t0 = performance.now()

  const { window } = new JSDOM(undefined, {
    url: "about:blank",
    resources: "usable",
  })

  render(window)

  const javascripts = [
    `runtime.js`,
    `vendors~app.js`,
    `app.js`,
  ]

  for (const fileName of javascripts) {
    const scriptElement = window.document.createElement("script")
    scriptElement.src = fileName
    scriptElement.type = "text/javascript"

    window.document.body.append(scriptElement)
  }

  res.send(window.document.querySelector("html")!.outerHTML)

  const t1 = performance.now()
  console.log(`Call to doSomething took ${t1 - t0} milliseconds.`)
})

server.listen(8910, "0.0.0.0", () => {
  console.log("server is running")
})
