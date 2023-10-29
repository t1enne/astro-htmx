import type { APIRoute } from "astro";
import myDB, { type IEntry } from "../../scripts/db";

export const GET: APIRoute = async ({}) => {
  return new Response("get request");
};

export const POST: APIRoute = async ({ url, request }) => {
  let SUCCESS = false;
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries()) as unknown as IEntry;
  const { id, fruit, size } = body;
  if (id) { // update existing
    SUCCESS = myDB.update(body);
  } else {
    SUCCESS = myDB.add(fruit, size);
  }
  if (SUCCESS) {
    return Response.redirect(url.origin + "/partials/fruit-table");
  }
  return new Response("Apples aren't accepted", {
    status: 404,
    statusText: "Failed to create entry",
  });
};

export const DELETE: APIRoute = async ({ url, request }) => {
  let SUCCESS = false;
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries()) as Pick<IEntry, "id">;
  if (body?.id) {
    SUCCESS = myDB.delete(body.id);
    console.log(myDB.rows);
    return Response.redirect(url.origin + "/partials/fruit-table");
  }

  return new Response("Can't delete what I don't have!", {
    status: 402,
    statusText: "Haven't found entry",
  });
};
