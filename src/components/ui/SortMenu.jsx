import { ArrowDownUp } from "lucide-react";
import Select from "./Select";

const SortMenu = ({ options, value, onChange, label = "Sort" }) => (
  <Select
    variant="pill"
    align="right"
    options={options}
    value={value}
    onChange={onChange}
    label={label}
    menuHeading={label}
    icon={<ArrowDownUp className="h-3.5 w-3.5 text-[var(--color-wood)]" />}
  />
);

export default SortMenu;
