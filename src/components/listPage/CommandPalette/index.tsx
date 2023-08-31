import { CommandProvider } from "./CommandContext";
import Palette from "./CommandPalette";
import KeyHandler from "./KeyHandler";
export default function CommandPalette() {
    return (
        <CommandProvider>
            <KeyHandler>
                <Palette></Palette>
            </KeyHandler>
        </CommandProvider>
    );
}
