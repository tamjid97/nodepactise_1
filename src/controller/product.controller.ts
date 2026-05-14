import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  // single product

  const urlParts = url?.split("/");
  // console.log(urlParts);

  const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  console.log("this is the actual id :", id);
// all
  if (url === "/products" && method === "GET") {
    const products = readProduct();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "this is product route", data: products }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    console.log(product);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "product succeefully", data: product }));
  }
};
