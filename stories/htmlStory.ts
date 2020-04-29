import { render } from "compose-ui/es/render"
import { Child } from "compose-ui/es/child"

import {EventEmitter} from "events"

export function htmlStory<C>(child: Child, context?: C) {
  const container = document.createElement("div")

  requestAnimationFrame(() => {
    render(child, container, context, new EventEmitter())
  })

  return container
}
