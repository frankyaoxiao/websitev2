// Tab switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Handle initial hash in URL
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        document.querySelector(`a[href="#${hash}"]`)?.classList.add('active');
        document.getElementById(hash).classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the target section
            const targetId = link.getAttribute('href').substring(1);

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link and corresponding section
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Load blog posts
    loadBlogPosts();
});

async function loadBlogPosts() {
    try {
        const response = await fetch('blog/posts.json');
        const posts = await response.json();
        
        const blogPostsContainer = document.getElementById('blog-posts');
        
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = '<p class="placeholder">No posts yet...</p>';
            return;
        }
        
        blogPostsContainer.innerHTML = posts.map(post => `
            <article class="blog-preview">
                <a href="blog/${post.file}" class="blog-preview-link">
                    <h2 class="blog-preview-title">${post.title}</h2>
                    <p class="blog-preview-description">${post.description}</p>
                    <time class="blog-preview-date">${formatDate(post.date)}</time>
                </a>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById('blog-posts').innerHTML = '<p class="placeholder">Error loading posts...</p>';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
