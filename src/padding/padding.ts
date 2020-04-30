import { DomXHTMLAttributes, ElementKey } from "compose-ui-mobx-dom/es/domx"
import * as classNames from "classnames"
import * as styles from "./padding.scss"

export interface PaddingProps {
  xs?: 4 | 8 | 12 | 16
}

export function padding<P extends DomXHTMLAttributes<ElementKey>>(props: PaddingProps) {
  return function padding(otherProps: P): P {
    const { xs } = props
    return {
      ...otherProps,
      className: () => {
        return classNames(otherProps.className?.(), {
          [styles["xs-" + xs]]: xs != null,
        })
      },
    }
  }
}
