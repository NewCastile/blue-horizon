/**
 * @format
 * @type {import('next').NextConfig}
 */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["img.ltn.com.tw"],
	},
	i18n: {
		locales: ["en", "es", "fr", "nl"],
		defaultLocale: "en",
		localeDetection: false,
	},
}
