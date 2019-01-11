import { Type } from './type';


export interface Account {
    id: number;
    description: string;
    TypeId: number;
    type: Type;
}
