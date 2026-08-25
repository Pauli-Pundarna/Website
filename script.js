const toast = document.querySelector("#toast");
const command = document.querySelector("#install-command");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

document.querySelectorAll("[data-download]").forEach((button) => {
    button.addEventListener("click", () => {
        const fileName = button.dataset.download;
        command.textContent = fileName.endsWith(".dmg")
            ? `open ${fileName}`
            : fileName.endsWith(".exe")
                ? `start ${fileName}`
                : `chmod +x ${fileName} && ./${fileName}`;
        showToast(`${fileName} download placeholder triggered.`);
    });
});

document.querySelector("#copy-command").addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(command.textContent);
        showToast("Install command copied.");
    } catch {
        showToast("Copy unavailable in this preview.");
    }
});
