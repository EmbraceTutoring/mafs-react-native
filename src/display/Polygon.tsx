import { PolyBase, PolyBaseProps } from "./PolyBase"
import { PolygonProps as SVGPolygonProps, Polygon as SVGPolygon } from "react-native-svg"

export interface PolygonProps extends PolyBaseProps {
  svgPolygonProps?: SVGPolygonProps
}

export function Polygon({ svgPolygonProps, ...otherProps }: PolygonProps) {
  return <PolyBase
    element={SVGPolygon} // FIXME: dear lord there has got to be a better way
    svgPolyProps={svgPolygonProps}
    {...otherProps}
  />
}

Polygon.displayName = "Polygon"
