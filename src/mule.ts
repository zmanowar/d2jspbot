import { Item } from "./interfaces";
import * as fs from "fs";
import * as path from "path";

/**
 * WIP: Loading in mule items. Unsure what the data structure will be for now.
 */
export class Mule {
  public items: [{ item: Item; price: number }];

  constructor(config) {
    fs.readdir(config.mulepath, function(err, files) {
      const txtFiles = files.filter(el => /\.txt$/.test(el));
      txtFiles.forEach(file => {
        fs.readFileSync(path.join(config.mulepath, file), "utf-8")
          .split(/\r?\n/)
          .forEach(function(line) {
            JSON.parse(line) as Item;
          });
      });
    });
  }
}
