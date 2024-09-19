export const idlFactory = ({ IDL }) => {
  const CarPart = IDL.Record({
    'pid' : IDL.Text,
    'title' : IDL.Text,
    'description' : IDL.Text,
    'avgCost' : IDL.Float64,
    'stock' : IDL.Nat,
    'units' : IDL.Text,
  });
  return IDL.Service({
    'addCarPart' : IDL.Func([CarPart], [], []),
    'deleteCarPart' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'getAllCarParts' : IDL.Func([], [IDL.Vec(CarPart)], ['query']),
    'searchCarParts' : IDL.Func([IDL.Text], [IDL.Vec(CarPart)], ['query']),
    'updateCarPart' : IDL.Func([CarPart], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
