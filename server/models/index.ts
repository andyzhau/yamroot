import {
  Requests as _Requests,
  Connections as _Connections,
  Details as _Details,
} from './trackings';

export const Requests = _Requests.$registerA7Model<
  _Requests,
  typeof _Requests
>();
export type Requests = _Requests;
export const Connections = _Connections.$registerA7Model<
  _Connections,
  typeof _Connections
>();
export type Connections = _Connections;
export const Details = _Details.$registerA7Model<
_Details,
typeof _Details
>();
export type Details = _Details;
