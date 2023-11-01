import type { Fruit } from "@prisma/client";
import type { APIRoute } from "astro";
import { prisma } from "../../../prisma/seed";

export const GET: APIRoute = async ({}) => {
  return new Response("get request");
};

export const POST: APIRoute = async ({ url, request }) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries()) as unknown as Fruit;
  let savedFruit: Fruit;
  if (body.id) {
    savedFruit = await prisma.fruit.update({
      data: {
        ...body,
        isEaten: Boolean(body.isEaten),
      },
      where: {
        id: body.id,
      },
    });
  } else {
    savedFruit = await prisma.fruit.create({
      data: { ...body, isEaten: Boolean(body.isEaten), id: undefined },
    });
  }

  if (Boolean(savedFruit)) {
    return Response.redirect(url.origin + "/fruits/partials/fruit-table");
  }
  return new Response("Apples aren't accepted", {
    status: 404,
    statusText: "Failed to create entry",
  });
};

export const DELETE: APIRoute = async ({ url, request }) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries()) as unknown as Fruit;
  if (body?.id) {
    await prisma.fruit.delete({ where: { id: body.id } });
    return Response.redirect(url.origin + "/fruits/partials/fruit-table");
  }

  return new Response("Can't delete what I don't have!", {
    status: 402,
    statusText: "Haven't found entry",
  });
};
