




document.addEventListener('DOMContentLoaded', function () {
    var linkData = [
        { href: 'Home.html', text: 'Home', icon: 'icon/Navbar.svg' },
        { href: 'Observation.html', text: 'Observations', icon: 'icon/Observations.svg' },
        { href: 'pagina2.html', text: 'Ground Station', icon: 'icon/Gound.svg' },
        { href: 'https://community.libre.space/', text: 'Community', icon: 'icon/Community.svg' },
        { href: 'https://wiki.satnogs.org/Main_Page', text: 'Wikipedia', icon: 'icon/Wikipedia.svg' },
        { href: 'https://login.libre.space/login?state=hKFo2SBUSnZmLVE3aXlwN0dyc1JDNXZtRUlQMFFHc2NIamtueKFupWxvZ2luo3RpZNkgT2ZwNGVYVnhIYlc0N3lEeG12Z0duQ3VvWkg2R0NxMGujY2lk2SB3QUEzV0tIWXlqaDRCUXJuWDJsZGV4NjFhc2NoaGFZcg&client=wAA3WKHYyjh4BQrnX2ldex61aschhaYr&protocol=oauth2&redirect_uri=https%3A%2F%2Fnetwork.satnogs.org%2Fcomplete%2Fauth0%3Fredirect_state%3DBbLeCTIj5xBvoYzbo5IsjoEiq5n1Wr6m&response_type=code&scope=openid%20email%20profile', text: 'Sign Up/Login', icon: 'icon/Sign_in.svg' },


    ];


    var linksContainer = document.getElementById('links-container');

    linkData.forEach(function (link) {
        var a = document.createElement('a');
        a.href = link.href;

        // Create an img element for the SVG icon
        var iconImg = document.createElement('img');
        iconImg.src = link.icon;
        iconImg.alt = link.text;
        iconImg.classList.add('icon');

        // Set the text content
        var textSpan = document.createElement('span');
        textSpan.textContent = link.text;

        // Append the icon and text spans to the link
        a.appendChild(iconImg);
        a.appendChild(textSpan);


        // Append the link to the container
        linksContainer.appendChild(a);
    });


    var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    });

    var terrainLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri'
    });
    var googleLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
 


    var map = L.map('map', {
        center: ([0, 0]), // Coordinate [latitudine, longitudine]
        zoom: 3,
        minZoom: 3,       // Livello di zoom massimo
        maxZoom: 10,
        layers: [osmLayer],
        keepAspectRatio: true,     // Imposta il livello di zoom massimo consentito  
    });

    // Create a control layers
    var baseLayers = {
        'OpenStreetMap': osmLayer,
        'Terrain': terrainLayer,
        'Satellite': satelliteLayer,
        'Google': googleLayer,

    };
   

    L.control.layers(baseLayers, null, { collapsed: false }).addTo(map);

    // Aggiungi un layer mappa di OpenStreetMap

    /* L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '© OpenStreetMap contributors'
     }).addTo(map);
   */

    var url = 'https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/brightest.txt';

    fetch(url)
        .then(response => response.text())
        .then(data => {
            var satelliteData = parseSatelliteData(data);
            addMarkers(satelliteData);
        })
        .catch(error => console.error('Error fetching data:', error));

    function parseSatelliteData(text) {
        // Implement the logic to parse the data from the text
        // and return an array of objects containing satellite information
        // You may need to adjust this based on the actual format of the data
        // returned by the API
        var lines = text.split('\n');
        var satelliteArray = [];

        for (var i = 0; i < lines.length; i += 1) {
            var commonName = lines[i];
            var line1 = lines[i + 1];
            var line2 = lines[i + 2];

            // You may need to extract relevant information from TLE data
            // and create an object with necessary details
            var satelliteInfo = {
                name: commonName,
                line1: line1,
                line2: line2
                // Add more properties as needed
            };

            satelliteArray.push(satelliteInfo);
        }

        return satelliteArray;
    }

    function addMarkers(data) {
        data.forEach(function (item) {
            var loc = getSatelliteLocation(item.line1, item.line2);
            if (loc !== null) {
                var marker = L.marker([loc.lat, loc.lng])
                    .addTo(map)
                    .bindPopup(item.name);
            }
        });
    }

    function getSatelliteLocation(line1, line2) {
        // Implement the logic to get satellite location
        // from TLE data
        // Return an object with 'lat' and 'lng' properties
        // based on the actual implementation
        return { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 };
    }

    
    // Aggiunge il riquadro con l'orario
    /*var timeBox = L.control({ position: 'topleft' });
    
    timeBox.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'time-box');
        div.innerHTML = '<a href="Index.html"><img class="logo_mobile" src="icon/satnogs_net.png" alt="Logo" class="logo"> </a><div id="current-time"></div>';
        return div;
    };
    
    timeBox.addTo(map);
*/

    function toggleText() {
        var text = document.getElementById("hiddenText");
        text.style.display = (text.style.display === "none") ? "block" : "none";

        var icon = document.querySelector('.icon');
        icon.style.filter = (text.style.display === "none") ? "brightness(1)" : "brightness(1.5)";
    }

  
});





