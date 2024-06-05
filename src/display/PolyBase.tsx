import { Filled, Theme } from "./Theme"
import { vec } from "../vec"
import { useTransformContext } from "../context/TransformContext"
import {
  Polygon as SVGPolygon,
  PolygonProps as SVGPolygonProps,
  Polyline as SVGPolyline,
  PolylineProps as SVGPolylineProps,
} from "react-native-svg";

type SVGPolyProps<T extends "polygon" | "polyline"> = T extends "polygon"
  ? SVGPolygonProps
  : SVGPolylineProps

export interface PolyBaseProps extends Filled {
  points: vec.Vector2[]
}

interface PolyBaseInternalProps<T extends "polygon" | "polyline"> extends PolyBaseProps {
  element: T extends "polygon" ? typeof SVGPolygon : typeof SVGPolyline
  svgPolyProps?: SVGPolyProps<T>
}

export function PolyBase({
  element: PolyElement,
  points,
  color = Theme.foreground,
  weight = 2,
  fillOpacity = 0.15,
  strokeOpacity = 1.0,
  strokeStyle = "solid",
  svgPolyProps = {},
}: PolyBaseInternalProps<"polygon"> | PolyBaseInternalProps<"polyline">) {
  const { userTransform, viewTransform } = useTransformContext();

  const viewTransformCSS = vec.toCSS(viewTransform);
  // i hope i used this correctly

  const scaledPoints = points
    .map((point) => vec.transform(point, userTransform).join(" "))
    .join(" ")

  return (
    <PolyElement
      points={scaledPoints}
      strokeWidth={weight}
      fillOpacity={fillOpacity}
      strokeLinejoin="round"
      {...svgPolyProps}
      fill={color}
      opacity={fillOpacity} // FIXME: Is this the same thing?
      // fillOpacity={fillOpacity} // does not exist
      stroke={color}
      strokeDasharray={strokeStyle === "dashed" ? Theme.mafsLineStrokeDashStyle : undefined}
      strokeOpacity={strokeOpacity}
      vectorEffect="non-scaling-stroke"
      // transform="var(--mafs-view-transform)"
      transform={viewTransformCSS} // 🤞
      // style={{
      //   fill: color,
      //   fillOpacity,
      //   stroke: color,
      //   strokeDasharray:
      //     strokeStyle === "dashed" ? "var(--mafs-line-stroke-dash-style)" : undefined,
      //   strokeOpacity,
      //   vectorEffect: "non-scaling-stroke",
      //   transform: "var(--mafs-view-transform)",
      //   // ...(svgPolyProps.style || {}),
      // }}
    />
  )
}
