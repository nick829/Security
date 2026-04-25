async function loadUser() {
    const res = await fetch("/api/user");

    if (!res.ok) {
        location.href = "/";
        return;
    }

    const user = await res.json();

    document.getElementById("userData").innerHTML = `
        Logged in as ${user.username}#${user.discriminator}
    `;
}

document.getElementById("lockdownBtn")
.addEventListener("click", async () => {
    alert("Lockdown feature enabled.");
});

loadUser();