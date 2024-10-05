import { Input, Option, Select } from "@mui/joy";
import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";

import { DoughnutChart } from "./DoughnutChart";

const sipFrequency = [
	{ value: "daily", label: "Daily" },
	{ value: "weekly", label: "Weekly" },
	{ value: "monthly", label: "Monthly" },
	{ value: "quarterly", label: "Quarterly" },
	{ value: "half-yearly", label: "Half-Yearly" },
	{ value: "yearly", label: "Yearly" },
];

export const SipCalculator = () => {
	const [inputForm, setInputForm] = useState({
		frequency: "monthly",
		monthlyInvestment: "25000",
		expectedReturns: "15",
		investmentPeriod: "10",
		increment: "0",
		incrementFrequency: "monthly",
		hardStopOnPrincipal: "0",
	});

	const handleInputChange = useCallback(
		(key: string, value: number | string) => {
			setInputForm((prev) => {
				return {
					...prev,
					[key]: value,
				};
			});
		},
		[]
	);

	const calculateSip = useMemo(() => {
		const {
			frequency,
			monthlyInvestment,
			expectedReturns,
			investmentPeriod,
			increment,
			incrementFrequency,
			hardStopOnPrincipal,
		} = inputForm;

		const transactions = [];

		const periodsPerYear: Record<string, number> = {
			daily: 365,
			weekly: 52,
			monthly: 12,
			quarterly: 4,
			"half-yearly": 2,
			yearly: 1,
		};

		const n = periodsPerYear[frequency];
		const r = parseFloat(expectedReturns) / 100 / n;
		let P = parseFloat(monthlyInvestment);
		const t = parseFloat(investmentPeriod);
		const incrementValue = parseFloat(increment) / 100;
		const hardStop = parseFloat(hardStopOnPrincipal);

		let totalInvestment = 0;
		let futureValue = 0;

		for (let i = 0; i < t * n; i++) {
			const newTransaction: Record<
				string,
				string | number
			> = {
				period: i,
				investment: P,
				futureValue,
				totalInvestment,
			};
			const base = Math.floor(
				periodsPerYear[frequency] /
					periodsPerYear[incrementFrequency]
			);
			if (i > 0 && i % base === 0) {
				P += P * incrementValue;
			}
			if (hardStop > 0 && P > hardStop) {
				P = hardStop;
			}
			newTransaction.investment = P.toFixed(2);
			totalInvestment += P;
			newTransaction.totalInvestment =
				totalInvestment.toFixed(2);
			futureValue = (futureValue + P) * (1 + r);
			newTransaction.futureValue = futureValue.toFixed(2);
			transactions.push(newTransaction);
		}

		return {
			totalInvestment: totalInvestment.toFixed(2),
			futureValue: futureValue.toFixed(2),
			returns: (futureValue - totalInvestment).toFixed(2),
			transactions,
		};
	}, [inputForm]);

	return (
		<Box className={"sip-calculator"}>
			<Box className={"input-container"}>
				<Box className={"input-box"}>
					<label>Frequency</label>
					<Select
						placeholder={"Frequency"}
						onChange={(_, value) => {
							handleInputChange(
								"frequency",
								value as string
							);
						}}
						value={inputForm.frequency}
					>
						{sipFrequency.map((item, index) => {
							return (
								<Option
									value={item.value}
									key={index}
								>
									{item.label}
								</Option>
							);
						})}
					</Select>
				</Box>
				<Box className={"input-box"}>
					<label>Increment Frequency</label>
					<Select
						placeholder={"incrementFrequency"}
						onChange={(_, value) => {
							handleInputChange(
								"incrementFrequency",
								value as string
							);
						}}
						value={inputForm.incrementFrequency}
					>
						{sipFrequency.map((item, index) => {
							return (
								<Option
									value={item.value}
									key={index}
								>
									{item.label}
								</Option>
							);
						})}
					</Select>
				</Box>
				<Box className={"input-box"}>
					<label>Monthly Investment</label>
					<Input
						startDecorator={"₹"}
						placeholder={"Enter Monthly Investment"}
						value={inputForm.monthlyInvestment}
						onChange={(e) => {
							handleInputChange(
								"monthlyInvestment",
								e.target.value
							);
						}}
					/>
				</Box>
				<Box className={"input-box"}>
					<label>Expected Returns</label>
					<Input
						placeholder={"Enter Expected Returns"}
						value={inputForm.expectedReturns}
						onChange={(e) => {
							handleInputChange(
								"expectedReturns",
								e.target.value
							);
						}}
					/>
				</Box>
				<Box className={"input-box"}>
					<label>Investment Period</label>
					<Input
						placeholder={"Enter Investment Period"}
						value={inputForm.investmentPeriod}
						onChange={(e) => {
							handleInputChange(
								"investmentPeriod",
								e.target.value
							);
						}}
					/>
				</Box>
				<Box className={"input-box"}>
					<label>Increment Percentage</label>
					<Input
						placeholder={"Enter Increment Percentage"}
						value={inputForm.increment}
						onChange={(e) => {
							handleInputChange(
								"increment",
								e.target.value
							);
						}}
					/>
				</Box>
				<Box className={"input-box"}>
					<label>Hard Stop on Principal</label>
					<Input
						placeholder={"Enter HardStop"}
						value={inputForm.hardStopOnPrincipal}
						onChange={(e) => {
							handleInputChange(
								"hardStopOnPrincipal",
								e.target.value
							);
						}}
					/>
				</Box>
			</Box>
			<DoughnutChart
				labels={["returns", "totalInvestment"]}
				dataset={[
					calculateSip.returns,
					calculateSip.totalInvestment,
				]}
			/>
			<Box className={"output-container"}>
				<Box className={"output"}>
					<span>Total Investment</span>
					<span> {calculateSip.totalInvestment}</span>
				</Box>
				<Box className={"output"}>
					<span>Return on Investment</span>
					<span> {calculateSip.returns}</span>
				</Box>
				<Box className={"output"}>
					<span>Total Value</span>
					<span> {calculateSip.futureValue}</span>
				</Box>

				<table className={"transactions-table"}>
					<thead>
						<tr>
							<th>Period</th>
							<th>Investment</th>
							<th>Future Value</th>
							<th>Total Investment</th>
						</tr>
					</thead>
					<tbody>
						{calculateSip.transactions.map(
							(transaction, index) => {
								return (
									<tr
										className={"transaction"}
										key={index}
									>
										<td>{transaction.period}</td>
										<td>{transaction.investment}</td>
										<td>{transaction.futureValue}</td>
										<td>{transaction.totalInvestment}</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			</Box>
		</Box>
	);
};
