# <img src="./src/logo.png" alt="logo" width="30"/> ChatGPT for Qwant


A browser extension to display ChatGPT response alongside Qwant (and other search engines) results

<!-- [Install from Chrome Web Store](https://chrome.google.com/webstore/detail/chatgpt-for-google/jgjaeacdkonaoafenlfkkkmbaopkbilf)

[Install from Mozilla Add-on Store](https://addons.mozilla.org/addon/chatgpt-for-google/) -->

## Screenshot

![Screenshot](screenshots/extension.png?raw=true)

## Features

- Supports all popular search engines
- Supports the official OpenAI API
- Supports ChatGPT Plus
- Markdown rendering
- Code highlights
- Dark mode
- Provide feedback to improve ChatGPT
- Copy to clipboard
- Custom trigger mode
- Switch languages

## Troubleshooting

### How to make it work in Brave

![Screenshot](screenshots/brave.png?raw=true)

Disable "Prevent sites from fingerprinting me based on my language preferences" in `brave://settings/shields`

## Build from source

1. Clone the repo
2. Install dependencies with `npm`
3. `npm run build`
4. Load `build/chromium/` or `build/firefox/` directory to your browser

## Credit

This project is inspired by [wong2/chat-gpt-google-extension](https://github.com/wong2/chat-gpt-google-extension)
