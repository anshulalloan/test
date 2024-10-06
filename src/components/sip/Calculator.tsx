import {
	Button,
	Grid,
	Input,
	Option,
	Select,
	Sheet,
	Slider,
	Switch,
} from "@mui/joy";
import { Box } from "@mui/material";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

import { DoughnutChart } from "./DoughnutChart";

const sipFrequency = [
	{ value: "monthly", label: "Monthly" },
	{ value: "quarterly", label: "Quarterly" },
	{ value: "half-yearly", label: "Half-Yearly" },
	{ value: "yearly", label: "Yearly" },
];

const periodsPerYear: Record<string, number> = {
	monthly: 12,
	quarterly: 4,
	"half-yearly": 2,
	yearly: 1,
};

const installmentAmountMarks = [
	{
		value: 10000,
		label: "₹10k",
	},
	{
		value: 25000,
		label: "₹25k",
	},
	{
		value: 50000,
		label: "₹50k",
	},
	{
		value: 75000,
		label: "₹75k",
	},
];

const formatNumber = (num: number) => {
	return num.toLocaleString("en-IN", {
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	});
};

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

	const [withdrawalForm, setWithdrawalForm] = useState({
		transactionNumber: 0,
		withdrawalAmount: 0,
	});

	const [
		withdrawalTransactions,
		setWithdrawalTransactions,
	] = useState<
		Array<{
			id: string;
			transactionNumber: number;
			withdrawalAmount: number;
		}>
	>([]);

	const [allowIncrement, setAllowIncrement] =
		useState<boolean>(false);

	const handleWithDrawalChange = useCallback(() => {
		setWithdrawalTransactions((prev) => {
			return [
				...prev,
				{
					id: nanoid(),
					transactionNumber:
						withdrawalForm.transactionNumber,
					withdrawalAmount: withdrawalForm.withdrawalAmount,
				},
			];
		});
		setWithdrawalForm({
			transactionNumber: 0,
			withdrawalAmount: 0,
		});
	}, [
		withdrawalForm.transactionNumber,
		withdrawalForm.withdrawalAmount,
	]);

	const handleRemoveWithdrawal = useCallback(
		(id: string) => {
			setWithdrawalTransactions((prev) => {
				return prev.filter(
					(transaction) => transaction.id !== id
				);
			});
		},
		[]
	);

	const handleInputChange = useCallback(
		(
			key: string,
			value: number | string,
			isWithdrawal?: boolean
		) => {
			if (isWithdrawal) {
				setWithdrawalForm((prev) => {
					return {
						...prev,
						[key]: value,
					};
				});
			} else {
				setInputForm((prev) => {
					return {
						...prev,
						[key]: value,
					};
				});
			}
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
				withdrawalAmount: 0,
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

			const isWithdrawal = withdrawalTransactions.find(
				(transaction) => {
					return (
						Number(transaction.transactionNumber) === i
					);
				}
			);

			newTransaction.investment = P.toFixed(2);
			totalInvestment += P;

			newTransaction.totalInvestment =
				totalInvestment.toFixed(2);

			if (isWithdrawal) {
				futureValue -= isWithdrawal.withdrawalAmount;
				newTransaction.withdrawalAmount =
					isWithdrawal.withdrawalAmount;
			}

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
	}, [inputForm, withdrawalTransactions]);

	return (
		<Box className={"sip-calculator"}>
			<Box className={"container"}>
				<Box className={"input-container"}>
					<Box className={"input-box"}>
						<label>Frequency of Investment</label>
						<Select
							placeholder={"Frequency"}
							onChange={(_, value) => {
								handleInputChange(
									"frequency",
									value as string
								);
							}}
							value={inputForm.frequency}
							indicator={<IoChevronDownOutline />}
							className="select"
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

					<Box className={"input-box range marks"}>
						<Box className={"header"}>
							<label>Installment Amount</label>
							<Box className={"input-field-container"}>
								<span className="error"></span>
								<Box className={"input-field"}>
									<span className={"start-decorator"}>
										₹
									</span>
									<input
										placeholder={"0"}
										value={inputForm.monthlyInvestment}
										onChange={(e) => {
											handleInputChange(
												"monthlyInvestment",
												e.target.value
											);
										}}
									/>
								</Box>
							</Box>
						</Box>
						<Slider
							min={500}
							max={100000}
							value={Number(inputForm.monthlyInvestment)}
							onChange={(_: any, value: any) => {
								handleInputChange(
									"monthlyInvestment",
									value as number
								);
							}}
							marks={installmentAmountMarks}
						/>
					</Box>
					<Box className={"input-box range"}>
						<Box className={"header"}>
							<label>Expected Return Rate (per year)</label>
							<Box className={"input-field-container"}>
								<span className="error"></span>
								<Box className={"input-field"}>
									<input
										placeholder={"Enter Expected Returns"}
										value={inputForm.expectedReturns}
										onChange={(e) => {
											handleInputChange(
												"expectedReturns",
												e.target.value
											);
										}}
									/>
									<span className={"start-decorator"}>
										%
									</span>
								</Box>
							</Box>
						</Box>
						<Slider
							min={1}
							max={50}
							value={Number(inputForm.expectedReturns)}
							onChange={(_: any, value: any) => {
								handleInputChange(
									"expectedReturns",
									value as number
								);
							}}
						/>
					</Box>
					<Box className={"input-box range"}>
						<Box className={"header"}>
							<label>Time Period (in years)</label>
							<Box className={"input-field-container"}>
								<span className="error"></span>
								<Box className={"input-field"}>
									<input
										placeholder={"Enter Investment Period"}
										value={inputForm.investmentPeriod}
										onChange={(e) => {
											handleInputChange(
												"investmentPeriod",
												e.target.value
											);
										}}
									/>
									<span className={"start-decorator"}>
										Yr
									</span>
								</Box>
							</Box>
						</Box>
						<Slider
							min={1}
							max={50}
							value={Number(inputForm.investmentPeriod)}
							onChange={(_: any, value: any) => {
								handleInputChange(
									"investmentPeriod",
									value as number
								);
							}}
						/>
					</Box>
					<Box className={"input-box range"}>
						<Box className={"header"}>
							<label>Allow Increment</label>
							<Switch
								checked={allowIncrement}
								onChange={() => {
									setAllowIncrement((prev) => !prev);
								}}
								startDecorator={
									allowIncrement ? "YES" : "NO"
								}
							/>
						</Box>
					</Box>
					{allowIncrement ? (
						<>
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
									indicator={<IoChevronDownOutline />}
									className="select"
								>
									{sipFrequency.map((item, index) => {
										return (
											<Option
												value={item.value}
												key={index}
												disabled={
													periodsPerYear[item.value] >
													periodsPerYear[
														inputForm.frequency
													]
												}
											>
												{item.label}
											</Option>
										);
									})}
								</Select>
							</Box>

							<Box className={"input-box range"}>
								<Box className={"header"}>
									<label>
										Increment Installment Amount by (in %)
									</label>
									<Box className={"input-field-container"}>
										<span className="error"></span>
										<Box className={"input-field"}>
											<input
												placeholder={
													"Enter Increment Percentage"
												}
												value={inputForm.increment}
												onChange={(e) => {
													handleInputChange(
														"increment",
														e.target.value
													);
												}}
											/>
											<span className={"start-decorator"}>
												%
											</span>
										</Box>
									</Box>
								</Box>
								<Slider
									min={1}
									max={30}
									value={Number(inputForm.increment)}
									onChange={(_: any, value: any) => {
										handleInputChange(
											"increment",
											value as number
										);
									}}
								/>
							</Box>
							<Box className={"input-box"}></Box>
							<Box className={"input-box range"}>
								<Box className={"header"}>
									<label>
										Restrict Installment Amount To
									</label>
									<Box className={"input-field-container"}>
										<span className="error"></span>
										<Box className={"input-field"}>
											<span className={"start-decorator"}>
												₹
											</span>
											<input
												placeholder={"Enter HardStop"}
												value={
													inputForm.hardStopOnPrincipal
												}
												onChange={(e) => {
													handleInputChange(
														"hardStopOnPrincipal",
														e.target.value
													);
												}}
											/>
										</Box>
									</Box>
								</Box>
								<Slider
									min={Number(inputForm.monthlyInvestment)}
									max={
										Number(inputForm.monthlyInvestment) * 10
									}
									value={Number(
										inputForm.hardStopOnPrincipal
									)}
									onChange={(_: any, value: any) => {
										handleInputChange(
											"hardStopOnPrincipal",
											value as number
										);
									}}
									marks={[2, 4, 6, 8, 10].map((item) => {
										return {
											value:
												Number(
													inputForm.monthlyInvestment
												) * item,
											label: `₹${formatNumber(
												Number(
													Math.floor(
														(Number(
															inputForm.monthlyInvestment
														) *
															item) /
															1000
													)
												)
											)}k`,
										};
									})}
								/>
							</Box>
						</>
					) : null}
				</Box>

				<Box className={"results-container"}>
					<Box className={"output-container"}>
						<Box className={"output-box"}>
							<span>Total Investment</span>
							<h3>
								{"₹"}
								{formatNumber(
									Number(calculateSip.totalInvestment)
								)}
							</h3>
						</Box>
						<Box className={"output-box"}>
							<span>Est. Returns</span>
							<h3>
								{"₹"}
								{formatNumber(Number(calculateSip.returns))}
							</h3>
						</Box>
						<Box className={"output-box"}>
							<span>Total Value</span>
							<h3>
								{"₹"}
								{formatNumber(
									Number(calculateSip.futureValue)
								)}
							</h3>
						</Box>
					</Box>
					<Box className={"legends"}>
						{["Est. Returns", "Total Investment"].map(
							(label, index) => {
								return (
									<Box
										key={label}
										className={"legend-box"}
									>
										<Box
											className={"color-box"}
											style={{
												backgroundColor:
													index === 0
														? "#5367ff"
														: "#eef0ff",
											}}
										></Box>
										<span>{label}</span>
									</Box>
								);
							}
						)}
					</Box>
					<DoughnutChart
						labels={["Est. Returns", "Total Investment"]}
						dataset={[
							calculateSip.returns,
							calculateSip.totalInvestment,
						]}
					/>
				</Box>
			</Box>

			<Box className={"withdrawal-container"}>
				<Box className={"input-box"}>
					<label>Transaction Number</label>
					<Input
						placeholder={"Enter HardStop"}
						value={withdrawalForm.transactionNumber}
						onChange={(e) => {
							handleInputChange(
								"transactionNumber",
								e.target.value,
								true
							);
						}}
					/>
				</Box>
				<Box className={"input-box"}>
					<label>Withdrawal Amount</label>
					<Input
						placeholder={"Enter HardStop"}
						value={withdrawalForm.withdrawalAmount}
						onChange={(e) => {
							handleInputChange(
								"withdrawalAmount",
								e.target.value,
								true
							);
						}}
					/>
				</Box>
				<Button onClick={handleWithDrawalChange}>
					Add Withdrawal
				</Button>
				<table className={"withdrawal-transactions-table"}>
					<thead>
						<tr>
							<th>Transaction Number</th>
							<th>Withdrawal Amount</th>
						</tr>
					</thead>
					<tbody>
						{withdrawalTransactions.map((transaction) => (
							<tr key={transaction.id}>
								<td>{transaction.transactionNumber}</td>
								<td>
									{formatNumber(
										transaction.withdrawalAmount
									)}
								</td>
								<td>
									<Button
										onClick={handleRemoveWithdrawal.bind(
											null,
											transaction.id
										)}
									>
										Remove
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Box>
			<Box className={"output-container"}>
				<table className={"transactions-table"}>
					<thead>
						<tr>
							<th>Period</th>
							<th>Investment</th>
							<th>Total Investment</th>
							<th>Future Value</th>
							<th>Withdrawal Amount</th>
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
										<td>
											{formatNumber(
												Number(transaction.investment)
											)}
										</td>

										<td>
											{formatNumber(
												Number(transaction.totalInvestment)
											)}
										</td>
										<td>
											{formatNumber(
												Number(transaction.futureValue)
											)}
										</td>
										<td>
											{formatNumber(
												Number(transaction.withdrawalAmount)
											)}
										</td>
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
