import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  image: string;
  price_change_percentage_24h: number;
  y?: number;
  x?: number;
}

const CirclesGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<CryptoData[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h&locale=en'
      );
      const data: CryptoData[] = response.data.map((coin) => ({
        ...coin,
        price_change_percentage_24h: coin.price_change_percentage_24h,
      }));
      renderCircles(data);
    };
    fetchData();
  }, []);

  const renderCircles = (cryptoData: CryptoData[]) => {
    if (svgRef.current) {

      svgRef.current.style.width = "100%";
      svgRef.current.style.height = "500px";
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;

      d3.select("#my_dataviz").selectAll("*").remove();

      const svg = d3
        .select("#my_dataviz")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");
        
        const sizeScale = d3
        .scaleLinear()
        .domain([d3.min(cryptoData, (d: CryptoData) => d.market_cap)!, d3.max(cryptoData, (d: CryptoData) => d.market_cap)!])
        .range([35, 50]);
        
        const node = svg
        .selectAll<SVGGElement, CryptoData>("g")
        .data(cryptoData)
        .enter()
        .append("g")
        .attr("transform", (d: CryptoData) => `translate(${d.x || width / 2}, ${d.y || height / 2})`);
        
        node
        .append("circle")
        .attr("class", "node")
        .attr("r", (d: CryptoData) => sizeScale(Math.abs(d.market_cap)))
        .style("fill", (d: CryptoData) => {
          return d.price_change_percentage_24h >= 0 ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)";
        })
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 1)
        .call(
          d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended) as any
        );
        
        node
          .append("image")
          .attr("xlink:href", (d: CryptoData) => d.image)
          .attr("width", (d: CryptoData) => sizeScale(d.market_cap))
          .attr("height", (d: CryptoData) => sizeScale(d.market_cap))
          .attr("x", (d: CryptoData) => -sizeScale(d.market_cap) / 2)
          .attr("y", (d: CryptoData) => -sizeScale(d.market_cap) / 2);

      node
        .append("text")
        .text((d: CryptoData) => `${d.price_change_percentage_24h.toFixed(2)}%`)
        .attr("text-anchor", "middle")
        .attr("dy", (d: CryptoData) => sizeScale(d.market_cap) / 2 + 10)
        .style("fill", (d: CryptoData) => (d.price_change_percentage_24h >= 0 ? "rgba(0, 255, 0, 0.5)" : "rgba(255, 0, 0, 0.5)"))
        .style("font-size", "12px")
        .style("font-weight", "bold");

      node
        .append("text")
        .text((d: CryptoData) => d.symbol.toLocaleUpperCase())
        .attr("text-anchor", "middle")
        .attr("dy", (d: CryptoData) => -sizeScale(d.market_cap) / 2 );

      const simulation = d3
        .forceSimulation<CryptoData>()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2))
        .force("charge", d3.forceManyBody().strength(-5))
        .force("collide", d3.forceCollide().strength(0.2).radius(30).iterations(3));

      simulation
        .nodes(cryptoData)
        .on("tick", () => {
          node.attr("transform", (d: any) => {
            d.x = Math.max(sizeScale(d.market_cap), Math.min(width - sizeScale(d.market_cap), d.x));
            d.y = Math.max(sizeScale(d.market_cap), Math.min(height - sizeScale(d.market_cap), d.y));
            return `translate(${d.x}, ${d.y})`;
          });
        });

      function dragstarted(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event: any, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3);
        d.fx = event.x;
        d.fy = event.y;
      }
    }
  };

  return <svg id="my_dataviz" ref={svgRef} width="100%" height="100%"></svg>;
};

export default CirclesGraph;