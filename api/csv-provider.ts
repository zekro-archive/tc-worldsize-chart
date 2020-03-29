/** @format */

import fs from 'fs';
import { IAPIProvider } from './provider';
import { WorldSizeDataPoint } from '../models/worldsize';

export class CSVAPIProvider implements IAPIProvider {
  private csvFileLoc: string;

  constructor() {
    this.csvFileLoc = process.env.DATA_LOCATION;
    console.log(this.csvFileLoc);
  }

  public getWorldSizes(from: Date, to: Date): Promise<WorldSizeDataPoint[]> {
    // TODO: data fetching currently ignores from and
    //       to parameters for testing purposes
    return new Promise((resolve, reject) => {
      fs.readFile(this.csvFileLoc, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const sData = data.toString('utf8');
        const fData = sData
          .split('\n')
          .filter((line) => line.length > 0 && line.includes(','))
          .map((line) => {
            const lineTuple = line.split(',');
            return {
              date: lineTuple[0],
              sizeb: parseInt(lineTuple[1], 10),
            } as WorldSizeDataPoint;
          });

        resolve(fData);
      });
    });
  }
}
