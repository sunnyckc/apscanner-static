// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
	const mobileMenuButton = document.getElementById("mobile-menu-button");
	const mobileMenu = document.getElementById("mobile-menu");

	if (mobileMenuButton && mobileMenu) {
		mobileMenuButton.addEventListener("click", function () {
			mobileMenu.classList.toggle("hidden");
		});
	}

	// Smooth scrolling for navigation links
	const navLinks = document.querySelectorAll('a[href^="#"]');
	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();
			const targetId = this.getAttribute("href");
			const targetSection = document.querySelector(targetId);

			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});

				// Close mobile menu if open
				if (!mobileMenu.classList.contains("hidden")) {
					mobileMenu.classList.add("hidden");
				}
			}
		});
	});

	// Form submission handler
	const contactForm = document.querySelector("form");
	if (contactForm) {
		contactForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Get form data
			const formData = new FormData(this);
			const name = formData.get("name");
			const email = formData.get("email");
			const message = formData.get("message");

			// Basic validation
			if (!name || !email || !message) {
				alert("Please fill in all fields.");
				return;
			}

			// Email validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				alert("Please enter a valid email address.");
				return;
			}

			// Simulate form submission (replace with actual form handling)
			alert("Thank you for your message! We'll get back to you soon.");
			this.reset();

			// Track form submission with Google Analytics (if enabled)
			if (typeof gtag !== "undefined") {
				gtag("event", "form_submit", {
					event_category: "Contact",
					event_label: "Contact Form",
				});
			}

			// Track form submission with Facebook Pixel (if enabled)
			if (typeof fbq !== "undefined") {
				fbq("track", "Contact");
			}
		});
	}

	// Intersection Observer for animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animate-fade-in");
			}
		});
	}, observerOptions);

	// Observe cards and sections for animations
	const animatedElements = document.querySelectorAll(".card, section");
	animatedElements.forEach((el) => {
		observer.observe(el);
	});

	// Add scroll-based navbar styling
	window.addEventListener("scroll", function () {
		const navbar = document.querySelector("nav");
		if (window.scrollY > 50) {
			navbar.classList.add("shadow-md");
		} else {
			navbar.classList.remove("shadow-md");
		}
	});
});

// Utility functions for analytics
function trackEvent(eventName, category = "General", label = "") {
	// Google Analytics
	if (typeof gtag !== "undefined") {
		gtag("event", eventName, {
			event_category: category,
			event_label: label,
		});
	}

	// Facebook Pixel
	if (typeof fbq !== "undefined") {
		fbq("track", eventName);
	}
}

// Track button clicks
document.addEventListener("click", function (e) {
	if (e.target.matches(".btn-primary")) {
		trackEvent("button_click", "CTA", "Primary Button");
	} else if (e.target.matches(".btn-secondary")) {
		trackEvent("button_click", "CTA", "Secondary Button");
	}
});

// Performance monitoring
window.addEventListener("load", function () {
	// Track page load time
	const loadTime =
		performance.timing.loadEventEnd - performance.timing.navigationStart;

	if (typeof gtag !== "undefined") {
		gtag("event", "timing_complete", {
			name: "load",
			value: loadTime,
		});
	}
});

// Add CSS animation class
const style = document.createElement("style");
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-in-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
