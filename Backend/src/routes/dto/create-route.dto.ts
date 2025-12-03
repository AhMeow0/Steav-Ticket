export class CreateRouteDto {
  routeNumber: string; // This was missing in your data!
  origin: string;
  destination: string;
  price: number;
  departureTime: string;
}
