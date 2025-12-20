# Troy E. Sybert - Professional Resume Portfolio

A modern, static resume website showcasing healthcare leadership, data science expertise, and entrepreneurial achievements. Built with clean, maintainable code and deployed on Azure Storage.

## 🌐 Live Site

**[www.troymd.com](https://www.troymd.com)**

## 📋 Project Overview

This is a fully static resume website designed for professional presentation and easy maintenance. The site features responsive design, smooth navigation, and interactive elements while maintaining simplicity and reliability.

### Key Features

- **Professional Content**: Comprehensive resume with leadership experience, technical projects, and achievements
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth scrolling, dynamic navigation, and FAQ chatbot
- **Modern Architecture**: Clean separation of HTML, CSS, and JavaScript
- **Static Hosting**: Fast, reliable, and cost-effective deployment
- **SEO Optimized**: Proper meta tags and structured data for search engines

## 🏗️ Architecture

### Simplified Static Design

```text
cloud-resume-azure/
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
│   │   └── resume.js       # Interactive functionality and data rendering
│   ├── data/               # JSON data files
│   │   ├── profile.json    # Personal info and skills
│   │   ├── roles.json      # Work experience
│   │   ├── credentials.json # Education and certifications
│   │   ├── publications.json # Publications, presentations, press
│   │   ├── volunteer.json  # Volunteer work and awards
│   │   └── technology.json # Technology & Innovation portfolio
│   └── assets/             # Images and presentations
├── infrastructure/         # Azure deployment templates
│   └── storage/           # Storage account ARM templates
│       ├── template.json  # ARM template definition
│       └── parameters.json # Deployment parameters
├── docs/                   # Technical documentation
├── tasks/                  # PRDs and project documentation
└── README.md
```

### Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Hosting**: Azure Storage (Static Website)
- **Domain**: Custom domain with SSL certificate
- **Development**: Modern workflow with Git branching

## 🚀 Deployment

### Infrastructure as Code

The project includes ARM templates for reproducible Azure Storage deployment:

**Deploy Storage Account:**

```bash
az deployment group create \
  --resource-group <your-resource-group> \
  --template-file infrastructure/storage/template.json \
  --parameters infrastructure/storage/parameters.json
```

**Configuration:**

- Storage account: `sybertresume` in `eastus2`
- Type: `Standard_LRS` (StorageV2)
- Security: TLS 1.2, HTTPS-only, encryption enabled
- Features: Blob versioning, soft delete (7 days retention)
- Tags: `Project: resume`, `Environment: production`

### Quick Deploy

1. **Build Changes**: Make updates to local files
2. **Test Locally**: Verify changes in browser
3. **Deploy to Azure**: Upload files to `$web` container
4. **Verify Live**: Check <https://www.troymd.com>

### Deployment Methods

**Azure Storage Explorer** (Recommended):
- Connect to your storage account
- Navigate to `$web` container
- Drag and drop updated files
- Changes are live immediately

**Azure Portal**:
- Storage Account → Containers → `$web`
- Upload files individually or as batch
- Automatic propagation to CDN

## 🛠️ Development Workflow

### Local Development

1. **Clone Repository**:

   ```bash
   git clone https://github.com/yourusername/cloud-resume-azure.git
   cd cloud-resume-azure
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

4. **Commit Changes**:

   ```bash
   git add .
   git commit -m "feat: update experience section"
   git push origin main
   ```

### Branching Strategy

- **main**: Production-ready code
- **overhaul**: Major updates and refactoring
- **feature/***: Specific new features

### Code Standards

- **HTML**: Semantic markup, proper structure
- **CSS**: Organized, responsive, maintainable
- **JavaScript**: Clean, functional, well-commented
- **Files**: Keep files under 500 lines for maintainability

## 📁 File Structure

### HTML Template

- **index.html** (135 lines): Clean semantic HTML5 template with sections dynamically populated from JSON data

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

### JavaScript (Modular - all files <500 lines)

- **resume.js** (~820 lines): ResumeManager class - data loading, rendering, and interactive functionality
- **chatbot.js** (~160 lines): Chatbot class - FAQ chatbot logic and UI handling

### JSON Data Files

- **profile.json**: Name, title, summary, experience metrics, skills, social media
- **roles.json**: 18 work roles with descriptions, accomplishments, Gantt chart data
- **credentials.json**: Education, licenses, certifications
- **publications.json**: Publications, presentations with video/PDF links, press mentions
- **volunteer.json**: Volunteer activities and awards
- **technology.json**: Technology & Innovation portfolio with 6 categories and 15+ projects showcasing AI/ML, leadership tools, healthcare IT, data science, web development, and entrepreneurship
- **faq.json**: FAQ chatbot questions and answers with keyword-based matching

### Assets

- **presentations/**: PDF slide decks
- **assets/**: Images and documents

## 🎨 Design System

### CSS Organization

- **Base Styles**: Typography, colors, layout
- **Components**: Reusable UI elements
- **Sections**: Page-specific styling
- **Responsive**: Mobile-first media queries

### Color Palette

- **Primary**: Professional blue gradient
- **Accent**: UTMB blue, LinkedIn blue
- **Categories**: Admin (blue), Clinical (green), Academic (purple)

## 🔧 Customization

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

## 📱 Mobile Optimization

- Responsive design with mobile-first approach
- Touch-friendly navigation
- Optimized typography for small screens
- Fast loading performance

## 🔍 SEO Features

- Semantic HTML5 structure
- Meta tags for search engines
- Open Graph for social sharing
- Structured data markup
- Clean URLs and navigation

## 📈 Performance

- **Page Speed**: Optimized for <3 second load times
- **Caching**: Proper cache headers for static assets
- **Images**: Optimized and compressed
- **CSS/JS**: Minified for production

## 🤖 FAQ Chatbot

The site includes a fully functional client-side FAQ chatbot that intelligently answers questions about Troy's experience and expertise.

**Coverage**:

- Leadership experience and style
- AI/ML and technical expertise
- Healthcare IT systems experience
- Data science and analytics projects
- Entrepreneurship and startups
- Certifications and credentials
- Professional achievements and business impact
- Contact information

**Features**:

- Keyword-based intelligent matching across 20+ FAQ topics
- Smooth animations and typing indicators
- Mobile-responsive design with touch-friendly interface
- Greeting message on first interaction
- No backend dependencies (100% client-side)
- Graceful fallback for unmatched questions

**Data Structure**:

- FAQ data stored in `data/faq.json`
- Each Q&A includes keywords, question, and detailed answer
- Easy to update and expand without code changes

## 🔄 Future Enhancements

### Potential Upgrades

- **AI-Powered Chat**: Upgrade to GPT/ Claude API with dynamic hosting
- **Content Management**: Headless CMS for easier content updates
- **Analytics**: Visitor tracking and insights
- **A/B Testing**: Content optimization

### Migration Path

The static architecture allows easy migration to:
- Cloudflare Pages
- Netlify/Vercel
- AWS S3 + CloudFront
- Any static hosting service

## 🛠️ Troubleshooting

### Common Issues

**Changes Not Visible**:
- Clear browser cache (Ctrl+F5)
- Check CDN propagation (5-10 minutes)
- Verify file uploaded to correct container

**Styling Issues**:
- Check CSS file path in HTML
- Verify responsive breakpoints
- Test in different browsers

**Navigation Problems**:
- Check JavaScript console for errors
- Verify section IDs match navigation links
- Test mobile menu functionality

## 📞 Support

For technical questions or issues:

1. **Check this README** for common solutions
2. **Review Git history** for recent changes
3. **Test locally** before deploying
4. **Check Azure Storage** for file integrity

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Last Updated**: December 2024  
**Version**: 2.0 (Static Architecture)  
**Maintainer**: Troy E. Sybert
