fetch('plan_ign.csv')
.then(response => response.text())
.then(data => {
    const lines = data.split('\n');
    let classe = 'None';
    let sous_classe = 'None';

    const section = document.createElement('section');
    document.body.appendChild(section);

    lines.forEach(line => {
        const columns = line.split(',');
        if (columns[1] && !(columns[12])) {
            console.log('"' + columns[10].trim().toLowerCase() + '"');


            if (columns[1].replace(/.*?"(.*?)".*/, '$1') === 'classe') {
                return;
            }

            if (columns[1].replace(/.*?"(.*?)".*/, '$1') !== classe) {
                classe = columns[1].replace(/.*?"(.*?)".*/, '$1');
                const divClasse = document.createElement('div');
                divClasse.id = classe;
                divClasse.innerHTML = `<h1>${classe}</h1>`;
                section.appendChild(divClasse);
            }

            if (columns[2].replace(/.*?"(.*?)".*/, '$1') !== sous_classe) {
                sous_classe = columns[2].replace(/.*?"(.*?)".*/, '$1');
                const divSousClasse = document.createElement('div');
                divSousClasse.id = `classeDeploi${sous_classe}`;
                divSousClasse.className = 'classeDeploi';
                divSousClasse.innerHTML = `<h3 id='${sous_classe}'>${sous_classe}</h3>`;
                section.appendChild(divSousClasse);
            }

            const article = document.createElement('article');
            article.id = 'symbo';
            article.className = sous_classe;
            article.innerHTML = `
                <h4 id='symboDeploi${columns[3].replace(/.*?"(.*?)".*/, '$1')}' class='symboDeploi'>${columns[3].replace(/.*?"(.*?)".*/, '$1')}</h4>
                <p id='info_symbo' class='${columns[3].replace(/.*?"(.*?)".*/, '$1')}'>Maxzoom = ${columns[4].replace(/.*?"(.*?)".*/, '$1')}</p>
                <p id='info_symbo' class='${columns[3].replace(/.*?"(.*?)".*/, '$1')}'>Minzoom = ${columns[5].replace(/.*?"(.*?)".*/, '$1')}</p>
                <table id='info_symbo' class='${columns[3].replace(/.*?"(.*?)".*/, '$1')}' style='border: solid 2px rgb(130, 130, 130)'>
                    <tr>
                        <th>N0</th>
                        <th>N10</th>
                        <th>N25</th>
                        <th>N50</th>
                        <th>N99</th>
                    </tr>
                    <tr>
                        <td style='background-color: ${columns[6].replace(/.*?"(.*?)".*/, '$1') == "True" ? 'green' : 'darkgray'}'></td>
                        <td style='background-color: ${columns[7].replace(/.*?"(.*?)".*/, '$1') == "True" ? 'green' : 'darkgray'}'></td>
                        <td style='background-color: ${columns[8].replace(/.*?"(.*?)".*/, '$1') == "True" ? 'green' : 'darkgray'}'></td>
                        <td style='background-color: ${columns[9].replace(/.*?"(.*?)".*/, '$1') == "True" ? 'green' : 'darkgray'}'></td>
                        <td style='background-color: ${columns[10].trim().replace(/.*?"(.*?)".*/, '$1').toLowerCase() === "true" ? 'green' : 'darkgray'}'></td>
                    </tr>
                </table>
            `;
            section.appendChild(article);
        }
        });
});