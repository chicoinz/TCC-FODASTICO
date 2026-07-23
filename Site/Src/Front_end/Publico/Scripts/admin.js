/**
 * Admin Dashboard - Accordion Management
 * Handles expand/collapse of sections in the admin profile
 */

document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.getElementsByClassName("accordion");
    
    for (let i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener("click", function() {
            const isActive = this.classList.contains('active');

            // Close all sections first
            for (let j = 0; j < accordions.length; j++) {
                accordions[j].classList.remove('active');
                const panel = accordions[j].nextElementSibling;
                if (panel) panel.style.display = 'none';
                const parent = accordions[j].closest('.section');
                if (parent) parent.classList.remove('open');
            }

            // If it wasn't active, open the clicked one and expand it
            if (!isActive) {
                this.classList.add('active');
                const panel = this.nextElementSibling;
                if (panel) panel.style.display = 'block';
                const parentSection = this.closest('.section');
                if (parentSection) parentSection.classList.add('open');
            }
        });
    }
});
