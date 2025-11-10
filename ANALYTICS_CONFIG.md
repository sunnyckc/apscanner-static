# Analytics Configuration Guide

This guide explains how to set up Google Analytics and Facebook Pixel using the automated configuration system. **You never need to touch the HTML files directly!**

## 🚀 Quick Setup

### Step 1: Create Your Configuration File

1. Copy the example configuration:

    ```bash
    cp config.local.example.json config.local.json
    ```

2. Edit `config.local.json` with your analytics IDs:
    ```json
    {
    	"analytics": {
    		"googleAnalyticsId": "G-XXXXXXXXXX",
    		"facebookPixelId": "123456789012345",
    		"enabled": true
    	},
    	"site": {
    		"title": "Your Website Title",
    		"description": "Your website description",
    		"keywords": "your, keywords, here",
    		"url": "https://yourusername.github.io/your-repo-name/",
    		"ogImage": "https://yourusername.github.io/your-repo-name/images/og-image.jpg"
    	}
    }
    ```

### Step 2: Build Your Site

```bash
npm run build
```

That's it! Your analytics will be automatically integrated.

## 📁 Configuration Files

### `config.json` (Default/Template)

-   Contains default placeholder values
-   Safe to commit to Git
-   Used when no local config exists

### `config.local.json` (Your Personal Config)

-   Contains your actual analytics IDs
-   **Never committed to Git** (in .gitignore)
-   Takes priority over default config
-   Created from `config.local.example.json`

### `config.local.example.json` (Example)

-   Shows the structure with example values
-   Safe to commit to Git
-   Use as template for your local config

## 🔧 Configuration Options

### Analytics Section

```json
{
	"analytics": {
		"googleAnalyticsId": "G-XXXXXXXXXX", // Your GA4 Measurement ID
		"facebookPixelId": "123456789012345", // Your Facebook Pixel ID
		"enabled": true // Master switch for all analytics
	}
}
```

**Options:**

-   `enabled: false` - Disables all analytics (useful for development)
-   `enabled: true` - Enables analytics (only if IDs are provided)
-   Leave IDs empty (`""`) to disable specific platforms

### Site Section

```json
{
	"site": {
		"title": "Your Website Title",
		"description": "Your website description for SEO",
		"keywords": "keyword1, keyword2, keyword3",
		"url": "https://yourusername.github.io/repo-name/",
		"ogImage": "https://yourusername.github.io/repo-name/images/og-image.jpg"
	}
}
```

## 🛠️ Build Process

The build system automatically:

1. **Reads Configuration**: Uses `config.local.json` if it exists, otherwise `config.json`
2. **Processes Template**: Replaces placeholders in `src/index.template.html`
3. **Injects Analytics**: Adds Google Analytics and Facebook Pixel code if enabled
4. **Generates HTML**: Creates final `dist/index.html`

### Build Commands

```bash
# Full build (HTML + CSS)
npm run build

# Build only HTML (from template + config)
npm run build-html

# Build only CSS
npm run build-css

# Development mode (build + watch CSS)
npm run dev
```

## 🔒 Security & Privacy

### What's Safe to Commit

✅ `config.json` - Default template
✅ `config.local.example.json` - Example with fake IDs
✅ `src/index.template.html` - Template with placeholders

### What's Never Committed

❌ `config.local.json` - Your actual analytics IDs
❌ `dist/index.html` - Generated file with real IDs

### Development vs Production

**Development Mode:**

```json
{
	"analytics": {
		"enabled": false
	}
}
```

**Production Mode:**

```json
{
	"analytics": {
		"googleAnalyticsId": "G-REAL-ID-HERE",
		"facebookPixelId": "123456789012345",
		"enabled": true
	}
}
```

## 📊 Getting Your Analytics IDs

### Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create account and property
3. Set up data stream for your website
4. Copy the Measurement ID (format: `G-XXXXXXXXXX`)

### Facebook Pixel

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager/)
2. Create a new pixel
3. Copy the Pixel ID (numeric, like `123456789012345`)

## 🚀 Deployment

### GitHub Pages

The GitHub Actions workflow automatically:

1. Runs `npm run build`
2. Uses your committed `config.json` (with analytics disabled)
3. Deploys the safe version

### With Analytics Enabled

To deploy with analytics:

1. **Option A: Update default config**

    ```bash
    # Edit config.json with your real IDs
    # Commit and push
    ```

2. **Option B: Use environment variables** (Advanced)
    ```bash
    # Set up GitHub Secrets in repository settings
    # Modify build.js to read from environment
    ```

## 🔄 Workflow Examples

### Local Development

```bash
# 1. Set up local config (one time)
cp config.local.example.json config.local.json
# Edit config.local.json with your IDs

# 2. Develop with analytics disabled
echo '{"analytics":{"enabled":false},"site":{...}}' > config.local.json
npm run dev

# 3. Test with analytics enabled
# Edit config.local.json to enable analytics
npm run build
npm run serve
```

### Team Collaboration

```bash
# Each team member:
cp config.local.example.json config.local.json
# Edit with their own test analytics IDs

# The config.local.json is never shared or committed
```

### Production Deployment

```bash
# Update the default config for production
vim config.json
# Set real IDs and enabled: true
git add config.json
git commit -m "Enable analytics for production"
git push
```

## 🐛 Troubleshooting

### Build Errors

```bash
# Check if template exists
ls src/index.template.html

# Check config syntax
node -e "console.log(JSON.parse(require('fs').readFileSync('config.local.json')))"

# Rebuild from scratch
rm dist/index.html
npm run build-html
```

### Analytics Not Working

1. **Check build output**: Look for "Analytics enabled: true"
2. **Verify IDs**: Ensure correct format (GA: G-XXXXXXXXXX, FB: numeric)
3. **Check browser**: Use developer tools to see if scripts loaded
4. **Test locally**: Use `npm run serve` and visit localhost

### Configuration Issues

```bash
# Reset to defaults
rm config.local.json
npm run build  # Uses config.json

# Validate JSON syntax
cat config.local.json | python -m json.tool
```

## 📝 Template Placeholders

The system replaces these placeholders in `src/index.template.html`:

-   `{{SITE_TITLE}}` → `config.site.title`
-   `{{SITE_DESCRIPTION}}` → `config.site.description`
-   `{{SITE_KEYWORDS}}` → `config.site.keywords`
-   `{{SITE_URL}}` → `config.site.url`
-   `{{OG_IMAGE}}` → `config.site.ogImage`
-   `{{GOOGLE_ANALYTICS}}` → Generated GA4 script or comment
-   `{{FACEBOOK_PIXEL}}` → Generated FB Pixel script or comment

## 🎯 Best Practices

1. **Never commit real analytics IDs** to public repositories
2. **Use local config for development** with test IDs
3. **Disable analytics during development** to avoid skewing data
4. **Test analytics in staging** before production deployment
5. **Keep config.local.example.json updated** for team members
6. **Use meaningful site metadata** for better SEO

## 🔗 Related Files

-   `build.js` - Build script that processes templates
-   `src/index.template.html` - HTML template with placeholders
-   `package.json` - Contains build scripts
-   `.gitignore` - Excludes sensitive config files
-   `analytics-setup.md` - Detailed analytics setup guide

---

**Need help?** Check the main README.md or create an issue in the repository.
