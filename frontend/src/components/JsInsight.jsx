
// import CanvasJSReact from '@canvasjs/react-charts';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import axios from '../help/axios';

// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
	state = {
		applicationData: [],
		statusCounts: {}
	};

	componentDidMount() {
		const email= Cookies.get('email') // Replace with actual email or pass it as a prop

		axios.get(`http://127.0.0.1:8000/api/applications/${email}/`)
			.then(response => {
				this.setState({ applicationData: response.data });
				this.calculateStatusCounts(response.data);
			})
			.catch(error => {
				console.error('Error fetching application data:', error);
			});
	}

	calculateStatusCounts = (applications) => {
		const statusCounts = applications.reduce((counts, application) => {
			const status = application.status;
			counts[status] = (counts[status] || 0) + 1;
			return counts;
		}, {});

		this.setState({ statusCounts });
	}

	render() {
		const { statusCounts } = this.state;

		const totalApplications = Object.values(statusCounts).reduce((total, count) => total + count, 0);


        const statusColors = {
            'Applied': '#4F81BC',
            'Pending': '#C0504E',
            'Reviewed': '#9BBB58',
            'Under Consideration': '#23BFAA',
            'Interviewing': '#8064A2',
            'In Progress': '#F79647',
            'Rejected': '#C00000',
            'Hired': '#00B050',
            'Closed': '#1F497D'
        };

        
		const options = {
			animationEnabled: true,
			title: {
				text: "Job Application Insights"
			},
			subtitles: [{
				text: `${totalApplications} Applications`,
				verticalAlign: "center",
				fontSize: 16,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###",
				dataPoints: Object.entries(statusCounts).map(([status, count]) => ({
					name: status,
					y: count,
                    color: statusColors[status]
				}))
			}]
		};

		return (
			<div>
				{/* <CanvasJSChart options={options} /> */}
			</div>
		);
	}
}

export default App;
