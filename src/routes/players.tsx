import { useContext } from "react";
import PlayerBalances from "../pages/PlayerBalances";
import { UserAuthInfoContext } from "../context";
import { Navigate } from "react-router";
import PlayerDetails from "../pages/PlayerDetails";
import type { Route } from "./+types/players";

export default function PlayersComponent({ params }: Route.ComponentProps) {
  const userIdParam = params.uuid;
  if (userIdParam) {
    return <PlayerDetails uuid={userIdParam} />;
  }

  const userInfo = useContext(UserAuthInfoContext);
  if (!userInfo) return () => <Navigate to="/login" />;

  switch (userInfo.type) {
    case "PLAYER":
      return <PlayerDetails uuid={userInfo.uuid} />;
    case "ADMIN":
      return <PlayerBalances />;
    default:
      return () => <Navigate to="/login" />;
  }
}
