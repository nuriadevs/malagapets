// shared/cards/index.ts

export {
  BaseCard,
  CardContent,
  CardFooter,
} from "@/components/shared/cards/BaseCard";

export {
  CardSkeleton,
  CardSkeletonList,
} from "@/components/shared/cards/CardSkeleton";

export {
  InfoItem,
  ServiceBadge,
  SectionDivider,
  BooleanBadge,
} from "@/components/shared/cards/CardAtoms";

export { BeachCard } from "@/components/shared/card-variants/beach/BeachCard";
export { BeachInfoItems } from "@/components/shared/card-variants/beach/BeachInfoItems";
export { ParkCard } from "@/components/shared/card-variants/park/ParkCard";
export { VetCard } from "@/components/shared/card-variants/vet/VetCard";

export type {
  BaseCardProps,
  CardSkeletonProps,
  InfoItemProps,
  DirectoryVariant,
} from "./card.types";

export type {
  BeachCardData,
  ParkCardData,
  VetCardData,
  AnyCardData,
} from "@/types/cards";
