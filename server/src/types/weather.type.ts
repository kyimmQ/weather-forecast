export interface WeatherType {
  location: string;
  date: string;
  temp: number;
  condition: {
    text: string;
    icon: string;
  };
  wspeed: number;
  humidity: number;
  uv: string;
  vision: number;
}
