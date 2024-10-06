// const configPath = "./globalDashboard/config.json";

// const menuBar = document.querySelector('#content nav .bx-menu');
// const sideBar = document.querySelector('.sideBar');
// // Darkmode
let DARKMODE = localStorage.getItem('DARKMODE');
const themeSwitch = document.getElementById('themeSwitch');

const enableDARKMODE = () => {
    document.body.classList.add('DARKMODE');
    localStorage.setItem('DARKMODE', 'active');
}

const disableDARKMODE = () => {
    document.body.classList.remove('DARKMODE');
    localStorage.setItem('DARKMODE', null);
}

if (DARKMODE === "active") enableDARKMODE();

themeSwitch.addEventListener('click', () => {
    DARKMODE = localStorage.getItem('DARKMODE');
    DARKMODE !== "active" ? enableDARKMODE() : disableDARKMODE();
})

// // Sidebar
// function toggleSidebar() {
//     const sideBar = document.getElementById('sidebar');
//     sideBar.classList.toggle('hide');

//     // Update local storage
//     const isSidebarHidden = sideBar.classList.contains('hide');
//     localStorage.setItem('sidebarHidden', isSidebarHidden);
// }

// menuBar.addEventListener('click', toggleSidebar);

// document.addEventListener('DOMContentLoaded', () => {
//     window.addEventListener('load', async () => {
//         try {
//             const response = await fetch(configPath);
//             const fetchedConfig = await response.json();

//             // const response = await fetch(config);
//             // const config = await response.json();

//             const currentURL = window.location.href;
//             console.log(currentURL)

//             // Flatten the nested JSON structure
//             const urlElementMap = Object.values(config.sidebar).reduce((acc, curr) => {
//                 return { ...acc, ...curr };
//             }, {});

//             for (const url in urlElementMap) {
//                 if (currentURL.includes(url)) {
//                     const elementSelector = urlElementMap[url];
//                     const element = document.querySelector(elementSelector);
//                     if (element) {
//                         element.classList.add('active');
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error('Error loading configuration:', error);
//         }
//     });

//     window.addEventListener('load', () => {
//         // Breadcrumbs
//         const currentURL = window.location.href;
//         const pageName = currentURL.substring(currentURL.lastIndexOf('/') + 1).split('.')[0];
//         const breadcrumbLink = document.querySelector(`.breadcrumbs li a.${pageName}`);

//         // Breadcrumbs
//         if (breadcrumbLink) {
//             breadcrumbLink.classList.add('active');
//         } else {
//             return;
//         }
        
//         if (window.innerWidth < 768) {
//             sideBar.classList.add('hide');
//         } else {
//             return;
//         }
//     });
    
// });

document.addEventListener('DOMContentLoaded', () => {
    // Breadcrumb functionality
    const currentURL = window.location.href;
    const pageName = currentURL.substring(currentURL.lastIndexOf('/') + 1).split('.')[0];
    const breadcrumbLink = document.querySelector(`.breadcrumbs li a.${pageName}`);

    if (breadcrumbLink) {
        breadcrumbLink.classList.add('active');
    }

    // Sidebar functionality
    function toggleSidebar() {
        const sideBar = document.querySelector('.sideBar');
        sideBar.classList.toggle('hide');
        
        const isSidebarHidden = sideBar.classList.contains('hide');
        localStorage.setItem('sidebarHidden', isSidebarHidden);
    }

    const menuBar = document.querySelector('#content nav i.bx-menu');
    const sideBar = document.querySelector('.sideBar');
    menuBar.addEventListener('click', toggleSidebar);

    const sidebarHidden = localStorage.getItem('sidebarHidden');
    if (sidebarHidden === 'true') {
        sideBar.classList.add('hide');
    }

    window.addEventListener('load', async () => {
        // Adjust sidebar and search form visibility based on screen width
        if (window.innerWidth < 768) {
            sideBar.classList.add('hide');
        } else if (window.innerWidth > 768 && sideBar.classList.contains('hide')) {
            sideBar.classList.remove('hide');
        }

        // Load and handle JSON config for active sidebar element
        try {
            const response = await fetch("../globalDashboard/config.json");
            const config = await response.json();

            // Flatten the nested JSON structure
            const urlElementMap = Object.values(config.sidebar).reduce((acc, curr) => {
                return { ...acc, ...curr };
            }, {});

            for (const url in urlElementMap) {
                if (currentURL.includes(url)) {
                    const elementSelector = urlElementMap[url];
                    const element = document.querySelector(elementSelector);
                    if (element) {
                        element.classList.add('active');
                    } else {
                        console.log("1111");
                    }
                }
            }
        } catch (error) {
            console.error('Error loading configuration:', error);
        }
    });
});
