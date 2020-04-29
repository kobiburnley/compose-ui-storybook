import { Jss, Styles } from "jss"

export interface WithStylesProps<Name extends string | number | symbol> {
  jss: Jss
  style: Partial<Styles<Name>>
}
export function withStyles<Name extends string | number | symbol>({
  jss,
  style
}: WithStylesProps<Name>) {
  const stylesheet = jss.createStyleSheet(style).attach()
  return {
    disposer: () => stylesheet.detach(),
    classes: stylesheet.classes
  }
}

export function createStyles<Name extends string | number | symbol>(
  styles: Partial<Styles<Name>>
): Partial<Styles<Name>> {
  return styles
}
