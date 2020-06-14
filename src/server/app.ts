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

const context = {
  renderer: new DOMRenderer({
    isBrowser: false,
    window,
  }),
  events: new EventEmitter(),
  parentNode: window.document.body,
}

render({
  child: App(),
  context,
})
