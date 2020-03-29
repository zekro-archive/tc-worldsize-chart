/** @format */

import { WorldSizeDataPoint } from '../models/worldsize';

export interface IAPIProvider {
  getWorldSizes(from: Date, to: Date): Promise<WorldSizeDataPoint[]>;
}
