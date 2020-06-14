import "@material/notched-outline/mdc-notched-outline.scss"
import { MDCTextField } from "@material/textfield"
import * as styles from "@material/textfield/mdc-text-field.scss"
import * as classNames from "classnames"
import { domx, DomXProps } from "compose-ui-mobx-dom/es/domx"
import { propReaction } from "compose-ui-mobx-dom/es/prop"
import { Child } from "compose-ui/es/child"
import { Context } from "compose-ui/es/context"
import { FloatingLabel } from "../floating-label/floatingLabel"
import { NotchedOutline } from "../notched-outline/notchedOutline"
export interface TextFieldProps {
  value?: () => string
  onChange?: (value: string) => unknown
  inputProps?: DomXProps<"input">
  label?: Child
}

export function TextField(props: TextFieldProps = {}) {
  return function TextField(context: Context) {
    const { value, onChange, label, inputProps } = props
    return domx({
      tagName: "label",
      className: () =>
        classNames(
          styles["mdc-text-field"],
          styles["mdc-text-field--outlined"]
        ),
      ref: (element) => {
        if (context.renderer.isBrowser) {
          MDCTextField.attachTo(element)
        }
      },
      children: [
        domx<"input">({
          tagName: "input",
          type: () => "text",
          className: () => styles["mdc-text-field__input"],
          onInput: (event) => {
            onChange?.(event.target.value)
          },
          ref: (element) => {
            if (value != null) {
              propReaction("value", value, (value) => {
                element.value = value
              })
            }
          },
          ...inputProps,
        }),
        NotchedOutline({
          notch: FloatingLabel({
            children: [label].filter((e): e is Child => e != null),
          }),
        }),
      ],
    })
  }
}
