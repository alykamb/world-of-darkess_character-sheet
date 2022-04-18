import { createAttributes } from "../constants/attributes"
import type { Attribute } from "./Attribute"

export class Character {
    public name: string = '';
    public age?: number;
    public xp: number = 0;
    public attributes: Record<string, Attribute> = createAttributes()

    public get attributesList(): [string,Attribute][] {
        return Object.entries(this.attributes)
    }
}