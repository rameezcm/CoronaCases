class RameezDashboard extends HTMLElement {
    constructor() {
        super()
        setInterval(() => this.fetchfromServer(), 90000); // (5)

    }

    connectedCallback() {
        this.fetchfromServer();
        this.innerHTML = `<div class="checkout-panel">
        <div class="panel-body">
            <h2 class="title">Rameez Dashboard</h2>
            <div id="step4-content" class=" ">
               
                <table class="table table-bordered table-hover table-condensed">
                <thead>
                <tr>
                <th id="Field #1">country</th>
                <th id="Field #8">cases</th>
                <th id="Field #9">todayCases</th>
                <th id="Field #10">deaths</th>
                <th id="Field #11">todayDeaths</th>
                <th id="Field #12">recovered</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td>Norway</td>
                <td  id="cases" align="right"></td>
                <td id="todayCases" align="right"></td>
                <td id="deaths" align="right"></td>
                <td id="todayDeaths"></td>
                <td id="recovered" align="right"></td>
                </tr>
                <tr>
                <td>India</td>
                <td  id="casesi" align="right"></td>
                <td id="todayCasesi" align="right"></td>
                <td id="deathsi" align="right"></td>
                <td id="todayDeathsi"></td>
                <td id="recoveredi" align="right"></td>
                </tr>
                </tbody></table>
                </label>   
            </div>
        </div>
    </div>`;
    }



    async fetchfromServer() {
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://redutv-api.vg.no/corona/v1/sheets/norway-table-overview?region=county",{
            method: 'GET',
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://rameezcm.github.io'
            }
        });
        if (response.ok) {
            const json = await response.json();
            this.answer = json;
            this.querySelector("#cases").innerText = this.answer.totals.confirmed
            this.querySelector("#todayCases").innerText = this.answer.totals.changes.newToday
            this.querySelector("#deaths").innerText = this.answer.totals.dead
            this.querySelector("#todayDeaths").innerText = this.answer.totals.changes.deathsToday
            this.querySelector("#recovered").innerText = this.answer.totals.recovered
        }

        const response1 = await fetch("https://corona.lmao.ninja/countries/India", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://corona.lmao.ninja'
            }
        });
        const json1 = await response1.json();
        this.answer = json1;
        this.querySelector("#casesi").innerText = this.answer.cases
        this.querySelector("#todayCasesi").innerText = this.answer.todayCases
        this.querySelector("#deathsi").innerText = this.answer.deaths
        this.querySelector("#todayDeathsi").innerText = this.answer.todayDeaths
        this.querySelector("#recoveredi").innerText = this.answer.recovered
    }
}
customElements.define("rameez-page", RameezDashboard)
