import { Child } from "compose-ui/es/child"
import { Context } from "compose-ui/es/context"
import { render } from "compose-ui/es/render"

export function htmlStory<C extends Context>(child: Child, context: C) {
  requestAnimationFrame(() => {
    render({
      child,
      context,
    })
  })

  return context.parentNode
}
