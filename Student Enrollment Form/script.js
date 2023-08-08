document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector("form.enrollment-form button[type='submit']");
    const tableBody = document.querySelector(".container2 tbody");
    const enrolledStudentsSection = document.querySelector("#Enrolled-students");

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const website = document.getElementById("website").value;
        const gender = document.querySelector('input[name="gender"]:checked').id;
        const skillsInputs = document.querySelectorAll('input[name="skills"]:checked');
        const skillsArray = Array.from(skillsInputs).map(skill => skill.id).join(", ");

        const imgLink = document.getElementById("imglink").value;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="details">
                <p><span>Name: </span>${name}</p>
                <p><span>Email: </span>${email}</p>
                <p><span>Website: </span><a target="_blank" href="${website}">Click <i class='fa fa-external-link'></i></a></p>
                <p><span>Gender: </span>${gender}</p>
                <p><span>Skills: </span>${skillsArray}</p>
                <button class="delete-button">Delete <i class='fa fa-trash'></i>
                </button>
            </td>
            <td><img src="${imgLink}" href="${imgLink}" alt="Profile"></td>
        `;

        tableBody.appendChild(newRow);
        alert("Student Enrolled successfully!");
        document.querySelector("form.enrollment-form").reset();
        enrolledStudentsSection.style.display = "block";
        enrolledStudentsSection.scrollIntoView({ behavior: "smooth" });

        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const row = button.closest("tr");
                row.remove();
            });
        });
    });
});