'use client';
import { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 30, right: 30, bottom: 50, left: 50 };
type DataPoint = { month: string, revenue: number };
type LineChartProps = {
    width: number;
    height: number;
    data: DataPoint[];
};

export const LineChart = ({ width, height, data }: LineChartProps) => {

    // Mettől meddig
    const axesRef = useRef(null);
    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;

    // Y tengely (Bevétel)
    const maxRevenue = d3.max(data, (d) => d.revenue);
    const yScale = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, maxRevenue || 0])
            .range([boundsHeight, 0])
            .nice();
    }, [data, boundsHeight]);

    // X tengely (Hónapok)
    const xScale = useMemo(() => {
        return d3
            .scalePoint()
            .domain(data.map(d => d.month))
            .range([0, boundsWidth])
            .padding(0.5);
    }, [data, boundsWidth]);

    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = d3.axisBottom(xScale);
        svgElement.append("g")
            .attr("transform", `translate(0, ${boundsHeight})`)
            .call(xAxisGenerator);

        const yAxisGenerator = d3.axisLeft(yScale).tickFormat((d) => {
            const val = Number(d);

            if (Math.abs(val) >= 1000000) {
                return (val / 1000000).toFixed(1).replace('.', ',') + "M";
            }
            if (Math.abs(val) >= 1000) {
                return (val / 1000).toFixed(0) + "K";
            }
            return val.toString();
        });

        svgElement.append("g").call(yAxisGenerator);

    }, [xScale, yScale, boundsHeight]);

    const lineBuilder = d3.line<any>()
        .x((d) => xScale(d.month) || 0)
        .y((d) => yScale(d.revenue));

    const linePath = lineBuilder(data);
    if (!linePath) {
        return null;
    }
    return (
        <div>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[margin.left, margin.top].join(",")})`}

                >
                    <path
                        d={linePath}
                        opacity={1}
                        stroke="oklch(79.2% 0.209 151.711)"
                        fill="none"
                        strokeWidth={2}
                    />
                </g>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    ref={axesRef}
                    transform={`translate(${[margin.left, margin.top].join(",")})`}
                    className='text-white'

                />
            </svg>
        </div>
    );
}