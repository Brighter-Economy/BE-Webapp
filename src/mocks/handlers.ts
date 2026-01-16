import { delay, http, HttpResponse } from "msw";
import mockPlayerData from "../assets/MOCK_PLAYER_DATA.json";
import mockTransactionData from "../assets/MOCK_TRANSACTION_DATA.json";
import mockShopData from "../assets/MOCK_SHOP_DATA.json";
import type { UserAuthInfo } from "../components/types";

export const handlers = [
  http.get("/user-info", async ({ request }) =>
    wrapAuth(request, () => {
      const authHeader = request.headers.get("Authentication")!;
      const userInfoString = Buffer.from(
        authHeader.substring("Basic ".length),
        "base64"
      ).toString("utf-8");
      const username = userInfoString.split("=", 2)[0];
      return HttpResponse.json({
        username,
        type: "ADMIN",
        uuid: "3756dd61-e446-4ed1-8223-941c30c8febd",
      } as UserAuthInfo);
    })
  ),

  http.get("/api/accounts", ({ request }) =>
    wrapAuth(request, () => HttpResponse.json(mockPlayerData))
  ),

  http.get("/api/accounts/:uuid", ({ request, params }) =>
    wrapAuth(request, () => {
      const uuidParam = params.uuid;
      return HttpResponse.json(
        mockPlayerData.find(({ uuid }) => uuid === uuidParam)
      );
    })
  ),

  http.get("/api/accounts/:uuid/name", ({ request, params }) =>
    wrapAuth(request, () => {
      const uuidParam = params.uuid;
      return HttpResponse.json(
        mockPlayerData.find(({ uuid }) => uuid === uuidParam)?.username
      );
    })
  ),

  http.get("/api/accounts/:uuid/transactions", async ({ request, params }) =>
    wrapAuthAsync(request, async () => {
      const uuidParam = params.uuid;
      const searchParams = new URL(request.url).searchParams;
      const limitParam = searchParams.get("limit");
      const sortParam = searchParams.get("sort");

      let transactions = mockTransactionData.filter(
        ({ uuidFrom, uuidTo }) => uuidParam === uuidFrom || uuidParam === uuidTo
      );
      transactions =
        sortParam === "asc"
          ? transactions.sort((t1, t2) => t1.timestamp - t2.timestamp)
          : transactions.sort((t1, t2) => t2.timestamp - t1.timestamp);
      if (limitParam) transactions = transactions.slice(0, Number(limitParam));

      await delay();
      return HttpResponse.json(transactions);
    })
  ),

  http.get("/api/transactions", async ({ request }) =>
    wrapAuthAsync(request, async () => {
      const searchParams = new URL(request.url).searchParams;
      const limitParam = searchParams.get("limit");
      const sortParam = searchParams.get("sort");

      let transactions = mockTransactionData;
      transactions =
        sortParam === "asc"
          ? transactions.sort((t1, t2) => t1.timestamp - t2.timestamp)
          : transactions.sort((t1, t2) => t2.timestamp - t1.timestamp);
      if (limitParam) transactions = transactions.slice(0, Number(limitParam));

      await delay();
      return HttpResponse.json(transactions);
    })
  ),

  http.get("/api/transactions/:uuid", async ({ request, params }) =>
    wrapAuthAsync(request, async () => {
      const searchParams = new URL(request.url).searchParams;
      const limitParam = searchParams.get("limit");
      const sortParam = searchParams.get("sort");
      const uuidParam = params.uuid;

      let transactions = mockTransactionData.filter(
        ({ uuidFrom, uuidTo }) => uuidFrom === uuidParam || uuidTo === uuidParam
      );
      transactions =
        sortParam === "asc"
          ? transactions.sort((t1, t2) => t1.timestamp - t2.timestamp)
          : transactions.sort((t1, t2) => t2.timestamp - t1.timestamp);
      if (limitParam) transactions = transactions.slice(0, Number(limitParam));

      await delay();
      return HttpResponse.json(transactions);
    })
  ),

  http.get("/api/shops", async ({ request }) =>
    wrapAuthAsync(request, async () => {
      const searchParams = new URL(request.url).searchParams;
      const itemId = searchParams.get("itemId");

      let shops = mockShopData;
      if (itemId)
        shops = shops.filter(({ itemStack }) => itemStack.item == itemId);

      await delay();
      return HttpResponse.json(shops);
    })
  ),
];

function wrapAuth(request: Request, handler: () => Response): Response {
  const authHeader = request.headers.get("Authentication");
  if (authHeader && authHeader.startsWith("Basic ")) {
    return handler();
  } else {
    return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

function wrapAuthAsync(
  request: Request,
  handler: () => Promise<Response>
): Promise<Response> {
  const authHeader = request.headers.get("Authentication");
  if (authHeader && authHeader.startsWith("Basic ")) {
    return handler();
  } else {
    return new Promise(() =>
      HttpResponse.json({ error: "Unauthorized" }, { status: 401 })
    );
  }
}
