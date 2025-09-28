document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".floating-toggle");
    const contact = document.querySelector(".floating-contact");
    const modal = document.getElementById("product-modal");
    const closeBtn = document.querySelector(".close-btn");
    const productSections = document.querySelectorAll(".product-section");
    const scrollDown = document.getElementById("scroll-down");

    // Toggle contact
    function toggleContact() {
        contact.classList.toggle("show");
    }
    toggle.addEventListener("click", toggleContact);
    document.querySelectorAll(".btn-contact").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            toggleContact();
        });
    });

    document.querySelectorAll(".btn-buy").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault(); // bỏ mặc định
            window.open("https://www.facebook.com/taphoask", "_blank");
        });
    });

    // Intro typing
    const textElement = document.getElementById("intro-text");
    if (textElement) {
        const fullText = textElement.innerHTML.trim();
        const chars = fullText.split("");
        let index = 0;
        let typing = setInterval(() => {
            if (index < chars.length) {
                textElement.innerHTML += chars[index++];
            } else {
                clearInterval(typing);
            }
        }, 50);

        document.getElementById("intro-section").addEventListener("click", () => {
            if (typing) clearInterval(typing);
            textElement.innerHTML = fullText;
        });
    }

    scrollDown.addEventListener("click", () => {
        window.scrollBy({
            top: window.innerHeight,   // cuộn đúng 1 màn hình
            left: 0,
            behavior: "smooth"
        });
    });

    // Mở modal khi click section
    productSections.forEach(section => {
        section.addEventListener("click", () => {
            document.querySelectorAll(".page-group").forEach(g => {
                g.classList.remove("active");
                g.style.display = "none";
            });

            const title = section.querySelector("h2").innerText;
            let targetGroup = null;
            if (title.includes("KING")) targetGroup = document.getElementById("book-king");
            else if (title.includes("QUEEN")) targetGroup = document.getElementById("book-queen");
            else if (title.includes("TRENDING")) targetGroup = document.getElementById("book-trending");
            else targetGroup = document.getElementById("book-other");

            if (targetGroup) {
                targetGroup.classList.add("active");
                targetGroup.style.display = "block";

                const tabs = targetGroup.querySelectorAll(".tab-btn");
                const pages = targetGroup.querySelectorAll(".page");

                tabs.forEach((b, i) => b.classList.toggle("active", i === 0));
                pages.forEach((p, i) => p.classList.toggle("active", i === 0));

                // Gắn click cho tab (1 lần duy nhất)
                tabs.forEach(btn => {
                    btn.addEventListener("click", () => {
                        const targetId = btn.dataset.tab;
                        tabs.forEach(b => b.classList.remove("active"));
                        pages.forEach(p => p.classList.remove("active"));
                        btn.classList.add("active");
                        const page = targetGroup.querySelector("#" + targetId);
                        if (page) page.classList.add("active");
                        resizeModal();
                    });
                });
            }
            modal.style.display = "flex";
            resizeModal();
        });
    });

    // Đóng modal
    closeBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", e => {
        if (e.target === modal) modal.style.display = "none";
    });

    // Resize modal
    function resizeModal() {
        const modalContent = document.querySelector(".modal-content");
        const activeGroup = document.querySelector(".page-group.active");
        if (!modalContent || !activeGroup) return;
        modalContent.style.height = (activeGroup.scrollHeight + 60) + "px";
    }
    window.addEventListener("resize", resizeModal);
});
