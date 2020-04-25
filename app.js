class RameezDashboard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<form id="rameez_corona_cases">
        <!-- SHOPPING TABLE -->
        <table  border=1>
            <thead>
                <tr>
                    <th>Country</th>
                    <th>flag</th>
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
        const url = 'https://corona.lmao.ninja/v2/countries?sort=cases';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://corona.lmao.ninja'
            }
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        for (var ctr = 0; ctr < 100; ctr++) {
            items_table.innerHTML += '<tr><td>' + jsonResponse[ctr].country +
                '</td><td>' + '<img src="' + jsonResponse[ctr].countryInfo.flag + '" height="20px" width="40px">' +
                '</td><td>' + jsonResponse[ctr].cases +
                '</td><td>' + jsonResponse[ctr].deaths +
                '</td><td>' + jsonResponse[ctr].todayCases +
                '</td><td>' + jsonResponse[ctr].todayDeaths +
                '</td><td>' + jsonResponse[ctr].recovered +
                '</td><td>' + jsonResponse[ctr].critical +
                '</td><td>' + jsonResponse[ctr].tests +
                '</td><td>' + jsonResponse[ctr].testsPerOneMillion +
                '</td></tr>';
        }
    }
}
customElements.define("rameez-page", RameezDashboard)
