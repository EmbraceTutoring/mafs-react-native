export const Theme = {
  foreground: "black",
  background: "white",

  red: "#f11d0e",
  orange: "#f14e0e",
  yellow: "#ffe44a",
  green: "#15e272",
  blue: "#58a6ff",
  indigo: "#7c58ff",
  violet: "#ae58ff",
  pink: "#ee00ab",

  mafsLineStrokeDashStyle: [4, 3]
};

export interface Filled {
  color?: string
  weight?: number
  fillOpacity?: number
  strokeOpacity?: number
  strokeStyle?: "solid" | "dashed"
}

export interface Stroked {
  color?: string
  opacity?: number
  weight?: number
  style?: "solid" | "dashed"
}