// Only run this script on the solutions page
function isSolutionsPage() {
    return window.location.pathname === '/solutions' || 
           window.location.pathname === '/solutions/';
}

function createBadge(text, type, href = null) {
    const element = href ? document.createElement('a') : document.createElement('span');
    element.className = `badge badge-${type}`;
    
    if (type === 'creator') {
        // Add GitHub logo
        const githubLogo = document.createElement('svg');
        githubLogo.className = 'github-icon';
        githubLogo.setAttribute('viewBox', '0 0 16 16');
        githubLogo.setAttribute('width', '14');
        githubLogo.setAttribute('height', '14');
        githubLogo.innerHTML = `
            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        `;
        element.appendChild(githubLogo);
    }
    
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    element.appendChild(textSpan);
    
    if (href) {
        element.href = href;
        element.target = '_blank';
        element.rel = 'noopener noreferrer';
        
        // Prevent the badge click from triggering the card link
        element.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    return element;
}

async function fetchSolutionMetadata(path) {
    try {
        const response = await fetch(`https://api.github.com/repos/ben-meeker/servicenow-solutions/contents/${path}`);
        const data = await response.json();
        const content = atob(data.content);
        
        const metadata = {
            title: '',
            type: 'General',
            creator: 'Anonymous',
            creatorUrl: null
        };

        const lines = content.split('\n');
        
        // Try frontmatter first
        if (lines[0]?.trim() === '---') {
            let i = 1;
            while (i < lines.length && lines[i].trim() !== '---') {
                const line = lines[i].trim();
                const [key, value] = line.split(':').map(s => s.trim());
                if (key && value) {
                    metadata[key.toLowerCase()] = value;
                }
                i++;
            }
        }
        
        // If no title in frontmatter, try to get it from the first h1
        if (!metadata.title) {
            for (const line of lines) {
                if (line.startsWith('# ')) {
                    metadata.title = line.substring(2).trim();
                    break;
                }
            }
        }

        // Get type from the first ### heading (if it exists)
        if (metadata.type === 'General') {
            for (const line of lines) {
                if (line.startsWith('### ') && !line.startsWith('### Creator:')) {
                    metadata.type = line.substring(4).trim();
                    break;
                }
            }
        }
        
        // Try to find creator from ### Creator: line
        if (metadata.creator === 'Anonymous') {
            for (const line of lines) {
                if (line.startsWith('### Creator:')) {
                    const creatorMatch = line.match(/\[@([^\]]+)\]\(([^)]+)\)/);
                    if (creatorMatch) {
                        metadata.creator = creatorMatch[1];
                        metadata.creatorUrl = creatorMatch[2];
                    } else {
                        metadata.creator = line.substring(11).trim();
                    }
                    break;
                }
            }
        }
        
        return metadata;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return {
            title: '',
            type: 'General',
            creator: 'Anonymous',
            creatorUrl: null
        };
    }
}

function createSolutionCard(title, type, creator, creatorUrl) {
    const card = document.createElement('div');
    card.className = 'solution-card';
    
    const badges = document.createElement('div');
    badges.className = 'solution-badges';
    
    badges.appendChild(createBadge(type, 'type'));
    badges.appendChild(createBadge(creator, 'creator', creatorUrl));
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'solution-title';
    titleEl.textContent = title;
    
    card.appendChild(badges);
    card.appendChild(titleEl);
    
    return card;
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
    if (!isSolutionsPage()) return;

    const list = document.getElementById('solutions-ul');
    if (!list) {
        console.error('Could not find solutions list element');
        return;
    }

    list.classList.add('loading');

    try {
        const response = await fetch('https://api.github.com/repos/ben-meeker/servicenow-solutions/contents/solutions');
        if (!response.ok) {
            throw new Error(`GitHub API responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('GitHub API Response:', data);

        if (!Array.isArray(data)) {
            throw new Error('Expected array of files from GitHub API, received: ' + typeof data);
        }

        for (let file of data) {
            if (file.name === "index.html") continue;

            // Fetch metadata from index.md
            const metadata = await fetchSolutionMetadata(`solutions/${file.name}/index.md`);
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `/solutions/${file.name}`;
            
            const title = metadata.title || file.name;
            const type = metadata.type || 'General';
            const creator = metadata.creator || 'Anonymous';
            const creatorUrl = metadata.creatorUrl;
            
            a.appendChild(createSolutionCard(title, type, creator, creatorUrl));
            li.appendChild(a);
            list.appendChild(li);
        }

        list.classList.remove('loading');
        
        // Format the titles after all cards are created
        if (typeof formatSolutionLinks === 'function') {
            formatSolutionLinks();
        }
    } catch (error) {
        console.error('Detailed error:', error);
        list.classList.remove('loading');
        list.innerHTML = `<li class="error">Error loading solutions: ${error.message}</li>`;
    }
});