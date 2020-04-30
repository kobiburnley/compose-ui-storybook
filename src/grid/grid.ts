import * as classNames from "classnames"
import { domx, DomXProps } from "compose-ui-mobx-dom/es/domx"
import { EventEmitter } from "events"
import * as styles from "./grid.scss"

export interface GridProps extends Omit<Partial<DomXProps<"div">>, "tagName"> {
  container?: boolean
  direction?: "row" | "column"
}

export function Grid(props: GridProps) {
  return function render(_: unknown, events?: EventEmitter) {
    const { direction, container, ...rest } = props

    events?.once("dispose", () => {
      console.log("GridDispose")
    })

    return domx<"div">({
      tagName: "div",
      ...rest,
      className: () =>
        classNames(rest.className?.(), styles.root, {
          [styles.container]: container,
          [styles.row]: direction === "row",
          [styles.column]: direction === "column",
        }),
    })
  }
}
