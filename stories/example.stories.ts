import { DOMRenderer } from "compose-ui/es/domRenderer"
import { default as jss } from "jss"
import { Home } from "../src/app/home"
import { Grid } from "../src/grid/grid"
import { htmlStory } from "./htmlStory"
import { EventEmitter } from "events"

export default {
  title: "Example",
}

export const app = () => {
  const context = {
    jss,
    renderer: new DOMRenderer({
      isBrowser: true,
      window
    }),
    events: new EventEmitter(),
    parentNode: document.createElement("div")
  }

  function App() {
    return Grid({
      direction: "column",
      children: [Home()],
    })
  }

  return htmlStory(App(), context)
}
