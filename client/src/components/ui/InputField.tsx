import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "./input";
import { GenericInputFieldType } from "@/lib/Types";

const InputField = ({
  name,
  type,
  errors,
  HandleOnChangeInput,
  data,
  required,
  placeholder,
}: GenericInputFieldType) => {
  return (
    <div className="space-y-1">
      <Label id={name} className="capitalize font-medium">
        {name.split("_").join(" ")}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        name={name}
        value={data[name]}
        onChange={HandleOnChangeInput}
        placeholder={placeholder}
      />
      {errors[name] && (
        <span className="text-sm text-red-500">{errors[name]}</span>
      )}
    </div>
  );
};

export default InputField;
