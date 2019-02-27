import { Type } from './type';


export interface Account {
    id: number;
    description: string;
    typeId: number;
    type: Type;
    budget: number;
    isActive: boolean;
}
