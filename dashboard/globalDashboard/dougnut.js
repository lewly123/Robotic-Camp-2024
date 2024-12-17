// const xValues = ["Team #1", "Unknown"];
// const yValues = [10, 90];
// const barColors = ["#00aba9", "#b91d47"];

// const ctx = document.getElementById("Ranking").getContext("2d");
// new Chart(ctx, {
//     type: "doughnut",
//     data: {
//         labels: xValues,
//         datasets: [{
//             backgroundColor: barColors,
//             borderWidth: 0, // Remove white border
//             data: yValues,
//             hoverOffset: 15 // Hover effect
//         }]
//     },
//     options: {
//         responsive: true,
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'bottom', // Legend on the right
//                 labels: {
//                     usePointStyle: true, // Use circular markers for labels
//                     boxWidth: 10, // Adjust marker size
//                     color: "#8DAEAD"
//                 }
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (context) {
//                         const label = context.label || '';
//                         const value = context.raw || 0;
//                         return `${label}: ${value}%`;
//                     }
//                 }
//             },
//             title: {
//                 display: true,
//                 text: "Team Ranking Overview",
//                 color: "#8DAEAD"
//             }
//         },
//         animation: {
//             duration: 1500,
//             easing: 'easeOutBounce'
//         }
//     }
// });

// Import the Firestore instance and functions
import { db } from './database.js';
import { fetchTeamsData } from './function.js';

// Dummy function to get the current logged-in team ID
function getLoggedInTeam() {
    // Replace this with your login system logic
    return "team1"; // Example: "team1" is the currently logged-in team
}

// Doughnut Chart Configuration Function
async function createDoughnutChart() {
    try {
        // Step 1: Fetch teams data dynamically
        const teamsData = await fetchTeamsData(db);

        // Step 2: Identify current team and calculate values
        const currentTeamId = getLoggedInTeam();
        let currentTeamBalance = 0;
        let otherTeamsCombinedBalance = 0;

        for (const teamId in teamsData) {
            const teamBalance = teamsData[teamId].balance || 0; // Default to 0 if no balance

            if (teamId === currentTeamId) {
                // Logged-in team's balance
                currentTeamBalance = teamBalance;
            } else {
                // Combine all other teams' balances
                otherTeamsCombinedBalance += teamBalance;
            }
        }

        // Step 3: Prepare data for the chart
        const xValues = ["Your Team", "Other Teams"];
        const yValues = [currentTeamBalance, otherTeamsCombinedBalance];
        const barColors = ["#00aba9", "#b91d47"]; // Colors for the chart

        // Step 4: Create the doughnut chart
        const ctx = document.getElementById("Ranking").getContext("2d");
        new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    borderWidth: 0, // Remove white border
                    data: yValues,
                    hoverOffset: 15 // Hover effect
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            boxWidth: 10,
                            color: "#8DAEAD"
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: ${value}`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: "Team Balance Overview",
                        color: "#8DAEAD"
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            }
        });
    } catch (error) {
        console.error("Error creating chart:", error);
    }
}

// Run the chart function after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    createDoughnutChart();
});