# Troy E. Sybert - Professional Resume Portfolio

A modern, static resume website showcasing healthcare leadership, data science expertise, and entrepreneurial achievements. Built with clean, maintainable code and deployed on GitHub Pages.

## Live Site

**[www.troymd.com](https://www.troymd.com)**

## Project Overview

This is a fully static resume website designed for professional presentation and easy maintenance. The site features responsive design, smooth navigation, and interactive elements while maintaining simplicity and reliability.

### Key Features

- **Professional Content**: Comprehensive resume with leadership experience, technical projects, and achievements
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth scrolling, dynamic navigation, and FAQ chatbot
- **Modern Architecture**: Clean separation of HTML, CSS, and JavaScript
- **Static Hosting**: Fast, reliable, and cost-effective deployment
- **SEO Optimized**: Proper meta tags and structured data for search engines

## Architecture

### Static Design

```text
troy-resume/
├── frontend/
│   ├── index.html          # Main resume page (semantic HTML template)
│   ├── css/                # Modular CSS files
│   │   ├── styles.css      # Main import file
│   │   ├── variables.css   # CSS variables and colors
│   │   ├── base.css        # Typography and base styles
│   │   ├── header.css      # Header and navigation
│   │   ├── sections.css    # Content sections
│   │   ├── timeline.css    # Work timeline and categories
│   │   ├── gantt.css       # Gantt chart visualization
│   │   └── responsive.css  # Mobile responsiveness
│   ├── js/
│   │   ├── resume.js       # Interactive functionality and data rendering
│   │   └── chatbot.js      # FAQ chatbot logic and UI
│   ├── data/               # JSON data files
│   │   ├── profile.json    # Personal info and skills
│   │   ├── roles.json      # Work experience
│   │   ├── credentials.json # Education and certifications
│   │   ├── publications.json # Publications, presentations, press
│   │   ├── volunteer.json  # Volunteer work and awards
│   │   ├── technology.json # Technology & Innovation portfolio
│   │   └── faq.json        # Chatbot Q&A data
│   ├── assets/             # Images, PDFs, and presentations
│   └── CNAME               # Custom domain for GitHub Pages
├── docs/                   # Technical documentation
├── tasks/                  # PRDs and project documentation
└── README.md
```

### Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Domain**: Custom domain (www.troymd.com) via GoDaddy DNS
- **SSL**: Free HTTPS via GitHub Pages (Let's Encrypt)

## Deployment

The site auto-deploys via GitHub Actions on every push to `main`. The workflow (`.github/workflows/deploy-github-pages.yml`) uploads the `frontend/` directory to GitHub Pages. No build step is needed.

### Quick Deploy

1. Make updates to local files
2. Test locally in browser
3. Push to `main`
4. GitHub Actions deploys automatically
5. Verify at https://www.troymd.com

## Development Workflow

### Local Development

1. **Clone Repository**:

   ```bash
   git clone https://github.com/HacksterT/troy-resume.git
   cd troy-resume
   ```

2. **Make Changes**: Edit JSON data files in `frontend/data/` or CSS/JS files

3. **Test Locally**: Run a local web server (required for JSON loading):

   ```bash
   cd frontend
   python -m http.server 8000
   # or
   npx serve
   ```

   Then open `http://localhost:8000` in browser

4. **CSS Minification** (after CSS changes):

   ```bash
   cd frontend
   node minify-css.js
   ```

   Production uses `css/styles.min.css`; development uses `css/styles.css`.

5. **Commit Changes**:

   ```bash
   git add .
   git commit -m "feat: update experience section"
   git push origin main
   ```

### Branching Strategy

- **main**: Production-ready code
- **feature/***: Specific new features

### Code Standards

- **HTML**: Semantic markup, proper structure
- **CSS**: Organized, responsive, maintainable
- **JavaScript**: Clean, functional, well-commented
- **Files**: Keep files under 500 lines for maintainability

## File Structure

### HTML Template

- **index.html**: Clean semantic HTML5 template with sections dynamically populated from JSON data

### Modular CSS (all files <500 lines)

- **styles.css**: Main import file
- **variables.css**: CSS custom properties and color scheme
- **base.css**: Typography and base layout
- **header.css**: Header and navigation styling
- **sections.css**: Content sections and components
- **timeline.css**: Work timeline and category views
- **gantt.css**: Gantt chart visualization
- **chatbot.css**: FAQ chatbot styling with animations
- **responsive.css**: Mobile breakpoints

### JavaScript (all files <500 lines)

- **resume.js**: ResumeManager class - data loading, rendering, and interactive functionality
- **chatbot.js**: Chatbot class - FAQ chatbot logic and UI handling

### JSON Data Files

- **profile.json**: Name, title, summary, experience metrics, skills, social media
- **roles.json**: Work roles with descriptions, accomplishments, Gantt chart data
- **credentials.json**: Education, licenses, certifications
- **publications.json**: Publications, presentations with video/PDF links, press mentions
- **volunteer.json**: Volunteer activities and awards
- **technology.json**: Technology & Innovation portfolio with categories and projects
- **faq.json**: FAQ chatbot questions and answers with keyword-based matching

## Customization

### Updating Content

1. **Personal Info**: Edit `data/profile.json` (name, title, summary, skills, social media)
2. **Work Experience**: Edit `data/roles.json` (add/modify positions, update Gantt chart dates)
3. **Education**: Edit `data/credentials.json` (degrees, licenses, certifications)
4. **Publications**: Edit `data/publications.json` (publications, presentations, press mentions)
5. **Volunteer Work**: Edit `data/volunteer.json` (volunteer activities, awards)
6. **Styling**: Modify CSS files in `css/` directory
7. **Interactions**: Update `js/resume.js`

### Gantt Chart Updates

See [docs/gantt-logic.md](docs/gantt-logic.md) for detailed instructions on updating Gantt chart timeline values.

**Formula**: `gantt_value = (Year - 2000) + (Month - 1) / 12`

### Adding New Sections

1. **Data**: Create new JSON file in `data/` directory
2. **HTML**: Add semantic section to `index.html`
3. **JavaScript**: Add rendering function in `js/resume.js`
4. **CSS**: Style in appropriate CSS file
5. **Navigation**: Update menu in header

## FAQ Chatbot

The site includes a client-side FAQ chatbot that answers questions about Troy's experience and expertise.

**Coverage**: Leadership, AI/ML expertise, healthcare IT, data science, entrepreneurship, certifications, achievements, and contact information.

**Features**:

- Keyword-based intelligent matching across 20+ FAQ topics
- Smooth animations and typing indicators
- Mobile-responsive design with touch-friendly interface
- Greeting message on first interaction
- No backend dependencies (100% client-side)
- Graceful fallback for unmatched questions

**Data**: FAQ data stored in `data/faq.json`. Each Q&A includes keywords, question, and detailed answer. Easy to update and expand without code changes.

## Future Enhancements

- **AI-Powered Chat**: Upgrade to GPT/Claude API with dynamic hosting
- **Content Management**: Headless CMS for easier content updates
- **A/B Testing**: Content optimization

## Troubleshooting

**Changes Not Visible**:
- Clear browser cache (Ctrl+F5)
- Check GitHub Actions deployment status
- Wait for GitHub Pages propagation

**Styling Issues**:
- Check CSS file path in HTML
- Verify responsive breakpoints
- Test in different browsers

**Navigation Problems**:
- Check JavaScript console for errors
- Verify section IDs match navigation links
- Test mobile menu functionality

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Last Updated**: February 2026
**Version**: 3.0 (GitHub Pages)
**Maintainer**: Troy E. Sybert
