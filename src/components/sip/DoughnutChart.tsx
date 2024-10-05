import { Box } from "@mui/material";
import {
	ArcElement,
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import type { FC } from "react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	ArcElement,
	Tooltip
);

type TDoughnutChartProps = {
	labels: Array<string>;
	dataset: Array<string>;
};

export const DoughnutChart: FC<TDoughnutChartProps> = ({
	labels,
	dataset,
}) => {
	return (
		<Box className={"doughnut-chart"}>
			<Doughnut
				data={{
					labels,
					datasets: [
						{
							label: "₹",
							data: dataset,
							backgroundColor: [
								"rgba(255, 99, 132, 0.2)",
								"rgba(54, 162, 235, 0.2)",
							],
							borderColor: [
								"rgba(255, 99, 132, 1)",
								"rgba(54, 162, 235, 1)",
							],
							borderWidth: 1,
						},
					],
				}}
				height={400}
				width={600}
				options={{
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: true,
							position: "right",
						},
					},
				}}
			/>
		</Box>
	);
};
