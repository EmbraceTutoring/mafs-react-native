import { Filled } from "./Theme"
import { Ellipse } from "./Ellipse"
import { vec } from "../vec"
import type { EllipseProps as SVGEllipseProps } from "react-native-svg"

export interface CircleProps extends Filled {
  center: vec.Vector2
  radius: number
  svgEllipseProps?: SVGEllipseProps
}

export function Circle({ radius, ...rest }: CircleProps) {
  return <Ellipse radius={[radius, radius]} {...rest} />
}

Circle.displayName = "Circle"
