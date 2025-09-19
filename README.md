# Online CV Website

A modern, responsive online CV/resume website built with HTML, CSS, and JavaScript, optimized for GitHub Pages hosting.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive**: Hover effects, scroll animations, and smooth transitions
- **Accessible**: Keyboard navigation support and semantic HTML
- **Print-Ready**: Optimized CSS for printing
- **GitHub Pages Ready**: No build process required

## Structure

- **Header**: Full name and professional title with gradient text effect
- **Contact Section**: LinkedIn, email, and phone with interactive cards
- **Experience Section**: Timeline-based layout for work history
- **Animations**: Scroll-triggered animations and interactive elements

## Customization

### Personal Information
Edit the following in `index.html`:

1. **Name and Title**:
   ```html
   <h1 class="name" id="fullName">Your Full Name</h1>
   <p class="title">Professional Title</p>
   ```

2. **Contact Information**:
   ```html
   <a href="https://linkedin.com/in/your-profile" class="contact-item linkedin">
   <a href="mailto:your.email@example.com" class="contact-item email">
   <a href="tel:+1234567890" class="contact-item phone">
   ```

3. **Work Experience**:
   - Update company names, positions, and date ranges
   - Modify the bullet points for each role
   - Add or remove experience items as needed

### Styling
- Colors can be customized in the CSS `:root` variables
- Fonts can be changed by updating the Google Fonts import
- Layout adjustments can be made in `styles.css`

### JavaScript Features
- Typewriter effect for name animation
- Scroll progress indicator
- Back-to-top button
- Print functionality
- Smooth scrolling
- Interactive hover effects

## GitHub Pages Setup

1. **Repository Setup**:
   - Create a new repository on GitHub
   - Upload all files to the repository
   - Ensure `index.html` is in the root directory

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)"
   - Click "Save"

3. **Access Your Site**:
   - Your site will be available at: `https://yourusername.github.io/repository-name`
   - It may take a few minutes to deploy initially

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized images and fonts
- Minimal external dependencies
- Efficient CSS animations
- Lazy loading for non-critical features

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## License

Feel free to use this template for your own CV website. Attribution is appreciated but not required.

---

Built with ❤️ for GitHub Pages