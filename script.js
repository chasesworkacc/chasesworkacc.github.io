// Load content based on URL hash on page load
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1) || 'Home';    
    showSection(hash);
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

// force reload on back/forward navigation
window.addEventListener("popstate", function () {
    window.location.reload();
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
        document.querySelector('.content').innerHTML = content;
        
        // special case for chaser on yp page
        if (pageName === "VisNav") {
            engageChaser();
        }
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// show and animate yp gif chasing mouse
function engageChaser() {
    const chaser = document.getElementById("chaser");
    chaser.style.visibility = "visible";

    let currentX = document.documentElement.clientWidth / 2 - chaser.clientWidth / 2;
    let currentY = document.documentElement.clientHeight / 2 - chaser.clientHeight / 2;
    let mouseX = currentX, mouseY = currentY;
    
    document.addEventListener("mousemove", (event) => {
        mouseX = event.pageX - chaser.clientWidth / 2;
        mouseY = event.pageY - chaser.clientHeight / 2;
    });

    function animateChaser() {
        // Smoothly move toward mouse
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        // Get GIF dimensions
        const gifWidth = chaser.offsetWidth;
        const gifHeight = chaser.offsetHeight;
        
        // Get viewport size
        const maxX = document.documentElement.clientWidth - gifWidth;
        const maxY = document.documentElement.clientHeight - gifHeight;
        
        // Clamp values so GIF stays inside viewport
        const clampedX = Math.max(0, Math.min(currentX, maxX));
        const clampedY = Math.max(0, Math.min(currentY, maxY));
        
        chaser.style.left = clampedX + "px";
        chaser.style.top = clampedY + "px";
        
        requestAnimationFrame(animateChaser);
    }

    animateChaser();
}