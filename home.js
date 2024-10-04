const ORG_VIEW_DATA = [
    { id: "1", org_year: "2020", views: "1177"},
    { id: "2", org_year: "2020", views: "1195"},
    { id: "3", org_year: "2020", views: "3128"},
    { id: "4", org_year: "2019", views: "591"},
    { id: "5", org_year: "2020", views: "2202"},
    { id: "6", org_year: "2010", views: "1369"},
    { id: "7", org_year: "2019", views: "6999"},
    { id: "8", org_year: "2015", views: "1499"},
    // { id: "9", org_year: "2019", views: "818"},
    // { id: "10", org_year: "2017", views: "17490"},
];

const MARGINS = {top:40, bottom:40};
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400 - MARGINS.top - MARGINS.bottom;

const x = d3.scaleBand().rangeRound([0,CHART_WIDTH]).padding(0.1);
const y = d3.scaleLinear().range([CHART_HEIGHT,0]); 
//keep in mind that the coordinates it starts from id top left, that is why it's this way

x.domain(ORG_VIEW_DATA.map((d) => d.id)); //how many items should be positioned here
y.domain([0, d3.max(ORG_VIEW_DATA, (d) => d.views)]); //calculating the vertical space + leaving some room up top

const chart_container = d3.select('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT);

const chart = chart_container.append('g') //g for grouping other svg's together

chart
.append('g')
.call(d3.axisBottom(x))
.attr('transform', `translate(0, ${CHART_HEIGHT - 20})`)
.attr('color', '#0000ff');

// chart
// .append('g')
// .call(d3.axistop(y))
// .attr('color', '#0000ff');

chart.selectAll('.bar') //this class doesn't exist yet but it's okay
.data(ORG_VIEW_DATA)
.enter()
.append('rect')
.classed('bar', true) //this should match the class we made at selectAll
.attr('width', x.bandwidth())
.attr('height', data => CHART_HEIGHT - y(data.views))
.attr('x', data => x(data.id))
.attr('y', data => y(data.views) + 20);

chart.selectAll('.label')
.data(ORG_VIEW_DATA)
.enter()
.append('text')
.text(data => data.org_year)
.attr('x', data => x(data.id))
.attr('y', data => y(data.views) - 4)
// .attr('text-anchor', 'middle')
// .classed('label', true);

    console.log(ORG_VIEW_DATA)
