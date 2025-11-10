#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Read configuration (prefer local config if it exists)
const localConfigPath = path.join(__dirname, "config.local.json");
const defaultConfigPath = path.join(__dirname, "config.json");

let config;
if (fs.existsSync(localConfigPath)) {
	console.log("📋 Using local configuration file");
	config = JSON.parse(fs.readFileSync(localConfigPath, "utf8"));
} else {
	console.log("📋 Using default configuration file");
	config = JSON.parse(fs.readFileSync(defaultConfigPath, "utf8"));
}

// Read the HTML template
const htmlTemplatePath = path.join(__dirname, "src", "index.template.html");
const htmlOutputPath = path.join(__dirname, "dist", "index.html");

let htmlContent = fs.readFileSync(htmlTemplatePath, "utf8");

// Replace placeholders with config values
htmlContent = htmlContent
	.replace(/{{SITE_TITLE}}/g, config.site.title)
	.replace(/{{SITE_DESCRIPTION}}/g, config.site.description)
	.replace(/{{SITE_KEYWORDS}}/g, config.site.keywords)
	.replace(/{{SITE_URL}}/g, config.site.url)
	.replace(/{{OG_IMAGE}}/g, config.site.ogImage);

// Handle Google Analytics
if (config.analytics.enabled && config.analytics.googleAnalyticsId) {
	const gaScript = `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.analytics.googleAnalyticsId}');
    </script>`;
	htmlContent = htmlContent.replace("{{GOOGLE_ANALYTICS}}", gaScript);
} else {
	htmlContent = htmlContent.replace(
		"{{GOOGLE_ANALYTICS}}",
		"<!-- Google Analytics disabled -->"
	);
}

// Handle Facebook Pixel
if (config.analytics.enabled && config.analytics.facebookPixelId) {
	const fbPixelScript = `
    <!-- Facebook Pixel -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${config.analytics.facebookPixelId}');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=${config.analytics.facebookPixelId}&ev=PageView&noscript=1"
    /></noscript>`;
	htmlContent = htmlContent.replace("{{FACEBOOK_PIXEL}}", fbPixelScript);
} else {
	htmlContent = htmlContent.replace(
		"{{FACEBOOK_PIXEL}}",
		"<!-- Facebook Pixel disabled -->"
	);
}

// Write the processed HTML
fs.writeFileSync(htmlOutputPath, htmlContent);

console.log("✅ HTML built successfully with analytics configuration");
console.log(`📊 Analytics enabled: ${config.analytics.enabled}`);
if (config.analytics.enabled) {
	console.log(
		`🔍 Google Analytics: ${
			config.analytics.googleAnalyticsId ? "Configured" : "Not configured"
		}`
	);
	console.log(
		`📘 Facebook Pixel: ${
			config.analytics.facebookPixelId ? "Configured" : "Not configured"
		}`
	);
}
