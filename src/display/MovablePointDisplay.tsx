import * as React from "react"
import { vec } from "../vec"
import { useTransformContext } from "../context/TransformContext"
import { Theme } from "./Theme"
import {
  G as SVGGroup,
  Circle as SVGCircle,
  CommonPathProps,
  GProps as SVGGroupProps,
} from "react-native-svg"

export interface MovablePointDisplayProps {
  color?: string
  ringRadiusPx?: number
  dragging: boolean
  point: vec.Vector2
}

// FIXME: Is the ref type correct?
export const MovablePointDisplay = React.forwardRef<SVGGroup<SVGGroupProps>, MovablePointDisplayProps>(
  (props: MovablePointDisplayProps, ref) => {
    const { color = Theme.pink, ringRadiusPx = 15, dragging, point } = props

    const { viewTransform, userTransform } = useTransformContext()

    const combinedTransform = React.useMemo(
      () => vec.matrixMult(viewTransform, userTransform),
      [viewTransform, userTransform],
    )

    const [xPx, yPx] = vec.transform(point, combinedTransform)

    return (
      <SVGGroup
        ref={ref}
        // style={
        //   {
        //     "--movable-point-color": color,
        //     "--movable-point-ring-size": `${ringRadiusPx}px`,
        //   } as React.CSSProperties
        // }
        // className={`mafs-movable-point ${dragging ? "mafs-movable-point-dragging" : ""}`}

        {...dragging && {
          // i think we can assume that if the user is dragging,
          // the element is :focus'd as well.
          r: `${ringRadiusPx}px`,
          ...mafsMovablePointFocusStyles(color),
        }}
        // tabIndex={0} // not supported
      >
        <SVGCircle
          fill="transparent"
          r={30}
          cx={xPx}
          cy={yPx}
        />
        <SVGCircle
          // className="mafs-movable-point-focus"
          {...mafsMovablePointFocusStyles(color)}
          r={ringRadiusPx + 1}
          cx={xPx}
          cy={yPx}
        />
        <SVGCircle
          // className="mafs-movable-point-ring"
          {...mafsMovablePointRingStyles(color)}
          r={ringRadiusPx}
          cx={xPx}
          cy={yPx}
        />
        <SVGCircle
          // className="mafs-movable-point-point"
          {...mafsMovablePointPointStyles(color)}
          r={6}
          cx={xPx}
          cy={yPx}
        />
      </SVGGroup>
    )
  },
)

export const mafsMovablePointFocusStyles = (color: string) => {
  const styles: Partial<CommonPathProps> = {
    stroke: color,
    strokeWidth: 2,
    strokeOpacity: 0.5,
    fill: "none",
    // transition: stroke-opacity 0.2s ease; // not supported
  }

  return styles;
}

export const mafsMovablePointRingStyles = (color: string) => {
  const styles: Partial<CommonPathProps> = {
    fill: color,
    fillOpacity: 0.25,
    stroke: "none",
    //  transition: r 0.2s ease; // not supported
  }

  return styles;
}

export const mafsMovablePointPointStyles = (color: string) => {
  const styles: Partial<CommonPathProps> = {
    fill: color,
    // transition: r 0.2s ease; // not supported
    // TODO: maybe we need to use react-native-reanimated
  }

  return styles;
}

MovablePointDisplay.displayName = "MovablePointDisplay"
