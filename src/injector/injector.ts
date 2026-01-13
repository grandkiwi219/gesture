import { scriptInjection } from "src/main/utils/assets";

void function main() {
    if (window.top == window) return;

    scriptInjection(document.documentElement, 'src/generator.js');
}();
