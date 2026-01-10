const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    // ... add all objects from the provided course list array
];

function displayCourses(filteredCourses) {
    const container = document.querySelector("#course-list");
    container.innerHTML = ""; // Clear existing

    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed");
        
        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        container.appendChild(card);
    });

    // Calculate total credits using reduce
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector("#total-credits").textContent = `Total Credits: ${total}`;
}

// Initial display
displayCourses(courses);

// Button Listeners
document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#wdd").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});
// Repeat for CSE...