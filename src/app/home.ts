import { domx } from "compose-ui-mobx-dom/es/domx"
import { Switch } from "compose-ui-mobx-dom/es/switch"
import { Text } from 'compose-ui-mobx-dom/es/text'
import { pipe } from "fp-ts/lib/pipeable"
import { action, observable } from "mobx"
import { Button } from "../button/button"
import { Grid, GridProps } from "../grid/grid"
import { padding } from "../padding/padding"
import { TextField } from "../text-field/textField"

const data = observable({
  count: 0,
  username: "enter username",
})

export function Home(props?: GridProps) {
  return function Home() {
    return Grid({
      direction: "column",
      container: true,
      children: [
        Grid(
          pipe(
            {
              container: true,
              children: [
                Button({
                  onClick: () => {
                    data.count++
                  },
                  label: () => `Count: ${data.count}`,
                }),
              ],
            } as GridProps,
            padding<GridProps>({ xs: 16 })
          )
        ),
        Switch({
          expression: () => data.count % 2 === 0,
          when: (value) => {
            return value
              ? domx({
                  tagName: "div",
                  children: ["10"],
                })
              : Grid({
                  children: ["20"],
                })
          },
        }),
        Grid(
          pipe(
            {
              container: true,
              children: [
                TextField({
                  label: Text({
                    data: () => "Username"
                  }),
                  value: () => data.username,
                  onChange: action((value) => {
                    data.username = value
                  }),
                }),
                TextField({
                  label: Text({
                    data: () => "Username copy"
                  }),
                  value: () => data.username,
                  onChange: action((value) => {
                    data.username = value
                  }),
                }),
              ],
            } as GridProps,
            padding<GridProps>({ xs: 16 })
          )
        ),
      ],
      ...props,
    })
  }
}
