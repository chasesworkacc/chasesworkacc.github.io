// force reload on back/forward navigation
window.addEventListener("popstate", function () {
    window.location.reload();
});

// highlight the correct menu item
document.querySelectorAll('.menu-item').forEach(link => {
    link.addEventListener('click', function(e) {
        // Allow the hash to change first
        setTimeout(() => {
            location.reload();
        }, 0);
    });
});

// Load content based on URL hash on page load
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1) || 'Home';    
    showSection(hash);
});

async function showSection(pageName) {
    try {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            if (item.textContent === pageName) {
                item.classList.add('active');
            }
        });
        
        // Fetch and load content
        const response = await fetch(`content/${pageName}.html`, {cache:"no-store"});
        const content = await response.text();
        
        // inject content
        const contentArea = document.querySelector('.content-area');
        contentArea.innerHTML = content;

        // load scripts from the content
        const scripts = contentArea.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');

            if (oldScript.src) {
                newScript.src = oldScript.src;
            } else {
                newScript.textContent = oldScript.textContent;
            }

            document.body.appendChild(newScript);
        });
        
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// set cool background
function setCoolBackground() {
    const backgrounds = [
        "256color.bmp",
        "cars.bmp",
        "flock.bmp",
        "marble.bmp",
        "tartan.bmp",
        "arcade.bmp",
        "castle.bmp",
        "gray.bmp",
        "redbrick.bmp",
        "thatch.bmp",
        "arches.bmp",
        "chitz.bmp",
        "honey.bmp",
        "rivets.bmp",
        "zigzag.bmp",
        "argyle.bmp",
        "egypt.bmp",
        "leaves.bmp",
        "squares.bmp",
    ];
    
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url('assets/backgrounds/${randomBg}')`;
}
setCoolBackground();