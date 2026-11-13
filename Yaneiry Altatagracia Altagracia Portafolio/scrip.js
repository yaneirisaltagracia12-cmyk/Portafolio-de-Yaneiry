document.addEventListener("DOMContentLoaded", () => {

    
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const navbar = document.querySelector(".navbar");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const contactForm = document.getElementById("contactForm");
    const menuElement = document.getElementById("menuPrincipal");

   
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    
    function applyTheme(isDark) {

        body.classList.toggle("dark", isDark);

        if (navbar) {
            navbar.classList.toggle("bg-dark", isDark);
            navbar.classList.toggle("bg-primary", !isDark);

            navbar.style.backgroundColor = isDark
                ? "#35204d"
                : "#9461d9";
        }

        
        if (themeIcon) {
            themeIcon.classList.toggle("fa-moon", !isDark);
            themeIcon.classList.toggle("fa-sun", isDark);
        }

        if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(isDark));

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Activar modo claro" : "Activar modo oscuro"
            );
        }

        
        if (themeColorMeta) {
            themeColorMeta.setAttribute(
                "content",
                isDark ? "#241536" : "#9461d9"
            );
        }
    }

   
    applyTheme(
        savedTheme
            ? savedTheme === "dark"
            : systemPrefersDark.matches
    );

   
    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isDark = !body.classList.contains("dark");

            applyTheme(isDark);

            
            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );

        });

    }

   
    systemPrefersDark.addEventListener("change", (event) => {

        if (!localStorage.getItem("portfolio-theme")) {
            applyTheme(event.matches);
        }

    });

    
    document.querySelectorAll('.navbar a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            if (
                menuElement &&
                menuElement.classList.contains("show") &&
                window.bootstrap
            ) {
                window.bootstrap.Collapse
                    .getOrCreateInstance(menuElement)
                    .hide();
            }

        });

    });


    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const name = contactForm.elements["name"].value;

            alert(
                "¡Gracias por visitar mi portafolio, " +
                name +
                "! El formulario está validado, pero todavía no está conectado a un servicio de envío."
            );

            contactForm.reset();

        });

    }

});