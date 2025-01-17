document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu");
    
    // Fonction pour analyser le CSV
    function parseCSV(data) {
        const rows = data.trim().split("\n").map(row => row.split(","));
        const headers = rows.shift(); // En-tête
        return rows.map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = row[index].trim();
            });
            return obj;
        });
    }

    // Générer le menu
    function generateMenu(data) {
        let currentClass = null;
        let currentSubClass = null;

        const ulMenu = document.createElement("ul");

        data.forEach(row => {
            const classe = row['"classe"'].replace(/^"|"$/g, '');
            const sousClasse = row['"sous_classe"'].replace(/^"|"$/g, '');

            // Nouvelle classe
            if (classe !== currentClass) {
                if (currentClass !== null) {
                    ulMenu.appendChild(currentClassUl); // Ajouter la précédente classe
                }

                // Créer une nouvelle section pour la classe
                const liClass = document.createElement("li");
                liClass.className = "liMenu";

                const ulClasse = document.createElement("ul");
                ulClasse.className = "ulClasse";

                const toggleButton = document.createElement("b");
                toggleButton.className = "boutonDeploi";
                toggleButton.id = `boutonDeploi${classe.replace(/\s+/g, "")}`;
                toggleButton.textContent = ">";

                const linkClass = document.createElement("a");
                linkClass.className = "a_class";
                linkClass.href = `#${classe.replace(/\s+/g, "")}`;
                linkClass.innerHTML = `<p class='p_classe'>${classe}</p>`;

                ulClasse.appendChild(toggleButton);
                ulClasse.appendChild(linkClass);
                liClass.appendChild(ulClasse);

                // Ajouter un sous-menu pour cette classe
                currentClassUl = document.createElement("ul");
                currentClassUl.id = "ulMenu";
                currentClassUl.className = classe.replace(/\s+/g, "");

                liClass.appendChild(currentClassUl);
                ulMenu.appendChild(liClass);

                currentClass = classe;
            }

            // Ajouter une nouvelle sous-classe
            if (sousClasse !== currentSubClass) {
                const liSubClass = document.createElement("li");
                const linkSubClass = document.createElement("a");
                linkSubClass.href = `#${sousClasse}`;
                linkSubClass.innerHTML = `<p class='p_classe'>${sousClasse}</p>`;
                liSubClass.appendChild(linkSubClass);
                currentClassUl.appendChild(liSubClass);

                currentSubClass = sousClasse;
            }
        });

        menuContainer.appendChild(ulMenu);
    }

    // Charger et afficher le menu
    fetch("plan_ign.csv")
    .then(response => response.text())
    .then(data => {
        const csvRows = parseCSV(data);
        generateMenu(csvRows);
    })
    .catch(error => console.error("Erreur lors du chargement du CSV:", error));

});
