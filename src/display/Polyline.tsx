import { PolyBase, PolyBaseProps } from "./PolyBase"
import { Polyline as SVGPolyline, PolylineProps as SVGPolylineProps } from "react-native-svg"

export interface PolylineProps extends PolyBaseProps {
  svgPolylineProps?: SVGPolylineProps
}

export function Polyline({ fillOpacity = 0, svgPolylineProps, ...otherProps }: PolylineProps) {
  return (
    <PolyBase
      element={SVGPolyline}
      fillOpacity={fillOpacity}
      svgPolyProps={svgPolylineProps}
      {...otherProps}
    />
  )
}

Polyline.displayName = "Polyline"
