import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("/login", "./routes/login.tsx"),
  route("/auctions", "./routes/auctions.tsx"),
  route("/items", "./routes/items.tsx"),
  route("/players/:uuid?", "./routes/players.tsx"),
  route("/servershops", "./routes/shops.tsx"),
  route("/settings", "./routes/settings.tsx"),
  route("/kitty", "./routes/kitty.tsx"),
] satisfies RouteConfig;
