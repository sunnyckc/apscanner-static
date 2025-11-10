# APScanner - Static Website with Tailwind CSS

A modern, responsive static website built with Tailwind CSS, optimized for GitHub Pages deployment with integrated analytics support.

## 🚀 Features

-   **Modern Design**: Clean, professional design with Tailwind CSS
-   **Responsive**: Mobile-first responsive design
-   **Fast Loading**: Optimized CSS and minimal JavaScript
-   **SEO Ready**: Meta tags, Open Graph, and Twitter Card support
-   **Analytics Ready**: Pre-configured for Google Analytics and Facebook Pixel
-   **GitHub Pages**: Automatic deployment with GitHub Actions
-   **Accessibility**: Built with accessibility best practices

## 📁 Project Structure

```
apscanner/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── dist/                       # Production files (GitHub Pages serves from here)
│   ├── css/
│   │   └── style.css          # Generated Tailwind CSS
│   ├── js/
│   │   └── main.js            # JavaScript functionality
│   └── index.html             # Main HTML file
├── src/
│   └── input.css              # Tailwind CSS source
├── .gitignore                 # Git ignore rules
├── package.json               # Node.js dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── analytics-setup.md         # Analytics setup guide
└── README.md                  # This file
```

## 🛠️ Setup Instructions

### Prerequisites

-   Node.js (version 14 or higher)
-   npm or yarn
-   Git
-   GitHub account

### Local Development

1. **Clone or download this repository**

    ```bash
    git clone <your-repo-url>
    cd apscanner
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Build Tailwind CSS**

    ```bash
    npm run build
    ```

4. **Start development server** (optional)

    ```bash
    npm run serve
    ```

    This starts a local server at `http://localhost:8000`

5. **Development workflow**
    - Edit HTML template in `src/index.template.html`
    - Edit configuration in `config.local.json`
    - Edit CSS in `src/input.css`
    - Edit JavaScript in `dist/js/main.js`
    - Run `npm run build` to rebuild HTML and CSS after changes
    - Use `npm run dev` for development with file watching

## 🚀 GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Create a new GitHub repository**

    - Go to GitHub and create a new repository
    - Name it whatever you like (e.g., `apscanner`, `my-website`)

2. **Push your code**

    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/yourusername/your-repo-name.git
    git push -u origin main
    ```

3. **Enable GitHub Pages**

    - Go to your repository settings
    - Scroll down to "Pages" section
    - Under "Source", select "GitHub Actions"
    - The workflow will automatically deploy your site

4. **Access your website**
    - Your site will be available at: `https://yourusername.github.io/your-repo-name/`
    - It may take a few minutes for the first deployment

### Manual Deployment

If you prefer manual deployment:

1. Build the project: `npm run build`
2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/dist" folder
5. Save the settings

## 📊 Analytics Setup

The website includes an **automated analytics configuration system** - you never need to touch the HTML files directly!

### Quick Setup

1. Copy the config template: `cp config.local.example.json config.local.json`
2. Edit `config.local.json` with your Google Analytics and Facebook Pixel IDs
3. Run `npm run build` - analytics are automatically integrated!

### Detailed Guides

-   **`ANALYTICS_CONFIG.md`** - Complete configuration system guide
-   **`analytics-setup.md`** - Manual setup instructions and advanced topics

### Key Features

-   ✅ **Zero HTML editing** - configure via JSON files
-   ✅ **Secure by default** - real IDs never committed to Git
-   ✅ **Development friendly** - easily disable analytics during development
-   ✅ **Team collaboration** - each developer can use their own test IDs

## 🎨 Customization

### Colors and Branding

Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors here
        500: '#your-color',
        600: '#your-darker-color',
      }
    }
  }
}
```

### Content

1. **Update site information**:

    - Edit `config.json` or `config.local.json` for meta tags, title, description, and keywords
    - Replace placeholder content in `src/index.template.html` with your actual content
    - Run `npm run build` to generate the final HTML

2. **Add your logo**:

    - Replace the text logo in the navigation
    - Add favicon.ico to the dist folder

3. **Customize sections**:
    - Hero section: Update headline and call-to-action
    - About section: Add your company information
    - Services section: Update with your actual services
    - Contact section: Update contact information

### Styling

1. **Custom CSS**: Add custom styles to `src/input.css`
2. **Components**: Modify existing component classes or add new ones
3. **Utilities**: Add custom utility classes in the utilities layer

## 📱 NPM Scripts

-   `npm run dev` - Development mode with CSS watching
-   `npm run build` - Build production CSS
-   `npm run build-css` - Build CSS without minification
-   `npm run watch` - Watch CSS files for changes
-   `npm run minify-css` - Minify CSS for production
-   `npm run serve` - Start local development server
-   `npm run deploy` - Build for deployment

## 🔧 Configuration Files

### tailwind.config.js

-   Tailwind CSS configuration
-   Content paths for purging unused CSS
-   Theme customization
-   Plugin configuration

### package.json

-   Project dependencies
-   Build scripts
-   Project metadata

### .github/workflows/deploy.yml

-   GitHub Actions workflow
-   Automatic deployment to GitHub Pages
-   Build and deployment steps

## 🌐 Browser Support

-   Chrome (latest)
-   Firefox (latest)
-   Safari (latest)
-   Edge (latest)
-   Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 SEO Features

-   Semantic HTML structure
-   Meta tags for search engines
-   Open Graph tags for social media
-   Twitter Card support
-   Structured data ready
-   Fast loading times
-   Mobile-friendly design

## 🔒 Security Features

-   No server-side code (static site)
-   HTTPS by default (GitHub Pages)
-   No sensitive data exposure
-   CSP-ready structure

## 🐛 Troubleshooting

### Common Issues

1. **CSS not updating**:

    - Run `npm run build` after making changes
    - Clear browser cache
    - Check if Tailwind classes are correct

2. **GitHub Pages not deploying**:

    - Check Actions tab for build errors
    - Ensure repository settings are correct
    - Verify workflow permissions

3. **Analytics not working**:
    - Check browser console for errors
    - Verify analytics IDs are correct
    - Check if ad blockers are interfering

### Getting Help

1. Check the browser console for JavaScript errors
2. Verify all files are in the correct locations
3. Ensure npm dependencies are installed
4. Check GitHub Actions logs for deployment issues

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you need help with setup or customization:

1. Check this README and `analytics-setup.md`
2. Review the code comments
3. Check GitHub Issues for common problems
4. Create a new issue if needed

---

**Happy coding! 🎉**

Built with ❤️ using Tailwind CSS and modern web technologies.
