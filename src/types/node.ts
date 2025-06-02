export interface Node {
  ID: string;
  CPU: number;
  GPU: number;
  RAM: number;
  Online: boolean;
  ConnectedSince: number;
  CountryCode: string;
  Region: string;
  City: string;
  Latitude: number;
  Longitude: number;
}