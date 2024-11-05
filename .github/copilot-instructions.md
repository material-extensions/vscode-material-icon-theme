# Copilot instructions

To contribute effectively to this project, follow these guidelines:

1. **Follow the Project Style**: Ensure all changes adhere to the existing code and documentation style. Review the [project's codebase](/) to understand the conventions used.
2. **Use Material Design color palette**: When working with icons, use colors from the [Material Design color palette](/material-colors.yml). This ensures visual consistency across the project.
3. **Adhere to the Project Architecture**: Familiarize yourself with the [project's architecture](/src/architecture.md). The core logic is separated from the extension logic. The core handles icon manifest generation, icon associations, and translation. The extension interacts with the VS Code API. Make sure to respect the dependency rules between modules.
4. **Design Pixel-Perfect Icons**: Create icons that are sharp and clear at 16x16 pixels. Align icons to a **16x16 grid** to ensure sharpness and avoid blurriness. More details are available in the [CONTRIBUTING.md](/CONTRIBUTING.md#pixel-perfect-icons).
5. **Write Clean, Modular, and Well-Documented Code**: Document your code thoroughly and ensure it is easy to understand and maintain.
6. **Test Your Changes**: Always test your changes to ensure they do not break existing functionality.
7. **Keep It Simple**: Aim for simplicity in your solutions and avoid unnecessary complexity.
8. **Add New Icons Appropriately**:

- Use colors from the [Material Design color palette](https://material.io/design/color/the-color-system.html).
- Ensure icons have proper spacing (Read [CONTRIBUTING.md](/CONTRIBUTING.md#icon-spacing)).
- Assign icons uniquely to file names, extensions, or folder names according to the [project guidelines](/CONTRIBUTING.md).
- Provide separate icons for different color themes if necessary (Read [CONTRIBUTING.md](/CONTRIBUTING.md#icons-for-color-themes)).

9. **Clone Existing Icons When Possible**: If you need a variant of an existing icon with a different color, clone the icon through configuration without creating a new SVG (Read [CONTRIBUTING.md](/CONTRIBUTING.md#icon-cloning)).
10. **Contribute to Translations**: If you notice errors in translations, you can help fix them by editing the appropriate translation files (`package.nls*.json`).

Always ensure that your contributions comply with the project's guidelines and do not introduce any disallowed content.
