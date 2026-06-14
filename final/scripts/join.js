document.addEventListener("DOMContentLoaded", () => {
    // 1. Set Form Page-Load Timestamp
    const timestampField = document.getElementById("form-timestamp");
    if (timestampField) {
        const now = new Date();
        // Generates clean format: YYYY-MM-DD HH:MM:SS
        const formattedTimestamp = now.toISOString().slice(0, 10) + " " + now.toTimeString().slice(0, 8);
        timestampField.value = formattedTimestamp;
    }

    // 2. Control Dialog Modals
    const openButtons = document.querySelectorAll(".open-modal-btn");
    const closeButtons = document.querySelectorAll(".close-modal-btn");

    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal(); // Keeps keyboard focus locked inside the opened modal
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal if user clicks outside the modal content box area
    window.addEventListener("click", (event) => {
        if (event.target.tagName === "DIALOG") {
            event.target.close();
        }
    });
});