import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";

const ThemeToggler = () => {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    setState(localStorage.getItem("theme") === "light");
  }, []);
  useEffect(() => {
    document.documentElement?.setAttribute("class", state ? "dark" : "light");
  }, [state]);
  const onValueChange = (value: boolean) => {
    setState(value);
    localStorage.setItem("theme", value ? "dark" : "light");
  };

  return (
    <Toggle
      aria-label="Toggle bold"
      size={"lg"}
      variant={"outline"}
      pressed={state} // Use `pressed` to control the toggle state
      onPressedChange={onValueChange} // Use `onPressedChange` for state updates
    >
      {state ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Toggle>
  );
};

export default ThemeToggler;
