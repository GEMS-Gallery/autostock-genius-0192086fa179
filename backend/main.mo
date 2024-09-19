import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import Result "mo:base/Result";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";

actor {
  // Define the CarPart type
  type CarPart = {
    pid: Text;
    title: Text;
    description: Text;
    stock: Nat;
    units: Text;
    avgCost: Float;
  };

  // Create a stable variable to store the state
  private stable var carPartsEntries : [(Text, CarPart)] = [];

  // Initialize the HashMap with the stable variable
  private var carParts = HashMap.HashMap<Text, CarPart>(0, Text.equal, Text.hash);

  // System functions for upgrades
  system func preupgrade() {
    carPartsEntries := Iter.toArray(carParts.entries());
  };

  system func postupgrade() {
    carParts := HashMap.fromIter<Text, CarPart>(carPartsEntries.vals(), 1, Text.equal, Text.hash);
  };

  // Add a new car part
  public func addCarPart(part: CarPart) : async () {
    Debug.print("Adding part: " # debug_show(part));
    carParts.put(part.pid, part);
  };

  // Get all car parts
  public query func getAllCarParts() : async [CarPart] {
    Debug.print("Getting all parts");
    return Iter.toArray(carParts.vals());
  };

  // Search car parts by title
  public query func searchCarParts(searchQuery: Text) : async [CarPart] {
    Debug.print("Searching for: " # searchQuery);
    let searchResults = Iter.filter(carParts.vals(), func (part: CarPart) : Bool {
      return Text.contains(Text.toLowercase(part.title), #text(Text.toLowercase(searchQuery)));
    });
    return Iter.toArray(searchResults);
  };

  // Update a car part
  public func updateCarPart(part: CarPart) : async Bool {
    Debug.print("Updating part: " # debug_show(part));
    switch (carParts.get(part.pid)) {
      case (null) { 
        Debug.print("Part not found");
        return false; 
      };
      case (?_) {
        carParts.put(part.pid, part);
        return true;
      };
    };
  };

  // Delete a car part
  public func deleteCarPart(pid: Text) : async Bool {
    Debug.print("Deleting part with PID: " # pid);
    switch (carParts.remove(pid)) {
      case (null) { 
        Debug.print("Part not found");
        return false; 
      };
      case (?_) { return true; };
    };
  };
}
