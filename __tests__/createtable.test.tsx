import { expect, test } from "vitest";
import { GET } from "../src/app/api/create-table-deskchampions"; // Assuming your file is named createtable.ts
import fetchMock from "jest-fetch-mock";

test("GET function creates the FinalStandings table", async () => {
  // Mocking the sql function from @vercel/postgres
  fetchMock.mockResponseOnce(JSON.stringify({ result: "Table created successfully" }));

  // Mocking the Request object
  const request: Request = new Request("http://example.com");

  // Calling the GET function
  const response = await GET(request);

  // Asserting that the response is correct
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ result: "Table created successfully" });

  // Asserting that the sql function was called with the correct query
  expect(fetchMock.mock.calls.length).toBe(1);
  expect(fetchMock.mock.calls[0][0]).toMatchInlineSnapshot(`
    "CREATE TABLE FinalStandings ( Team varchar(255), Wins varchar(50), Draws varchar(50), Loses varchar(50), Goal_Difference varchar(50), Points varchar(100)  );"
  `);
});
