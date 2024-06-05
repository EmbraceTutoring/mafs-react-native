import * as React from "react"
import { Stroked } from "../display/Theme"
import { Theme } from "./Theme"
import { vec } from "../vec"
import { useTransformContext } from "../context/TransformContext"

import {
  Defs as SVGDefs,
  Marker as SVGMarker,
  Line as SVGLine,
  LineProps as SVGLineProps,
  Path as SVGPath
} from "react-native-svg";

// This is sort of a hack—every SVG pattern on a page needs a unique ID, otherwise they conflict.
let incrementer = 0

export interface VectorProps extends Stroked {
  tail?: vec.Vector2
  tip: vec.Vector2
  svgLineProps?: SVGLineProps
}

export function Vector({
  tail = [0, 0],
  tip,
  color = Theme.foreground,
  weight = 2,
  style = "solid",
  opacity = 1.0,
  svgLineProps = {},
}: VectorProps) {
  const { userTransform, viewTransform } = useTransformContext()
  const combinedTransform = vec.matrixMult(viewTransform, userTransform)

  const pixelTail = vec.transform(tail, combinedTransform)
  const pixelTip = vec.transform(tip, combinedTransform)

  const id = React.useMemo(() => `mafs-triangle-${incrementer++}`, [])

  return (
    <>
      <SVGDefs>
        <SVGMarker
          id={id}
          markerWidth="8"
          markerHeight="8"
          refX="8"
          refY="4"
          orient="auto"
        >
          <SVGPath
            d="M 0 0 L 8 4 L 0 8 z"
            fill={color || Theme.foreground}
            strokeWidth={0}
          />
        </SVGMarker>
      </SVGDefs>
      <SVGLine
        x1={pixelTail[0]}
        y1={pixelTail[1]}
        x2={pixelTip[0]}
        y2={pixelTip[1]}
        strokeWidth={weight}
        markerEnd={`url(#${id})`}
        {...svgLineProps}
        stroke={color || Theme.foreground}
        strokeDasharray={style === "dashed" ? Theme.mafsLineStrokeDashStyle : undefined}
        fill={color}
        strokeOpacity={opacity}
        vectorEffect="non-scaling-stroke"
        // style={{
        //   stroke: color || "var(--mafs-fg)",
        //   strokeDasharray: style === "dashed" ? "var(--mafs-line-stroke-dash-style)" : undefined,
        //   fill: color,
        //   strokeOpacity: opacity,
        //   ...(svgLineProps?.style || {}),
        //   vectorEffect: "non-scaling-stroke",
        // }}
      />
    </>
  )
}

Vector.displayName = "Vector"
