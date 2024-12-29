import { http, HttpResponse } from "msw";
import mockPlayerData from "../assets/MOCK_PLAYER_DATA.json";

export const handlers = [
  http.get("/api/accounts", () => {
    return HttpResponse.json(mockPlayerData);
  }),

  http.get("/api/accounts/:uuid", ({ params }) => {
    const uuidParam = params.uuid;
    return HttpResponse.json(
      mockPlayerData.find(({ uuid }) => uuid === uuidParam)
    );
  }),
];
