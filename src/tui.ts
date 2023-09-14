type Options = {
  fontSize: number;
  fontFamily: number;
};

const defaultOptions = {
  fontSize: 18,
  fontFamily: 18,
};

export class TerminalUI {
  options: Options;
  element: HTMLElement | null;
  prompt: string;
  history: string[];
  currentLineIndex: number;
  currentCharIndex: number;
  currentInput: string;
  currentElement: null | HTMLElement;

  constructor(options: Options = defaultOptions) {
    this.options = options;
    this.element = null;
    this.prompt = "$ ";
    this.history = [];
    this.currentCharIndex = 0;
    this.currentLineIndex = 0;

    this.currentInput = "";
    this.currentElement = null;
  }
  attach(element: HTMLElement) {
    this.element = element;

    this.currentElement = document.createElement("div");
    this.currentElement.id = "current-element";

    this.element.appendChild(this.currentElement);

    this.setupListeners();
  }
  setPrompt(prompt: string) {
    this.prompt = prompt;
  }
  private updateCurrentInput(value: string) {
    if (!this.currentElement) {
      return;
    }

    this.currentInput = value;

    this.currentElement.innerHTML = "";

    value.split("").forEach((char, i) => {
      const container = document.createElement("span");
      container.innerText = char;
      container.className = "char";
      if (i === this.currentCharIndex) {
        container.classList.add("active");
      }
      this.currentElement?.appendChild(container);
    });
  }
  private setupListeners() {
    if (!this.element) {
      return;
    }
    this.element.focus();
    this.element.onblur = () => this.element?.focus();
    this.element.addEventListener("keyup", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();

      switch (true) {
        case e.key.length === 1: {
          this.updateCurrentInput(this.currentInput + e.key);
          break;
        }
        case e.key === "ArrowLeft": {
          this.currentCharIndex -= 1;
          this.updateCurrentInput(this.currentInput);
          break;
        }
        case e.key === "ArrowRight": {
          this.currentCharIndex += 1;
          this.updateCurrentInput(this.currentInput);
          break;
        }
      }
    });
  }
}
