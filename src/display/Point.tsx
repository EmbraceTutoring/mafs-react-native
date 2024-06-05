import { useTransformContext } from "../context/TransformContext"
import { Theme } from "./Theme"
import { vec } from "../vec"
import { Circle as SVGCircle, CircleProps as SVGCircleProps } from "react-native-svg";

export interface PointProps {
  x: number
  y: number
  color?: string
  opacity?: number
  svgCircleProps?: SVGCircleProps
}

export function Point({
  x,
  y,
  color = Theme.foreground,
  opacity = 1,
  svgCircleProps = {},
}: PointProps) {
  const { viewTransform: pixelMatrix, userTransform: transform } = useTransformContext()

  const [cx, cy] = vec.transform([x, y], vec.matrixMult(pixelMatrix, transform))

  return (
    <SVGCircle
      cx={cx}
      cy={cy}
      r={6}
      opacity={opacity}
      fill={color}
      {...svgCircleProps}
    // style={{ fill: color, opacity, ...svgCircleProps.style }}
    />
  )
}

Point.displayName = "Point"
