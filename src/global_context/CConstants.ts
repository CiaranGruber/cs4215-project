export enum ConstantType {
    CHAR_BIT,
    SCHAR_MIN,
    SCHAR_MAX,
    UCHAR_MAX,
    CHAR_MIN,
    CHAR_MAX,
    MB_LEN_MAX,
    SHRT_MIN,
    SHRT_MAX,
    USHRT_MAX,
    INT_MIN,
    INT_MAX,
    UINT_MAX,
    LONG_MIN,
    LONG_MAX,
    ULONG_MAX,
    LLONG_MIN,
    LLONG_MAX,
    ULLONG_MAX
}

class Constant {
    public readonly enum_val: ConstantType;
    public readonly name: string;
    public readonly value: bigint;

    public constructor(enum_val: ConstantType, name: string, value: bigint) {
        this.enum_val = enum_val;
        this.name = name;
        this.value = value;
    }
}

export default class CConstants {
    private static instance: CConstants;
    private readonly constants: Set<Constant>;

    private constructor() {
        this.constants = new Set<Constant>([
            new Constant(ConstantType.CHAR_BIT, "CHAR_BIT", BigInt(8)),
            new Constant(ConstantType.SCHAR_MIN, "SCHAR_MIN", BigInt(-127)),
            new Constant(ConstantType.SCHAR_MAX, "SCHAR_MAX", BigInt(127)),
            new Constant(ConstantType.UCHAR_MAX, "UCHAR_MAX", BigInt(255)),
            new Constant(ConstantType.MB_LEN_MAX, "MB_LEN_MAX", BigInt(1)),
            new Constant(ConstantType.SHRT_MIN, "SHRT_MIN", BigInt(-32767)),
            new Constant(ConstantType.SHRT_MAX, "SHRT_MAX", BigInt(32767)),
            new Constant(ConstantType.USHRT_MAX, "USHRT_MAX", BigInt(65535)),
            new Constant(ConstantType.INT_MIN, "INT_MIN", BigInt(-2147483647)),
            new Constant(ConstantType.INT_MAX, "INT_MAX", BigInt(2147483647)),
            new Constant(ConstantType.UINT_MAX, "UINT_MAX", BigInt(4294967295)),
            new Constant(ConstantType.LONG_MIN, "LONG_MIN", BigInt(-9223372036854775807)),
            new Constant(ConstantType.LONG_MAX, "LONG_MAX", BigInt(9223372036854775807)),
            new Constant(ConstantType.ULONG_MAX, "ULONG_MAX", BigInt(18446744073709551615)),
            new Constant(ConstantType.LLONG_MIN, "LLONG_MIN", BigInt(-9223372036854775807)),
            new Constant(ConstantType.LONG_MIN, "LLONG_MIN", BigInt(-9223372036854775807)),
            new Constant(ConstantType.LONG_MAX, "LLONG_MAX", BigInt(9223372036854775807)),
            new Constant(ConstantType.ULONG_MAX, "ULLONG_MAX", BigInt(18446744073709551615))
        ]);
    }

    private static get_instance(): CConstants {
        if (!CConstants.instance) {
            this.instance = new CConstants();
            this.instance.constants.add(new Constant(ConstantType.CHAR_MIN, "CHAR_MIN",
                this.get_constant(ConstantType.SCHAR_MIN).value));
            this.instance.constants.add(new Constant(ConstantType.CHAR_MAX, "CHAR_MAX",
                this.get_constant(ConstantType.UCHAR_MAX).value));
        }
        return CConstants.instance;
    }

    public static get constant_array(): Set<Constant> {
        return this.get_instance().constants;
    }

    public static get_constant(name: string): Constant;

    public static get_constant(enum_value: ConstantType): Constant;

    public static get_constant(value: ConstantType | string): Constant {
        const instance = this.get_instance();
        let return_val;
        if (typeof value === "string") {
            instance.constants.forEach((value_to_check) => {
                if (return_val) {
                    return;
                }
                if (value_to_check.name === value) {
                    return_val = value_to_check;
                }
            });
        } else {
            instance.constants.forEach((value_to_check) => {
                if (return_val) {
                    return;
                }
                if (value_to_check.enum_val === value) {
                    return_val = value_to_check;
                }
            });
        }
        return return_val;
    }
}