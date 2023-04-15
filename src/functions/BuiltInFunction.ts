/**
 * BuiltInFunction
 *
 * The built-in function type used to run a JavaScript function in C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import CFunction, {InvalidArgumentCountError} from "./CFunction";
import CValue from "../explicit-control-evaluator/CValue";
import CMemory from "../heap/CMemory";
import Converter from "../converter/Converter";

/**
 * The built-in function type used to run a JavaScript function in C
 */
export default class BuiltInFunction extends CFunction {
    private readonly built_in: (args: Array<unknown>) => unknown;
    private readonly return_converter: Converter<unknown>;
    private readonly args_converters: Array<Converter<unknown>>;

    /**
     * Constructs a new built-in function with the given lambda expression as well as converters for the arguments and
     * return values
     * @param built_in_function The built-in function that is to be run
     * @param return_converter The converter to convert the return value to a C value
     * @param args_converter The argument converter to convert arguments from one type to another
     */
    public constructor(built_in_function: (args: Array<unknown>) => unknown, return_converter: Converter<unknown>,
                       args_converter: Array<Converter<unknown>>) {
        super();
        this.built_in = built_in_function;
        this.return_converter = return_converter;
        this.args_converters = args_converter;
    }

    public run(memory: CMemory, args: Array<CValue>): CValue {
        if (args.length !== this.args_converters.length) {
            throw new InvalidArgumentCountError("Not enough arguments passed into the function");
        }
        const converted_args = args.map((value, index) => this.args_converters[index].convert_to_js(value));
        const return_val = this.built_in(converted_args);
        return this.return_converter.convert_to_c(return_val);
    }
}