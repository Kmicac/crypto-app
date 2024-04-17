// import React, { useEffect, useState } from 'react';
// import * as d3 from 'd3';
// import axios from 'axios';

// interface CryptoData {
//   id: string;
//   symbol: string;
//   name: string;
//   current_price: number;
//   market_cap: number;
// }

// const CryptoViz: React.FC = () => {
//   const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios(
//         'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h&locale=en'
//       );
//       const data: CryptoData[] = await response.data;
//       setCryptoData(data);
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (cryptoData.length > 0) {
//       drawChart(cryptoData);
//     }
//   }, [cryptoData]);

//   const drawChart = (data: CryptoData[]) => {
//     const width = 460;
//     const height = 460;
//     const svg = d3
//       .select('#crypto-viz')
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height);

//     const color = d3.scaleOrdinal().range(d3.schemeSet1);
//     const size = d3.scaleLinear().range([7, 55]);

//     const Tooltip = d3
//       .select('#crypto-viz')
//       .append('div')
//       .style('opacity', 0)
//       .attr('class', 'tooltip')
//       .style('background-color', 'white')
//       .style('border', 'solid')
//       .style('border-width', '2px')
//       .style('border-radius', '5px')
//       .style('padding', '5px');

//     const mousemove = (event: React.MouseEvent<SVGCircleElement, MouseEvent>, d: CryptoData) => {
//       const coords = d3.pointer(event, svg.node());
//       Tooltip.style('opacity', 1)
//         .html(
//           `<u>${d.name}</u><br>Symbol: ${d.symbol}<br>Price: $${d.current_price}`
//         )
//         .style('left', `${coords[0] + 20}px`)
//         .style('top', `${coords[1]}px`);
//     };

//     const mouseleave = () => {
//       Tooltip.style('opacity', 0);
//     };

//     const node = svg.append('g')
//       .selectAll('circle')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('class', 'node')
//       .attr('r', (d) => size(d.market_cap) as number)
//       .attr('cx', width / 2)
//       .attr('cy', height / 2)
//       // .style('fill', (d, i) => color(i) as string)
//       .style('fill-opacity', 0.8)
//       .attr('stroke', 'black')
//       .style('stroke-width', 1)
//       .on('mousemove', mousemove)
//       .on('mouseleave', mouseleave)
//       .call(d3.drag()
//         .on('start', dragstarted)
//         .on('drag', dragged)
//         .on('end', dragended));

//     const simulation = d3.forceSimulation()
//       .force("center", d3.forceCenter().x(width / 2).y(height / 2)) 
//       .force("charge", d3.forceManyBody().strength(.1)) 
//       .force("collide", d3.forceCollide().strength(.2).radius(function (d) { return (size(d.value) + 3) }).iterations(1)) 


//       simulation
//       .nodes(data)
//       .on("tick", function(d) {
//         node
//             .attr("cx", d => d.x)
//             .attr("cy", d => d.y)
//       });

//       function dragstarted(event, d) {
//         if (!event.active) simulation.alphaTarget(.03).restart();
//         d.fx = d.x;
//         d.fy = d.y;
//       }
//       function dragged(event, d) {
//         d.fx = event.x;
//         d.fy = event.y;
//       }
//       function dragended(event, d) {
//         if (!event.active) simulation.alphaTarget(.03);
//         d.fx = null;
//         d.fy = null;
//       }
    
//     }
//   };

//   return <div id="crypto-viz"></div>;
// };

// export default CryptoViz;