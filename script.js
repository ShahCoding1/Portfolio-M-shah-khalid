document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       ELEMENTS
    ========================================================= */

    const header = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navBrand = document.querySelector(".nav-brand");
    const scrollTopButton = document.querySelector(".scroll-top");

    /* =========================================================
       HEADER HEIGHT
    ========================================================= */

    function getHeaderHeight() {
        return header ? header.getBoundingClientRect().height : 78;
    }

    /* =========================================================
       NAVIGATION SCROLL
       This is the important fix.
    ========================================================= */

    function scrollToSection(section) {
        if (!section) return;

        const headerHeight = getHeaderHeight();

        /*
         * Your section has internal top padding.
         *
         * We want:
         *
         * NAVBAR
         * -------------------------
         * SECTION HEADING
         *
         * Therefore we calculate:
         *
         * section top
         * + section's top padding
         * - navbar height
         */

        const sectionStyles = window.getComputedStyle(section);

        const paddingTop = parseFloat(sectionStyles.paddingTop) || 0;

        const sectionTop =
            section.getBoundingClientRect().top +
            window.scrollY;

        const targetPosition =
            sectionTop +
            paddingTop -
            headerHeight;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth"
        });
    }

    /* =========================================================
       NAV LINK CLICK
    ========================================================= */

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetSection = document.querySelector(targetId);

            if (!targetSection) return;

            event.preventDefault();

            scrollToSection(targetSection);

            /*
             * Close mobile navigation
             */
            if (navMenu) {
                navMenu.classList.remove("open");
            }

            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
            }

            /*
             * Remove active navigation state.
             * We don't want an underline or permanent active effect.
             */
            navLinks.forEach((item) => {
                item.classList.remove("active");
            });
        });
    });

    /* =========================================================
       BRAND / LOGO → TOP OF PAGE
    ========================================================= */

    if (navBrand) {
        navBrand.addEventListener("click", (event) => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            if (navMenu) {
                navMenu.classList.remove("open");
            }

            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navMenu.classList.toggle("open");

            navToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    }

    /* =========================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ========================================================= */

    document.addEventListener("click", (event) => {
        if (!navMenu || !navToggle) return;

        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = navToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            navMenu.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });

    /* =========================================================
       ESCAPE KEY
    ========================================================= */

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        if (navMenu && navMenu.classList.contains("open")) {
            navMenu.classList.remove("open");

            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
            }
        }
    });

    /* =========================================================
       HEADER SCROLL STATE
    ========================================================= */

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();

    /* =========================================================
       SCROLL TO TOP BUTTON
    ========================================================= */

    function updateScrollTopButton() {
        if (!scrollTopButton) return;

        if (window.scrollY > 600) {
            scrollTopButton.classList.add("visible");
        } else {
            scrollTopButton.classList.remove("visible");
        }
    }

    window.addEventListener(
        "scroll",
        updateScrollTopButton,
        { passive: true }
    );

    updateScrollTopButton();

    if (scrollTopButton) {
        scrollTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =========================================================
       REVEAL ANIMATIONS
    ========================================================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    /* =========================================================
       CURRENT YEAR
    ========================================================= */

    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* =========================================================
       KEYBOARD ACCESSIBILITY
    ========================================================= */

    navLinks.forEach((link) => {
        link.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                link.click();
            }
        });
    });

    /* =========================================================
       DEVELOPMENT MESSAGE
    ========================================================= */

    console.log(
        "%cM Shah Khalid — Portfolio",
        "font-size: 16px; font-weight: 700;"
    );

    console.log(
        "Software Engineer | AI/ML & Data Science | Web Development"
    );
});