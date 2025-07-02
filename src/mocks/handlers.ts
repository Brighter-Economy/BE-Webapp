import { delay, http, HttpResponse } from "msw";
import mockPlayerData from "../assets/MOCK_PLAYER_DATA.json";
import mockTransactionData from "../assets/MOCK_TRANSACTION_DATA.json";
import mockShopData from "../assets/MOCK_SHOP_DATA.json";

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

  http.get("/api/accounts/:uuid/name", ({ params }) => {
    const uuidParam = params.uuid;
    return HttpResponse.json(
      mockPlayerData.find(({ uuid }) => uuid === uuidParam)?.username
    );
  }),

  http.get("/api/accounts/:uuid/transactions", async ({ request, params }) => {
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
  }),

  http.get("/api/transactions", async ({ request }) => {
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
  }),

  http.get("/api/transactions/:uuid", async ({ request, params }) => {
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
  }),

  http.get("/api/shops", async ({ params }) => {
    await delay();
    return HttpResponse.json(mockShopData);
  }),
];
