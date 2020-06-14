import * as styles from "@material/button/mdc-button.scss"
import { MDCRipple } from "@material/ripple"
import "@material/ripple/mdc-ripple.scss"
import { domx, DomXProps } from "compose-ui-mobx-dom/es/domx"
import { text } from "compose-ui-mobx-dom/es/text"
import { Context } from 'compose-ui/es/context'

export interface ButtonProps extends Partial<DomXProps<"button">> {
  label: () => string
}

export function Button(props: ButtonProps) {
  return function Button(context: Context) {
    const { label, ...rest } = props

    return domx({
      tagName: "button",
      ref: (element) => {
        if(context.renderer.isBrowser) {
          // MDCRipple.attachTo(element)
        }
      },
      className: () => styles["mdc-button"],
      children: [
        domx({
          tagName: "div",
          className: () => styles["mdc-button__ripple"],
        }),
        domx({
          tagName: "span",
          className: () => styles["mdc-button__label"],
          children: [
            text({
              data: label,
            }),
          ],
        }),
      ],
      ...rest,
    })
  }
}
