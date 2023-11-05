# Bookies

Bookies is a browser extension that provides a convenient way to manage and personalize your favorite links, making them easily accessible through your browser's context menu or through your browser's pinned extensions toolbar.

## Getting Started

These are the basic steps to clone the repository correctly and start using the extension right away:

1. **Clone the Repository**:
    - To get a local copy of the extension, you need to clone the project repository using the following command:

    ```bash
    git clone https://github.com/beingsie/bookies.git && cd bookies/bookies
    ```

2. **Install Tailwind CSS**:
    - To set up the necessary styles for the extension, you'll need to install Tailwind CSS. Use the following command to do so:

    ```bash
    npm install -D tailwindcss
    ```

3. **Start Tailwind CLI Build Process** (Optional):
    - If you plan to modify the extension's styling, you can initiate the Tailwind CSS build process. Run the following command to watch for changes and automatically update the CSS:

    ```bash
    npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
    ```

4. **Load the Extension**:
    - After installing Tailwind and potentially modifying the styling, you can load the extension into your browser:

        - Unpack the extension from your browser extension manager.
        - Select the ***second*** `bookies` directory to load the extension.
    
5. **Pin** Bookies to your browser extensions toolbar.

Now you can start using the Bookies browser extension to conveniently manage your favorite links!

## License

This project is licensed under the MIT License. You are permitted to use, copy, modify, distribute, sublicense, and sell copies of the software. See the [LICENSE](LICENSE) file for details.