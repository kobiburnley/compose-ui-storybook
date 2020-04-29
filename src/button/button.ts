import * as styles from "@material/button/mdc-button.scss"
import { MDCRipple } from "@material/ripple"
import "@material/ripple/mdc-ripple.scss"
import { domx, DomXProps } from "compose-ui-mobx-dom/es/domx"
import { Text } from "compose-ui-mobx-dom/es/text"

export interface ButtonProps extends Partial<DomXProps<HTMLButtonElement>> {
  label?: () => string
}

export function Button(props?: ButtonProps) {
  return function Button() {
    const { label, ...rest } = props
    return domx({
      type: "button",
      ref: (element) => {
        MDCRipple.attachTo(element)
      },
      className: () => styles["mdc-button"],
      children: [
        domx({
          type: "div",
          className: () => styles["mdc-button__ripple"],
        }),
        domx({
          type: "span",
          className: () => styles["mdc-button__label"],
          children: [
            Text({
              data: label,
            }),
          ],
        }),
      ],
      ...rest,
    })
  }
}
