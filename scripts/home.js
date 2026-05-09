const navBtn = document.querySelector("#nav-btn");
const navLink = document.querySelector("#nav-link");

navBtn.addEventListener('click',()=> {
    navBtn.classList.toggle('show');
    navLink.classList.toggle('show');

});









// Calculate total credits for the courses marked completed: true
const earnedCredits = courses
    .filter(course => course.completed)
    .reduce((sum, course) => sum + course.credits, 0);

// Display it in your HTML
document.querySelector('#earned-credits').innerHTML = `<strong>Credits Earned:</strong> ${earnedCredits}`;

// 1. Calculate credits for the current view (filtered)
    const viewTotal = courseList.reduce((sum, course) => sum + course.credits, 0);
    
    // 2. Calculate credits only for finished courses (of the entire list)
    const completedTotal = courses
        .filter(course => course.completed)
        .reduce((sum, course) => sum + course.credits, 0);

    document.querySelector('#total-credits').textContent = viewTotal;
    document.querySelector('#earned-credits').textContent = completedTotal;
