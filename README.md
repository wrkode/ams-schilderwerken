# Amsterdam Schilderwerken Website

A professional, modern website for Amsterdam Schilderwerken - a painting company based in Amsterdam.

## Features

✨ **Modern Design**
- Rolex-inspired color palette (black, green, gray, gold)
- Clean, spacious layouts with smooth transitions
- Professional yet approachable aesthetic

🌐 **Bilingual Support**
- English and Dutch language options
- Seamless language switching
- Language preference saved locally

📱 **Fully Responsive**
- Mobile-first design
- Optimized for all devices (mobile, tablet, desktop)
- Touch-friendly interactions

🎨 **Portfolio Gallery**
- Beautiful grid layout
- Lightbox for full-size image viewing
- Keyboard navigation support

📧 **Contact Form**
- Client-side validation
- Professional shadcn-inspired styling
- Ready for backend integration

⚡ **Performance**
- Lazy loading for images
- Smooth scroll animations
- Intersection Observer API for efficient animations

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with Tailwind CSS (CDN)
- **JavaScript (ES6+)** - Vanilla JS, no framework required
- **Feather Icons** - Beautiful open-source icons
- **Google Fonts** - Inter font family

## Getting Started

### Quick Start

No installation or build process required! Simply:

1. Open `index.html` in your web browser
2. That's it! The website is fully functional

### Viewing the Website

**Option 1: Double-click**
- Navigate to `/Users/wrizzo/code/jeremysite/`
- Double-click `index.html`
- Your default browser will open the website

**Option 2: Terminal**
```bash
cd /Users/wrizzo/code/jeremysite
open index.html
```

**Option 3: Local Server (Recommended for development)**
```bash
# Using Python 3
cd /Users/wrizzo/code/jeremysite
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## File Structure

```
jeremysite/
├── index.html              # Main HTML file
├── styles.css              # Custom CSS styles
├── script.js               # JavaScript functionality
├── translations.js         # Bilingual content (EN/NL)
├── README.md              # This file
└── images/                # Image assets
    ├── logo.svg           # Company logo
    └── portfolio/         # Portfolio images
```

## Customization Guide

### 1. Adding Portfolio Images

To add your own portfolio images:

1. Place images in the `images/portfolio/` folder
2. Edit the `portfolioImages` array in `script.js` (around line 177):

```javascript
portfolioImages = [
    {
        src: 'images/portfolio/your-image.jpg',
        title: 'Your Project Title',
        description: 'Project description'
    },
    // Add more images...
];
```

### 2. Updating Content

All text content is stored in `translations.js`. Edit the English (`en`) and Dutch (`nl`) sections to change:
- Navigation labels
- Section headings
- Service descriptions
- Testimonials
- Contact information

### 3. Changing Colors

Colors are defined in two places:

**Tailwind Config** (in `index.html` head):
```javascript
colors: {
    'rolex-black': '#0a0a0a',
    'rolex-green': '#00563f',
    'charcoal': '#3a3a3a',
    'accent-gold': '#d4af37'
}
```

**CSS Variables** (in `styles.css`):
```css
:root {
    --rolex-black: #0a0a0a;
    --rolex-green: #00563f;
    --charcoal: #3a3a3a;
    --accent-gold: #d4af37;
}
```

### 4. Contact Information

Update contact details in `translations.js`:
```javascript
contact: {
    info: {
        address: "Your Address",
        phone: "+31 6 XXXX XXXX",
        email: "your@email.com",
        // ...
    }
}
```

### 5. Connecting the Contact Form

The form currently simulates submission. To connect to a real backend:

**Option A: Using EmailJS**
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Get your service ID, template ID, and public key
3. Add EmailJS script to `index.html`
4. Update `handleFormSubmit()` in `script.js`

**Option B: Using Formspree**
1. Sign up at [formspree.io](https://formspree.io/)
2. Change the form action in `index.html`:
```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option C: Custom Backend**
Replace the `simulateFormSubmission()` function with an actual API call:
```javascript
async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const response = await fetch('your-backend-url', {
        method: 'POST',
        body: formData
    });
    
    // Handle response...
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Language Switching
- Toggle between English and Dutch
- Preference saved in localStorage
- Instant content update without page reload

### Scroll Animations
- Elements fade in as you scroll
- Smooth transitions with Intersection Observer
- Staggered animations for grid items

### Portfolio Gallery
- Responsive grid (3 columns → 2 → 1)
- Click to open lightbox
- Navigate with arrow keys or buttons
- Close with ESC key or X button

### Contact Form
- Real-time validation
- Professional error messages
- Loading states
- Success/error feedback

### Mobile Menu
- Hamburger menu for mobile devices
- Smooth slide animation
- Auto-closes on navigation

## Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Reduced motion support
- High contrast mode support

## Performance Optimization

- Lazy loading for images
- Debounced scroll events
- CSS animations instead of JS where possible
- Minimal external dependencies
- Optimized asset loading

## SEO Ready

- Semantic HTML structure
- Meta tags for description
- Proper heading hierarchy
- Alt text for images
- Social media ready

## Next Steps / Future Enhancements

- [ ] Connect contact form to email service
- [ ] Add Google Maps integration
- [ ] Add more portfolio images
- [ ] Implement blog section
- [ ] Add Google Analytics
- [ ] Set up SEO optimization
- [ ] Add cookie consent banner
- [ ] Implement dark mode toggle
- [ ] Add testimonial slider
- [ ] Create case study pages

## Support

For questions or issues:
- Email: info@amsterdamschilderwerken.nl
- Phone: +31 6 1234 5678

## License

© 2025 Amsterdam Schilderwerken. All rights reserved.

---

**Built with care for quality craftsmanship** 🎨

