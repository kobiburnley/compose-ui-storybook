import { domx, DomXProps } from "compose-ui-mobx-dom/es/domx"
import * as styles from "@material/floating-label/mdc-floating-label.scss"

export interface FloatingLabelProps extends Partial<DomXProps<"span">> {}

export function FloatingLabel(props: FloatingLabelProps = {}) {
  return function FloatingLabel() {
    return domx({
      tagName: "span",
      className: () => styles["mdc-floating-label"],
      ...props
    })
  }
}
