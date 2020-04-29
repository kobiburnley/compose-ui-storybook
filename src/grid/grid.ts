import * as classNames from "classnames"
import { domx, DomXProps } from "compose-ui-mobx-dom/es/domx"
import * as styles from "./grid.scss"

export interface GridProps extends Omit<Partial<DomXProps<"div">>, "type"> {
  container?: boolean
  direction?: "row" | "column"
}
import {EventEmitter} from "events"

export function Grid(props: GridProps) {
  return function render(_: unknown, events?: EventEmitter) {
    const { direction, container, ...rest } = props

    events?.once("dispose", () => {
      console.log("GridDispose")
    })

    return domx<"div">({
      type: "div",
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
