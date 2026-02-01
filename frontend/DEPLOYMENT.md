# Deployment Guide

## Production vs Development

### Development
For development, use the regular CSS files:
```html
<link rel="stylesheet" href="css/styles.css">
```

### Production
For production deployment, use the minified CSS files for better performance:
```html
<link rel="stylesheet" href="css/styles.min.css">
```

## CSS Minification

To regenerate minified CSS files after making changes:

```bash
cd frontend
node minify-css.js
```

This will create `.min.css` versions of all CSS files with:
- Comments removed
- Whitespace optimized
- 23-51% file size reduction

## Performance Optimizations

### Implemented
- ✅ **Minified CSS**: All CSS files have minified versions
- ✅ **System Fonts**: Using native system font stack (no external font loading)
- ✅ **Font Smoothing**: Antialiasing enabled for better rendering
- ✅ **SEO Meta Tags**: Comprehensive meta tags including Open Graph
- ✅ **Structured Data**: JSON-LD schema for search engines
- ✅ **Modular CSS**: 9 separate CSS files for maintainability

### Image Optimization Notes
- Profile picture (`assets/presentations/picture.jpg`): 803KB
- Recommend compressing to ~200KB using tools like:
  - TinyPNG (https://tinypng.com)
  - ImageOptim (https://imageoptim.com)
  - Squoosh (https://squoosh.app)

## Hosting

This site is deployed on GitHub Pages via GitHub Actions. On every push to `main`, the workflow uploads the `frontend/` directory automatically.

## Build Process

No build process required! This is pure HTML/CSS/JS.

Simply:
1. Update CSS/JS as needed
2. Run `node minify-css.js` if CSS changed
3. Push to `main` — GitHub Actions deploys automatically
4. Done!

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Targets

- ✅ Page load time: < 3 seconds
- ✅ Mobile responsive: 100%
- ✅ File sizes: All under 500 lines
- ✅ Zero backend dependencies
