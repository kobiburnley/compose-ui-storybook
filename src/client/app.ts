import { DOMRenderer } from "compose-ui/es/domRenderer"
import { render } from "compose-ui/es/render"
import { EventEmitter } from "events"
import { Home } from "../app/home"
import { Grid } from "../grid/grid"

function App() {
  return Grid({
    direction: "column",
    children: [Home()],
  })
}

const div =  document.body.querySelector("div")!

console.log("div", div)

render({
  child: App(),
  context: {
    renderer: new DOMRenderer({
      isBrowser: true,
      window
    }),
    events: new EventEmitter(),
    parentNode: document.body,
    maybeNode: div
  },
})
