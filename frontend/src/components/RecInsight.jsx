    import CanvasJSReact from '@canvasjs/react-charts';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../help/axios';
import './RecJobsPosted.css';

    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const RecInsight = () => {
    const [statusCounts, setStatusCounts] = useState({});
    const { jobId } = useParams();

    useEffect(() => {
        const fetchApplicationData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/applications/job/${jobId}`);
            console.log("fetched:", response.data);
            calculateStatusCounts(response.data);
        } catch (error) {
            console.error('Error fetching application data:', error);
        }
        };

        fetchApplicationData();
    }, [jobId]);

    const calculateStatusCounts = (applications) => {
        const counts = applications.reduce((acc, application) => {
        const status = application.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
        }, {});

        setStatusCounts(counts);
    };

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
        <CanvasJSChart options={options} /> 
        <div className='button-container'>
        <Link to={`/view-application/${jobId}`} className="view-button">View Applications</Link>
        </div>
        </div>
    );
    };

    export default RecInsight;
