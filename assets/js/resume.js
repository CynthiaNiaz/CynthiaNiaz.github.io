/* ============================================
   RESUME PAGE JAVASCRIPT
   ============================================ */

// Coursework toggle functionality
function toggleCoursework() {
    const additionalCourses = document.getElementById('additionalCourses');
    const button = document.querySelector('.toggle-coursework');
    
    if (additionalCourses && button) {
        if (additionalCourses.classList.contains('expanded')) {
            additionalCourses.classList.remove('expanded');
            button.textContent = 'Show more courses';
        } else {
            additionalCourses.classList.add('expanded');
            button.textContent = 'Show fewer courses';
        }
    }
}
