# Analytics Setup Guide

This document explains how to set up Google Analytics and Facebook Pixel for your APScanner website.

## Google Analytics Setup

### Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create a new account and property
5. Set up a data stream for your website
6. Copy your Measurement ID (format: G-XXXXXXXXXX)

### Step 2: Add Google Analytics to Your Website

1. Open `dist/index.html`
2. Find the commented Google Analytics section in the `<head>`
3. Uncomment the code and replace `GA_MEASUREMENT_ID` with your actual Measurement ID:

```html
<script
	async
	src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}
	gtag("js", new Date());
	gtag("config", "G-XXXXXXXXXX");
</script>
```

### Step 3: Verify Installation

1. Deploy your website
2. Visit your site and check the Google Analytics Real-time reports
3. You should see your visit appear in the dashboard

## Facebook Pixel Setup

### Step 1: Create a Facebook Pixel

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager/)
2. Click "Connect Data Sources" → "Web" → "Facebook Pixel"
3. Choose "Create a Pixel"
4. Name your pixel and enter your website URL
5. Copy your Pixel ID (numeric value)

### Step 2: Add Facebook Pixel to Your Website

1. Open `dist/index.html`
2. Find the commented Facebook Pixel section in the `<head>`
3. Uncomment the code and replace `PIXEL_ID` with your actual Pixel ID:

```html
<script>
	!(function (f, b, e, v, n, t, s) {
		if (f.fbq) return;
		n = f.fbq = function () {
			n.callMethod
				? n.callMethod.apply(n, arguments)
				: n.queue.push(arguments);
		};
		if (!f._fbq) f._fbq = n;
		n.push = n;
		n.loaded = !0;
		n.version = "2.0";
		n.queue = [];
		t = b.createElement(e);
		t.async = !0;
		t.src = v;
		s = b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t, s);
	})(
		window,
		document,
		"script",
		"https://connect.facebook.net/en_US/fbevents.js"
	);
	fbq("init", "YOUR_PIXEL_ID");
	fbq("track", "PageView");
</script>
<noscript
	><img
		height="1"
		width="1"
		style="display:none"
		src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
```

### Step 3: Verify Installation

1. Install the Facebook Pixel Helper browser extension
2. Visit your website
3. The extension should show that the pixel is active and firing

## Event Tracking

The website includes automatic event tracking for:

### Google Analytics Events

-   Form submissions
-   Button clicks (CTA buttons)
-   Page load timing

### Facebook Pixel Events

-   Form submissions (Contact event)
-   Button clicks

### Custom Event Tracking

You can add custom events using the `trackEvent()` function in `main.js`:

```javascript
// Track custom events
trackEvent("custom_event_name", "Category", "Label");
```

## Privacy Considerations

### Cookie Consent

Consider adding a cookie consent banner before enabling analytics:

```html
<!-- Add this to your HTML -->
<div
	id="cookie-banner"
	class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50"
>
	<div class="max-w-7xl mx-auto flex items-center justify-between">
		<p class="text-sm">
			We use cookies to improve your experience and analyze site traffic.
		</p>
		<div class="flex gap-2">
			<button id="accept-cookies" class="btn-primary text-sm">
				Accept
			</button>
			<button id="decline-cookies" class="btn-secondary text-sm">
				Decline
			</button>
		</div>
	</div>
</div>
```

### Privacy Policy

Make sure to update your privacy policy to include information about:

-   What data you collect
-   How you use the data
-   Third-party services (Google Analytics, Facebook)
-   User rights and opt-out options

## Testing

### Google Analytics Testing

1. Use Google Analytics Debugger extension
2. Check Real-time reports
3. Use Google Tag Assistant

### Facebook Pixel Testing

1. Use Facebook Pixel Helper extension
2. Check Events Manager for incoming events
3. Use Facebook's Test Events tool

## Environment Variables (Optional)

For better security, you can use environment variables:

1. Create a `.env` file (already in .gitignore):

```
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
FACEBOOK_PIXEL_ID=123456789
```

2. Use a build process to inject these values during deployment.

## Compliance

### GDPR Compliance

-   Implement cookie consent
-   Provide opt-out mechanisms
-   Update privacy policy
-   Consider using Google Analytics 4 with enhanced privacy features

### CCPA Compliance

-   Provide "Do Not Sell My Personal Information" link
-   Implement opt-out functionality
-   Update privacy policy accordingly

## Troubleshooting

### Common Issues

1. **Analytics not working**: Check browser console for errors
2. **Events not firing**: Verify event names and parameters
3. **Real-time data not showing**: Check if ad blockers are interfering
4. **Pixel not detected**: Ensure pixel code is in the `<head>` section

### Debug Mode

Enable debug mode for Google Analytics:

```javascript
gtag("config", "G-XXXXXXXXXX", {
	debug_mode: true,
});
```
