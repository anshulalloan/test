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
							backgroundColor: ["#5367ff", "#eef0ff"],
							borderColor: ["#5367ff", "#eef0ff"],
							borderWidth: 1,
						},
					],
				}}
				height={400}
				options={{
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: true,
							position: "right",
						},
					},
					cutout: "70%",
				}}
			/>
		</Box>
	);
};
