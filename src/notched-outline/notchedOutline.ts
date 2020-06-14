import { MDCNotchedOutline } from "@material/notched-outline"
import * as styles from "@material/notched-outline/mdc-notched-outline.scss"
import { domx } from "compose-ui-mobx-dom/es/domx"
import { Child } from "compose-ui/es/child"
import { Context } from "compose-ui/es/context"

export interface NotchedOutlineProps {
  notch?: Child
}

export function NotchedOutline(props: NotchedOutlineProps = {}) {
  return function NotchedOutline(context: Context) {
    const { notch } = props
    return domx({
      tagName: "span",
      className: () => styles["mdc-notched-outline"],
      ref: (element) => {
        if (context.renderer.isBrowser) {
          MDCNotchedOutline.attachTo(element)
        }
      },
      children: [
        domx({
          tagName: "span",
          className: () => styles["mdc-notched-outline__leading"],
        }),
        domx({
          tagName: "span",
          className: () => styles["mdc-notched-outline__notch"],
          children: [notch].filter((e): e is Child => e != null),
        }),
        domx({
          tagName: "span",
          className: () => styles["mdc-notched-outline__trailing"],
        }),
      ],
    })
  }
}
