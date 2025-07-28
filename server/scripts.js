import marketJSON from "./data/marketItemJson.json" assert { type: "json" };
import marketJSON2 from "./data/marketItemJson2.json" assert { type: "json" };
import fs from "fs";

const items = marketJSON.data.items.data;
items.push(...marketJSON2.data.items.data);

const itemNames = items.map((item) => item.market_name);

fs.writeFileSync("marketItemNames.json", JSON.stringify(itemNames));
