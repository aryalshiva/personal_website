document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.resume_item');

    const sections = {
        Skills: document.getElementById('skillsSection'),
        Education: document.getElementById('educationSection'),
        Experience: document.getElementById('experienceSection')
    };

    function showSection(selected) {
        Object.keys(sections).forEach(key => {
            const section = sections[key];
            if (key === selected) {
                section.style.display = 'block'; // make visible first
                setTimeout(() => {
                    section.classList.add('show'); // trigger fade-in
                }, 10);
            } else {
                section.classList.remove('show'); // start fade-out
                setTimeout(() => {
                    section.style.display = 'none'; // hide after transition
                }, 500); // match CSS transition duration
            }
        });
    }

    // Default section shown
    showSection('Skills');

    // Highlight the Skills tab by default
    tabs.forEach(tab => {
        if (tab.getAttribute('timeline') === 'Skills') {
            tab.classList.add('active-resume');
        } else {
            tab.classList.remove('active-resume');
        }
    });

    // Handle tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const selected = tab.getAttribute('timeline');

            // Update tab highlight
            tabs.forEach(t => t.classList.remove('active-resume'));
            tab.classList.add('active-resume');

            // Show corresponding section
            showSection(selected);
        });
    });
});
