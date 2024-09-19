import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CarPart {
  'pid' : string,
  'title' : string,
  'description' : string,
  'avgCost' : number,
  'stock' : bigint,
  'units' : string,
}
export interface _SERVICE {
  'addCarPart' : ActorMethod<[CarPart], undefined>,
  'deleteCarPart' : ActorMethod<[string], boolean>,
  'getAllCarParts' : ActorMethod<[], Array<CarPart>>,
  'searchCarParts' : ActorMethod<[string], Array<CarPart>>,
  'updateCarPart' : ActorMethod<[CarPart], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
