import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
// import axios from 'axios';

// interface CryptoData {
//   id: string;
//   symbol: string;
//   name: string;
//   current_price: number;
//   market_cap: number;
// }

const CirclesGraph: React.FC = () => {
  const svgRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios
  //       (
  //         'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1'
  //       );
  //     const data: CryptoData[] = response.data;
   
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    if (svgRef.current) {

      // configura las dimenciones y margenes dde la grafica de los circulos
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;

      // Limpiar el área de visualización antes de agregar nuevos elementos
      d3.select("#my_dataviz").selectAll("*").remove();

      // Read data
      d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv").then((data: any[]) => {
        // Filter a bit the data -> more than 1 million inhabitants
        data = data.filter((d: any) => d.value > 10000000);

        // Color palette for continents
        const color = d3.scaleOrdinal<string>()
          .domain(["Asia", "Europe", "Africa", "Oceania"])
          .range(d3.schemeSet1);

        // Size scale for countries
        const size = d3.scaleLinear<number, number>()
          .domain([0, 1400000000])
          .range([7, 55]); // circle will be between 7 and 55 px wide

        // create a tooltip
        const Tooltip = d3.select("#my_dataviz")
          .append("div")
          .style("opacity", 0)
          .attr("class", "tooltip")
          .style("background-color", "white")
          .style("border", "solid")
          .style("border-width", "2px")
          .style("border-radius", "5px")
          .style("padding", "5px");

        // Three function that change the tooltip when user hover / move / leave a cell
        const mouseover = function () {
          Tooltip.style("opacity", 0);
        }
        const mousemove = function (event: any, d: any) {
          Tooltip
            .html('<u>' + d.key + '</u>' + "<br>" + d.value + " inhabitants")
            .style("left", (event.x / 2 + 20) + "px")
            .style("top", (event.y / 2 - 30) + "px");
        }
        const mouseleave = function () {
          Tooltip.style("opacity", 0);
        }

        // Initialize the circle: all located at the center of the svg area
        const svg = d3.select("#my_dataviz")
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("viewBox", `0 0 ${width} ${height}`)
          .attr("preserveAspectRatio", "xMidYMid meet");

        const node = svg.selectAll<SVGCircleElement, any>("circle")
          .data(data)
          .enter().append("circle")
          .attr("class", "node")
          .attr("r", (d: any) => size(d.value)!)
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .style("fill", (d: any) => color(d.region))
          .style("fill-opacity", 0.8)
          .attr("stroke", "black")
          .style("stroke-width", 1)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
          .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended) as any);
            
            // Características de las fuerzas aplicadas a los nodos.:
            const simulation = d3.forceSimulation<any>()
            .force("center", d3.forceCenter().x(width / 2).y(height / 2))
            .force("charge", d3.forceManyBody().strength(0.1))
            .force("collide", d3.forceCollide().strength(0.2).radius((d: any) => (size(d.value)! + 3)).iterations(1));
            
           
            simulation.nodes(data)
              .on("tick", function () {
                node.attr("cx", (d: any) => {
                  // Limita la posición x para permanecer dentro del área de visualización
                  d.x = Math.max(size(d.value)! / 2, Math.min(width - size(d.value)! / 2, d.x));
                  return d.x;
                })
                  .attr("cy", (d: any) => {
                    // Limita la posición y para permanecer dentro del área de visualización
                    d.y = Math.max(size(d.value)! / 2, Math.min(height - size(d.value)! / 2, d.y));
                    return d.y;
                  });
              });

        // 
        function dragstarted(event: any, d: any) {
          if (!event.active) simulation.alphaTarget(0.03).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        function dragged(event: any, d: any) {
          d.fx = event.x;
          d.fy = event.y;
        }
        function dragended(event: any, d: any) {
          if (!event.active) simulation.alphaTarget(0.03);
          d.fx = null;
          d.fy = null;
        }
      });
    }
  }, []);

  return (
    <div id="my_dataviz" ref={svgRef}></div>
  );
}

export default CirclesGraph;
