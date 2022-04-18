import { Attribute, AttributeType } from "../models/Attribute";

export const createAttributes = (attributes?: Generator<number>) => ({
    intelligence: new Attribute('intelligence', 'Intelligence', AttributeType.mental, attributes?.next().value ?? 1),
    wits: new Attribute('wits', 'Wits', AttributeType.mental, attributes?.next().value ?? 1),
    resolve: new Attribute('resolve', 'Resolve', AttributeType.mental, attributes?.next().value ?? 1),

    strength: new Attribute('strength', 'Strength', AttributeType.physical, attributes?.next().value ?? 1),
    dexterity: new Attribute('dexterity', 'Dexterity', AttributeType.physical, attributes?.next().value ?? 1),
    stamina: new Attribute('stamina', 'Stamina', AttributeType.physical, attributes?.next().value ?? 1),

    presence: new Attribute('presence', 'Presence', AttributeType.social, attributes?.next().value ?? 1),
    manipulation: new Attribute('manipulation', 'Manipulation', AttributeType.social, attributes?.next().value ?? 1),
    composture: new Attribute('composture', 'Composture', AttributeType.social, attributes?.next().value ?? 1),
})

export type AttributesObj = ReturnType<typeof createAttributes>
export type Atrribute = keyof AttributesObj;
export type Atrributes = Atrribute[];