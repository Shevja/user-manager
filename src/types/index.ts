export interface CityOption {
    label: string;
    value: string;
}

export interface User {
    key: number;
    name: string;
    age: number | null;
    city: string;
}