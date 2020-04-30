import { MDCNotchedOutline } from "@material/notched-outline"
import "@material/notched-outline/mdc-notched-outline.scss"
import { MDCTextField } from "@material/textfield"
import * as styles from "@material/textfield/mdc-text-field.scss"
import { domx } from "compose-ui-mobx-dom/es/domx"
import * as classNames from "classnames"

export interface TextFieldProps {
  value: string
  onChange: (value: string) => unknown
}

export function TextField() {
  return function TextField() {
    return domx({
      tagName: "label",
      className: () =>
        classNames(
          styles["mdc-text-field"],
          styles["mdc-text-field--outlined"]
        ),
      ref: (element) => {
        MDCTextField.attachTo(element)
      },
      children: [
        domx({
          tagName: "input",
          type: () => "text",
          className: () => styles["mdc-text-field__input"],
          value: () => "dlalal",
          onChange: () => {
            console.log("on change")
          },
        }),
        domx({
          tagName: "span",
          className: () => styles["mdc-notched-outline"],
          ref: (element) => {
            MDCNotchedOutline.attachTo(element)
          },
          children: [
            domx({
              tagName: "span",
              className: () => styles["mdc-notched-outline__leading"],
            }),
            domx({
              tagName: "span",
              className: () => styles["mdc-notched-outline__notch"],
              children: [
                domx({
                  tagName: "span",
                  className: () => styles["mdc-floating-label"],
                  children: ["Name"],
                }),
              ],
            }),
            domx({
              tagName: "span",
              className: () => styles["mdc-notched-outline__trailing"],
            }),
          ],
        }),
      ],
    })
  }
}
