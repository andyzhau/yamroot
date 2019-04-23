import { A7Model, Config, Default, Optional, DBRef } from '@nodeswork/sbase/mongoose';

import { IDBRef } from './declarations';
import * as models from '.';

@Config({
  id: false,
  collection: 'trackings.requests',
})
export class Requests extends A7Model {
  @Optional() te: string;
  @Optional() ip: string;
  @Optional() zone: string;
  @Optional() channel: string;
  @Optional() userAgent: string;
  @Default(0) seq: number;

  get params() {
    return `rid=${this._id}&te=${this.te}&zone=${this.zone}&channel=${
      this.channel
    }&seq=${this.seq}`;
  }
}

@Config({
  id: false,
  collection: 'trackings.details',
})
export class Details extends A7Model {
  @Optional() te: string;
  @Optional() ip: string;

  @DBRef('Requests')
  request: IDBRef<models.Requests>;

  @Optional() type: string;
}

@Config({
  id: false,
  collection: 'trackings.connections',
})
export class Connections extends A7Model {
  @DBRef('Requests')
  request: IDBRef<models.Requests>;

  @Optional() ip: string;
}
