# Chrome Extension Template

A modern template for building Chrome Extensions with Webpack, Bootstrap and good project structure.

## Features

- 🚀 Modern Chrome Extension Manifest V3
- ⚡️ Webpack 5 for bundling
- 🎨 Bootstrap 5 for UI components
- 📦 Environment configuration support
- 🔧 Hot reload during development

## Project Structure

```
├── public/                 # Static assets
│   ├── assets/            # Images, icons etc
│   ├── manifest.*.json    # Environment specific manifests
│   └── style.css         # Global styles
├── src/
│   ├── background.js     # Service worker
│   ├── content.js        # Content script
│   ├── modules/          # Extension pages
│   │   ├── popup/       # Popup UI
│   │   └── setting/     # Settings page
│   ├── services/        # API services
│   └── utils/           # Utility functions
└── webpack.config.js    # Build configuration
```

## Getting Started

1. Clone this template:
```bash
git clone <repository-url>
cd chrome-extension-template
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:
```bash
cp .env.example .env.development
cp .env.example .env.production
```

4. Create manifest files:
```bash 
cp public/manifest.example.json public/manifest.development.json
cp public/manifest.example.json public/manifest.production.json
```

5. Start development:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
```

## Development

### Loading the extension

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist_development` folder

### Making changes

- Edit files in `src/` directory
- Webpack will automatically rebuild when files change
- Refresh the extension in Chrome to see changes

### Adding new features

1. Create new components in `src/modules/`
2. Update manifest files if needed
3. Import and use Bootstrap components
4. Add any required permissions to manifest

## Building for Production

1. Update version in manifest.production.json
2. Set production environment variables
3. Run build command:
```bash
npm run build
```
4. Upload `dist_production` folder to Chrome Web Store

## Environment Variables

Create two environment files:
- `.env.development` - Development settings
- `.env.production` - Production settings

Example variables:
```
API_URL=https://api.example.com
DEBUG=true
```

## Contributing

Feel free to submit issues and pull requests to improve this template.
