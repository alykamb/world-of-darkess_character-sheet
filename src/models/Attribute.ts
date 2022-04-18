import { IncreseablePoint } from "./IncreaseablePoint";

export enum AttributeType {
    mental = 'mental',
    physical = 'physical',
    social = 'social',
}

export class Attribute extends IncreseablePoint {
    constructor(public name: string, public label: string, public type: AttributeType, public value = 0) {
        super(value, 5, 5);
    }

    public clone() {
        return new Attribute(this.name, this.label, this.type, this.value)
    }

    public mergeClone(arg: Partial<Attribute> = {}) {
        return new Attribute(
            arg?.name ?? this.name,
            arg?.label ?? this.label,
            arg?.type ?? this.type,
            arg?.value ?? this.value
        )
    }

    static fromAttributeAndValue(attribute: Attribute, value: number) {
        return new Attribute(attribute.name, attribute.label, attribute.type, value)
    }
}