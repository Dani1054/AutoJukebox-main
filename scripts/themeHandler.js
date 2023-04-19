let preferredTheme;

function changeTheme() {
    /**
     * Unutar ove funkcije radim XMLHttpRequest da dobijem zeljenu temu
     * Nakon toga pomocu toga promijenim temu u korisnikovu zeljenu
     *
     * Da se promijeni teme za sada, treba se ici u themes/text.txt i svati ime foldera od te teme
     */
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        preferredTheme = (this.responseText).replace("\r\n", "");

        if (preferredTheme === "default") {
            return 0;
        }

        const iconsElements = document.body.querySelectorAll("[src^='themes']");

        iconsElements.forEach(icon => {
            let srcPathIcons = icon.getAttribute("src");
            icon.setAttribute("src", srcPathIcons.replace("default", preferredTheme));
        });

        let cssSourceFile = document.getElementById("css-theme-file");
        let stylesheetHref = cssSourceFile.getAttribute("href");
        cssSourceFile.setAttribute("href", stylesheetHref.replace("default", preferredTheme));
    };

    xhttp.open("GET", "themes/theme.txt", true);
    xhttp.send();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", changeTheme);
} else {
    changeTheme();
}
