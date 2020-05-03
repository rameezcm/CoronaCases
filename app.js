class RameezDashboard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<form id="rameez_corona_cases">
        <!-- SHOPPING TABLE -->
        <table>
            <thead>
                <tr>
                    <th>Country</th>
                    <th>Flag</th>
                    <th>Cases</th>
                    <th>Deaths</th>
                    <th>New Case</th>
                    <th>New Death</th>
                    <th>Recovered</th>
                    <th>Critical</th>
                    <th>Tests</th>
                    <th>Tests Per 1M</th>
                </tr>
            </thead>
            <tbody id='items_table'>
            </tbody>
        </table>
    </form>`;
        this.fetchfromServer();
    }

    async fetchfromServer() {
        var items_table = document.getElementById('items_table');
        const url = 'https://rameez-chatbot.herokuapp.com/rameez-app/covid/count';
        const response = await fetch(url, {
            method: 'GET'
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        for (var ctr = 0; ctr < 100; ctr++) {
            items_table.innerHTML += '<tr><td>' + jsonResponse[ctr].country +
                '</td><td>' + '<img src="' + jsonResponse[ctr].countryInfo.flag + '" height="20px" width="40px">' +
                '</td><td>' + jsonResponse[ctr].cases +
                '</td><td>' + jsonResponse[ctr].deaths +
                '</td><td style="
    background-color: khaki;
    font-weight: bold;
">' + jsonResponse[ctr].todayCases +
                '</td><td style="
    color: white;
    background-color: red;
    font-weight: bold;
">' + jsonResponse[ctr].todayDeaths +
                '</td><td>' + jsonResponse[ctr].recovered +
                '</td><td>' + jsonResponse[ctr].critical +
                '</td><td>' + jsonResponse[ctr].tests +
                '</td><td>' + jsonResponse[ctr].testsPerOneMillion +
                '</td></tr>';
        }
    }
}
customElements.define("rameez-page", RameezDashboard)
