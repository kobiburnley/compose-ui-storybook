import { default as jss } from "jss"
import { Home } from "../src/app/home"
import { Grid } from "../src/grid/grid"
import { htmlStory } from "./htmlStory"

export default {
  title: "Example"
}

export const grid = () => {
  const context = {
    jss
  }

  function App() {
    return Grid({
      direction: "column",
      children: [
        Home(),
      ]
    })
  }

  return htmlStory(App(), context)
}
