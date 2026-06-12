import type { BeachCardData, ParkCardData, VetCardData } from "@/types/cards";

export type FilterValue = "all" | "parks" | "beaches" | "vets";

export type ParkItem  = { kind: "park";  data: ParkCardData  };
export type BeachItem = { kind: "beach"; data: BeachCardData };
export type VetItem   = { kind: "vet";   data: VetCardData   };
export type AnyItem   = ParkItem | BeachItem | VetItem;