import * as React from "react"
// import { Text as RNText } from "react-native";
import { vec } from "../vec"
import { useTransformContext } from "../context/TransformContext"
import { 
  CommonPathProps,
  Text as SVGText,
  TextProps as SVGTextProps,
} from "react-native-svg"
import { Theme } from "./Theme"

export type CardinalDirection = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"

export type TextProps = React.PropsWithChildren<{
  x: number
  y: number
  attach?: CardinalDirection
  attachDistance?: number
  size?: number
  color?: string
  svgTextProps?: SVGTextProps
}>

export function Text({
  children,
  x,
  y,
  color,
  size = 30,
  svgTextProps = {},
  attach,
  attachDistance = 0,
}: TextProps) {
  const { viewTransform: pixelMatrix, userTransform: transformContext } = useTransformContext()

  let xOffset = 0
  let textAnchor: SVGTextProps["textAnchor"] = "middle"
  if (attach?.includes("w")) {
    textAnchor = "end"
    xOffset = -1
  } else if (attach?.includes("e")) {
    textAnchor = "start"
    xOffset = 1
  }

  let yOffset = 0
  let alignmentBaseline: SVGTextProps["alignmentBaseline"] = "middle"
  if (attach?.includes("n")) {
    alignmentBaseline = "baseline"
    yOffset = 1
  } else if (attach?.includes("s")) {
    alignmentBaseline = "hanging"
    yOffset = -1
  }

  let [pixelX, pixelY] = [0, 0]
  if (xOffset !== 0 || yOffset !== 0) {
    ;[pixelX, pixelY] = vec.withMag([xOffset, yOffset], attachDistance)
  }

  const center = vec.transform([x, y], vec.matrixMult(pixelMatrix, transformContext))

  return (
    <SVGText
      x={center[0] + pixelX}
      y={center[1] + pixelY}
      fontSize={size}
      // dominantBaseline={dominantBaseline} // not supported
      alignmentBaseline={alignmentBaseline} // FIXME: is this the same thing?
      textAnchor={textAnchor}
      fill={color || Theme.foreground}
      vectorEffect="non-scaling-stroke"
      // style={{
      //   fill: color || "var(--mafs-fg)",
      //   vectorEffect: "non-scaling-stroke",
      // }}
      // className="mafs-shadow"
      {...mafsShadowStyles()}
      {...svgTextProps}
    >
      {children}
    </SVGText>
  )
}

export const mafsShadowStyles = () => {
  const styles: Partial<CommonPathProps> = {
    // paintOrder: "stroke", // not supported
    strokeWidth: 3,
    stroke: Theme.background,
    strokeOpacity: 0.75,
    strokeLinejoin: "round"
  }

  return styles;
}

Text.displayName = "Text"

export default Text
