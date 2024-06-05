import { Filled, Theme } from "./Theme"
import { useTransformContext } from "../context/TransformContext"
import { vec } from "../vec"
import { Ellipse as SVGEllipse, EllipseProps as SVGEllipseProps } from "react-native-svg";

export interface EllipseProps extends Filled {
  center: vec.Vector2
  radius: vec.Vector2
  angle?: number
  svgEllipseProps?: SVGEllipseProps
}

export function Ellipse({
  center,
  radius,
  angle = 0,
  strokeStyle = "solid",
  strokeOpacity = 1.0,
  weight = 2,
  color = Theme.foreground,
  fillOpacity = 0.15,
  svgEllipseProps = {},
}: EllipseProps) {
  const { viewTransform: toPx, userTransform } = useTransformContext()

  const transform = vec
    .matrixBuilder()
    .translate(...center)
    .mult(userTransform)
    .scale(1, -1)
    .mult(toPx)
    .scale(1, -1)
    .get()

  const cssTransform = `
    ${vec.toCSS(transform)}
    rotate(${angle * (180 / Math.PI)})
  `

  return (
    <SVGEllipse
      cx={0}
      cy={0}
      rx={radius[0]}
      ry={radius[1]}
      strokeWidth={weight}
      transform={cssTransform}
      stroke={color}
      strokeDasharray={strokeStyle === "dashed" ? Theme.mafsLineStrokeDashStyle : undefined}
      fill={color}
      fillOpacity={fillOpacity}
      strokeOpacity={strokeOpacity}
      vectorEffect="non-scaling-stroke"
      {...svgEllipseProps}
    />
  )
}

Ellipse.displayName = "Ellipse"
