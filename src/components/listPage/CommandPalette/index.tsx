import { CommandProvider } from "./CommandContext";
import Palette from "./CommandPalette";
export default function CommandPalette() {
  return (
    <CommandProvider>
      <Palette></Palette>
    </CommandProvider>
  );
}
