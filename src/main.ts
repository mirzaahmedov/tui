import { TerminalUI } from "./tui";

const tui = new TerminalUI();

const container = document.getElementById("terminal");

if (container) {
  tui.attach(container);
}
