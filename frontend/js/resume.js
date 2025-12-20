// Resume Data Loader and Renderer
class ResumeManager {
    constructor() {
        this.data = {};
        this.sections = null;
        this.init();
    }

    async init() {
        try {
            window.scrollTo(0, 0);

            // Load all data files
            await this.loadData();

            // Render content
            this.renderProfile();
            this.renderTechnology();
            this.renderWorkExperience();
            this.renderCredentials();
            this.renderPublications();
            this.renderVolunteer();

            // Cache DOM elements after rendering
            this.sections = document.querySelectorAll('.section');

            // Setup interactivity
            this.setupSectionManagement();
            this.setupEventListeners();
            this.setupHashNavigation();
        } catch (error) {
            console.error('Error initializing resume:', error);
        }
    }

    async loadData() {
        try {
            console.log('Starting to load data files...');
            const [profile, roles, credentials, publications, volunteer, technology] = await Promise.all([
                fetch('data/profile.json').then(r => {
                    console.log('Profile response:', r.status);
                    return r.json();
                }),
                fetch('data/roles.json').then(r => {
                    console.log('Roles response:', r.status);
                    return r.json();
                }),
                fetch('data/credentials.json').then(r => {
                    console.log('Credentials response:', r.status);
                    return r.json();
                }),
                fetch('data/publications.json').then(r => {
                    console.log('Publications response:', r.status);
                    return r.json();
                }),
                fetch('data/volunteer.json').then(r => {
                    console.log('Volunteer response:', r.status);
                    return r.json();
                }),
                fetch('data/technology.json').then(r => {
                    console.log('Technology response:', r.status);
                    return r.json();
                })
            ]);

            this.data = { profile, roles, credentials, publications, volunteer, technology };
            console.log('All data loaded successfully:', this.data);
        } catch (error) {
            console.error('Error loading data:', error);
            console.error('Make sure you are running this through a web server, not opening the HTML file directly.');
            throw error;
        }
    }

    renderProfile() {
        const { profile } = this.data;

        // Render career experience
        const careerBox = document.querySelector('.career-box');
        if (careerBox) {
            careerBox.innerHTML = `
                <h3>CAREER EXPERIENCE</h3>
                <div class="experience-grid">
                    <div class="experience-item">
                        ${profile.experience.clinical_years} years<br>Clinical Experience
                    </div>
                    <div class="experience-item">
                        ${profile.experience.executive_years} years<br>Executive Experience
                    </div>
                    <div class="experience-item">
                        ${profile.experience.healthcare_it_years} years<br>Healthcare IT Experience
                    </div>
                </div>
                <div class="skills-grid">
                    ${profile.skills.map(skill => `<div class="skill-item">${skill}</div>`).join('')}
                </div>
            `;
        }

        // Render social media
        const socialGrid = document.querySelector('.social-media-grid');
        if (socialGrid) {
            socialGrid.innerHTML = profile.social_media.map(item => {
                const icons = {
                    linkedin: '<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>',
                    twitter: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
                    youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
                    github: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>'
                };

                const icon = icons[item.platform] ? `<svg class="social-media-icon" viewBox="0 0 24 24">${icons[item.platform]}</svg>` : '';
                const color = item.platform === 'doximity' ? ' style="color: black;"' : '';

                return `
                    <div class="social-media-item">
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer"${color}>
                            ${icon}
                            ${item.label}
                        </a>
                    </div>
                `;
            }).join('');
        }
    }

    renderTechnology() {
        const { technology } = this.data;
        const container = document.querySelector('#technology .section-content');

        if (!container) return;

        // Render preview metrics
        const previewMetrics = technology.preview_metrics.map(metric => {
            if (metric.badge) {
                return `<div class="tech-metric-badge">
                    <strong>${metric.badge}</strong>
                    <span>${metric.label}</span>
                </div>`;
            } else {
                return `<div class="tech-metric">
                    <strong>${metric.value}</strong>
                    <span>${metric.label}</span>
                </div>`;
            }
        }).join('');

        // Render category cards (compact)
        const categoryCards = technology.categories.map(category => `
            <div class="tech-category-card tech-category-${category.color}" data-category-id="${category.id}">
                <h3 class="tech-card-title">${category.name}</h3>
                <p class="tech-card-tagline">${category.tagline}</p>
                <div class="tech-card-count">${category.projects.length} Featured Project${category.projects.length > 1 ? 's' : ''}</div>
                <button class="tech-card-btn" aria-label="View ${category.name} details">View Details →</button>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="tech-preview">
                <p class="tech-tagline-main">${technology.tagline}</p>
                <div class="tech-metrics-grid">
                    ${previewMetrics}
                </div>
            </div>

            <div class="tech-categories-grid">
                ${categoryCards}
            </div>
        `;

        // Add click handlers to category cards
        container.querySelectorAll('.tech-category-card').forEach(card => {
            const btn = card.querySelector('.tech-card-btn');
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const categoryId = card.dataset.categoryId;
                const category = technology.categories.find(c => c.id === categoryId);
                this.openTechModal(category);
            });
        });
    }

    renderTechProject(project) {
        return `
            <div class="tech-project">
                <h4 class="project-name">${project.name}</h4>

                <div class="project-section">
                    <div class="project-label">THE PROBLEM</div>
                    <p>${project.problem}</p>
                </div>

                <div class="project-section">
                    <div class="project-label">THE SOLUTION</div>
                    <p>${project.solution}</p>
                </div>

                ${project.impact ? `
                    <div class="project-section">
                        <div class="project-label">BUSINESS IMPACT</div>
                        <ul class="impact-list">
                            ${project.impact.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                ${project.tech_stack ? `
                    <div class="project-section">
                        <div class="project-label">TECH STACK</div>
                        <div class="tech-tags">
                            ${project.tech_stack.map(tech => {
                                if (typeof tech === 'object' && tech.link) {
                                    return `<a href="${tech.link}" target="_blank" rel="noopener noreferrer" class="tech-tag tech-tag-link">${tech.text}</a>`;
                                }
                                return `<span class="tech-tag">${tech}</span>`;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                ${project.systems ? `
                    <div class="project-section">
                        <div class="project-label">SYSTEMS</div>
                        <div class="tech-tags">
                            ${project.systems.map(sys => `<span class="tech-tag">${sys}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${project.use_cases ? `
                    <div class="project-section">
                        <div class="project-label">USE CASES</div>
                        <ul class="use-cases-list">
                            ${project.use_cases.map(uc => `<li>${uc}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                ${project.certifications ? `
                    <div class="project-section">
                        <div class="project-label">CERTIFICATIONS</div>
                        <ul>
                            ${project.certifications.map(cert => `<li>${cert}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <div class="project-meta">
                    ${project.status ? `<span class="project-status">${project.status}</span>` : ''}
                    ${project.experience ? `<span class="project-experience">${project.experience}</span>` : ''}
                    ${project.role ? `<span class="project-role">${project.role}</span>` : ''}
                    ${project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Project →</a>` : ''}
                </div>
            </div>
        `;
    }

    renderWorkExperience() {
        const { roles } = this.data;

        // Render categorized view
        const categoriesContainer = document.querySelector('.work-categories.view-categorized');
        if (categoriesContainer) {
            const categories = {
                administrative: roles.roles.filter(r => r.category === 'administrative'),
                clinical: roles.roles.filter(r => r.category === 'clinical'),
                academic: roles.roles.filter(r => r.category === 'academic')
            };

            categoriesContainer.innerHTML = Object.entries(categories).map(([category, items]) => `
                <div class="work-category" data-category="${category}">
                    <div class="work-category-header">
                        <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <div class="work-category-toggle">
                            <svg viewBox="0 0 24 24">
                                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="timeline">
                        ${items.map(role => this.renderRole(role)).join('')}
                    </div>
                </div>
            `).join('');
        }

        // Render Gantt chart
        this.renderGanttChart(roles.roles);
    }

    renderRole(role) {
        const companyLink = role.company_url ?
            `<a href="${role.company_url}" target="_blank" rel="noopener noreferrer">${role.company}</a>` :
            role.company;

        let accomplishmentsHtml = '';
        if (role.accomplishments_sections) {
            accomplishmentsHtml = `
                <div class="accomplishments-section">
                    ${role.accomplishments_sections.map(section => `
                        <h4>${section.title}</h4>
                        <ul class="accomplishments">
                            ${section.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    `).join('')}
                </div>
            `;
        } else if (role.accomplishments) {
            accomplishmentsHtml = `
                <ul class="accomplishments">
                    ${role.accomplishments.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        }

        return `
            <div class="timeline-item" data-category="${role.category}" data-date="${role.date_start}" data-end-date="${role.date_end}">
                <div class="role-title">${role.title}</div>
                <div class="company-meta">
                    <div class="company-name">${companyLink}</div>
                    <div class="location">${role.location}</div>
                </div>
                <div class="role-meta">
                    <span class="dates">${role.dates_display}</span>
                </div>
                ${role.company_description ? `<div class="company-description">${role.company_description}</div>` : ''}
                ${role.job_description ? `<div class="job-description">${role.job_description}</div>` : ''}
                ${accomplishmentsHtml}
            </div>
        `;
    }

    renderGanttChart(roles) {
        const ganttEntries = document.querySelector('.gantt-entries');
        if (!ganttEntries) return;

        const adminRoles = roles.filter(r => r.category === 'administrative' && r.gantt_start);
        const clinicalRoles = roles.filter(r => r.category === 'clinical' && r.gantt_start);
        const academicRoles = roles.filter(r => r.category === 'academic' && r.gantt_start);

        ganttEntries.innerHTML = `
            ${adminRoles.map(role => `
                <div class="gantt-entry admin${role.gantt_position ? ' label-' + role.gantt_position : ''}"
                     style="--start: ${role.gantt_start}; --end: ${role.gantt_end};">
                    <div class="entry-label">${role.gantt_label}</div>
                </div>
            `).join('')}

            ${clinicalRoles.map(role => `
                <div class="gantt-entry clinical${role.gantt_position ? ' label-' + role.gantt_position : ''}"
                     style="--start: ${role.gantt_start}; --end: ${role.gantt_end};">
                    <div class="entry-label">${role.gantt_label}</div>
                </div>
            `).join('')}

            ${academicRoles.map(role => `
                <div class="gantt-entry academic${role.gantt_position ? ' label-' + role.gantt_position : ''}"
                     style="--start: ${role.gantt_start}; --end: ${role.gantt_end};">
                    <div class="entry-label">${role.gantt_label}</div>
                </div>
            `).join('')}

            <div class="gantt-footnote">*Active</div>
            <div class="gantt-category-admin">Administrative</div>
            <div class="gantt-category-clinical">Clinical</div>
            <div class="gantt-category-academic">Academic</div>
        `;
    }

    renderCredentials() {
        const { credentials } = this.data;
        const container = document.querySelector('#credentials .section-content');
        if (!container) return;

        container.innerHTML = `
            <div class="credentials-section">
                <h3>Education</h3>
                <div class="credentials-grid">
                    ${credentials.education.map(edu => `
                        <div class="credential-card">
                            <div class="credential-title">${edu.degree}</div>
                            <div class="credential-subtitle">
                                <a href="${edu.institution_url}" target="_blank" rel="noopener noreferrer">${edu.institution}</a>
                            </div>
                            <div class="credential-meta">${edu.location} | ${edu.years}</div>
                            ${edu.honors ? `<div class="credential-meta">${edu.honors}</div>` : ''}
                        </div>
                    `).join('')}
                </div>

                <h3>Post-Graduate Training</h3>
                <div class="credentials-grid">
                    ${credentials.postgraduate_training.map(training => `
                        <div class="credential-card">
                            <div class="credential-title">${training.program}</div>
                            <div class="credential-subtitle">
                                <a href="${training.institution_url}" target="_blank" rel="noopener noreferrer">${training.institution}</a>
                            </div>
                            <div class="credential-meta">${training.location} | ${training.years}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="medical-licenses">
                    <h3>Medical Licenses</h3>
                    <div class="credentials-grid">
                        ${credentials.medical_licenses.map(license => {
                            if (license.type === 'Historical Licensure') {
                                return `
                                    <div class="credential-card">
                                        <div class="credential-title">${license.type}</div>
                                        <div class="credential-meta">
                                            <span class="credential-status status-inactive">Inactive</span>
                                            <div class="previous-licenses" style="margin-top: 0.2rem; padding-top: 0.2rem;">
                                                ${license.previous_states.map(state => `<div>${state}</div>`).join('')}
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }
                            return `
                                <div class="credential-card">
                                    <div class="credential-title">${license.type || `Medical License #${license.license_number}`}</div>
                                    ${license.board_url ?
                                        `<div class="credential-subtitle"><a href="${license.board_url}" target="_blank" rel="noopener noreferrer">${license.board}</a></div>` :
                                        `<div class="credential-subtitle">${license.board}</div>`
                                    }
                                    <div class="credential-meta">
                                        <span class="credential-status status-${license.status}">${license.status.charAt(0).toUpperCase() + license.status.slice(1)}</span>
                                        <div>Expires: ${license.expiration}</div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <h3>Board Certifications</h3>
                <div class="credentials-grid">
                    ${credentials.board_certifications.map(cert => `
                        <div class="credential-card">
                            <div class="credential-title">${cert.specialty}</div>
                            <div class="credential-subtitle">
                                <a href="${cert.board_url}" target="_blank" rel="noopener noreferrer">${cert.board}</a>
                            </div>
                            <div class="credential-meta">
                                <span class="credential-status status-${cert.status}">${cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}</span>
                                <div>Expires: ${cert.expiration}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <h3>Additional Certifications</h3>
                <div class="credentials-grid">
                    ${credentials.additional_certifications.map(cert => `
                        <div class="credential-card">
                            <div class="credential-title">${cert.certification}</div>
                            <div class="credential-subtitle">
                                ${cert.organization}
                                ${cert.credential_url ? `<br><a href="${cert.credential_url}" target="_blank" rel="noopener noreferrer">Program Details</a>` : ''}
                            </div>
                            <div class="credential-meta">
                                <span class="credential-status status-${cert.status}">${cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}</span>
                                <div>${cert.completion ? cert.completion : (cert.year ? `Issued: ${cert.year}` : cert.years)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderPublications() {
        const { publications } = this.data;
        const container = document.querySelector('#publications .section-content');
        if (!container) return;

        container.innerHTML = `
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-content">
                        <h3>Publications</h3>
                        <ul class="publication-list">
                            ${publications.publications.map(pub => `
                                <li>
                                    ${pub.authors}. ${pub.title}.
                                    ${pub.url ?
                                        `<a href="${pub.url}" target="_blank" rel="noopener noreferrer">${pub.publication}</a>` :
                                        pub.publication
                                    }${pub.location ? `, ${pub.location}` : ''}${pub.citation ? `. ${pub.citation}` : ''}.
                                    <span class="publication-date">Published ${pub.date}</span>
                                </li>
                            `).join('')}
                        </ul>

                        <h3>Presentations</h3>
                        <ul class="presentation-list">
                            ${publications.presentations.map(pres => `
                                <li>
                                    "${pres.title}"
                                    ${pres.video_url ?
                                        `<a href="${pres.video_url}" target="_blank" rel="noopener noreferrer">${pres.event}, ${pres.location}</a>` :
                                        `${pres.event}, ${pres.location}`
                                    }.
                                    <span class="presentation-date">${pres.date}</span>
                                    ${pres.description ? `<div class="presentation-description">${pres.description}</div>` : ''}
                                    ${pres.slides_pdf || pres.video_url ? `
                                        <div class="presentation-resources">
                                            ${pres.slides_pdf ? `
                                                <a href="${pres.slides_pdf}" target="_blank" rel="noopener noreferrer" class="resource-link">
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M13,13V19H15V13H19L16,10L13,13Z"/>
                                                    </svg>
                                                    Slide Deck (PDF)
                                                </a>
                                            ` : ''}
                                            ${pres.video_url ? `
                                                <a href="${pres.video_url}" target="_blank" rel="noopener noreferrer" class="resource-link">
                                                    <svg viewBox="0 0 24 24">
                                                        <path d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                                                    </svg>
                                                    Watch Presentation
                                                </a>
                                            ` : ''}
                                        </div>
                                    ` : ''}
                                </li>
                            `).join('')}
                        </ul>

                        <h3>Press Mentions</h3>
                        <ul class="press-list">
                            ${publications.press_mentions.map(press => `
                                <li>
                                    "${press.title}"
                                    <a href="${press.url}" target="_blank" rel="noopener noreferrer">${press.publication}</a>.
                                    <span class="press-date">Published ${press.date}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    renderVolunteer() {
        const { volunteer } = this.data;
        const container = document.querySelector('#volunteer .section-content');
        if (!container) return;

        // Split volunteer work into two columns
        const midpoint = Math.ceil(volunteer.volunteer_work.length / 2);
        const col1 = volunteer.volunteer_work.slice(0, midpoint);
        const col2 = volunteer.volunteer_work.slice(midpoint);

        // Split awards into two columns
        const awardsMidpoint = Math.ceil(volunteer.awards.length / 2);
        const awardsCol1 = volunteer.awards.slice(0, awardsMidpoint);
        const awardsCol2 = volunteer.awards.slice(awardsMidpoint);

        container.innerHTML = `
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-content">
                        <h3>Volunteer Work</h3>
                        <div class="volunteer-grid">
                            <div>
                                <ul class="volunteer-list">
                                    ${col1.map(item => `
                                        <li>
                                            <div class="volunteer-role">${item.role}</div>
                                            <div class="volunteer-meta">${item.organization}</div>
                                            <span class="volunteer-date">${item.years}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            <div>
                                <ul class="volunteer-list">
                                    ${col2.map(item => `
                                        <li>
                                            <div class="volunteer-role">${item.role}</div>
                                            <div class="volunteer-meta">${item.organization}</div>
                                            <span class="volunteer-date">${item.years}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>

                        <h3>Awards & Recognition</h3>
                        <div class="awards-grid">
                            <div>
                                <ul class="awards-list">
                                    ${awardsCol1.map(award => `
                                        <li>
                                            <div class="award-title">${award.title}</div>
                                            <div class="award-meta">${award.organization || award.award}</div>
                                            <span class="award-date">${award.year}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            <div>
                                <ul class="awards-list">
                                    ${awardsCol2.map(award => `
                                        <li>
                                            <div class="award-title">${award.title}</div>
                                            <div class="award-meta">${award.organization || award.award}</div>
                                            <span class="award-date">${award.year}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupSectionManagement() {
        // Initial state setup - collapse all sections except summary
        this.sections.forEach(section => {
            if (section.id !== 'summary') {
                section.classList.add('collapsed');
            }
        });

        // Add click handlers to section headers
        this.sections.forEach(section => {
            const header = section.querySelector('.section-header');
            if (header) {
                header.style.cursor = 'pointer';
                header.addEventListener('click', (e) => {
                    e.preventDefault();
                    section.classList.toggle('collapsed');
                });
            }
        });

        // Handle work category headers
        const workCategoryHeaders = document.querySelectorAll('.work-category-header');
        workCategoryHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const category = header.closest('.work-category');
                if (category) {
                    category.classList.toggle('collapsed');
                }
            });
        });

        // Initialize work categories as collapsed
        document.querySelectorAll('.work-category').forEach(category => {
            category.classList.add('collapsed');
        });

        // Handle view toggles
        const viewToggles = document.querySelectorAll('.view-toggle input');
        viewToggles.forEach(toggle => {
            toggle.addEventListener('change', () => {
                const view = toggle.value;
                document.querySelectorAll('.work-categories').forEach(cat => {
                    cat.classList.remove('active');
                });
                const activeView = document.querySelector(`.work-categories.view-${view}`);
                if (activeView) {
                    activeView.classList.add('active');
                }
            });
        });
    }

    setupEventListeners() {
        // Handle navigation active state
        const sections = document.querySelectorAll('.section');

        const updateActiveNavLink = () => {
            const fromTop = window.scrollY + 100;

            sections.forEach(section => {
                const link = document.querySelector(`.nav-menu a[href="#${section.id}"]`);
                if (!link) return;

                const { top, bottom } = section.getBoundingClientRect();
                const sectionTop = top + window.pageYOffset;
                const sectionBottom = bottom + window.pageYOffset;

                if (fromTop >= sectionTop && fromTop <= sectionBottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveNavLink);
        updateActiveNavLink();
    }

    setupHashNavigation() {
        const handleHashNavigation = () => {
            const hash = window.location.hash;
            if (hash) {
                const targetSection = document.querySelector(hash);
                if (targetSection) {
                    this.sections.forEach(section => {
                        if (section.id !== 'summary') {
                            section.classList.add('collapsed');
                        }
                    });

                    targetSection.classList.remove('collapsed');
                    window.scrollTo(0, 0);
                }
            }
        };

        if (window.location.hash) {
            handleHashNavigation();
        }

        window.addEventListener('hashchange', handleHashNavigation);

        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    e.preventDefault();
                    history.pushState(null, null, '#' + targetId);
                    handleHashNavigation();
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    openTechModal(category) {
        // Create modal HTML
        const modalHTML = `
            <div class="tech-modal-overlay" id="techModal">
                <div class="tech-modal">
                    <div class="tech-modal-header tech-modal-${category.color}">
                        <h2>${category.name}</h2>
                        <button class="tech-modal-close" aria-label="Close modal">&times;</button>
                    </div>
                    <div class="tech-modal-body">
                        <p class="tech-modal-tagline">${category.tagline}</p>

                        <div class="tech-modal-projects">
                            ${category.projects.map(project => this.renderTechProject(project)).join('')}
                        </div>

                        ${category.credentials ? `
                            <div class="tech-credentials">
                                <h4>Relevant Credentials</h4>
                                <ul>
                                    ${category.credentials.map(cred => `<li>${cred}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Get modal elements
        const modal = document.getElementById('techModal');
        const closeBtn = modal.querySelector('.tech-modal-close');

        // Close handlers
        closeBtn.addEventListener('click', () => this.closeTechModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeTechModal();
        });

        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeTechModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Add fade-in animation
        requestAnimationFrame(() => {
            modal.classList.add('tech-modal-show');
        });
    }

    closeTechModal() {
        const modal = document.getElementById('techModal');
        if (modal) {
            modal.classList.remove('tech-modal-show');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }
}

// Initialize the ResumeManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeManager();
});
