




document.addEventListener('DOMContentLoaded', function () {
    var linkData = [
        { href: 'Home.html', text: 'Home', icon: 'icon/Navbar.svg' },
        { href: 'Observation.html', text: 'Observations', icon: 'icon/Observations.svg' },
        { href: 'https://network.satnogs.org/stations/', text: 'Ground Station', icon: 'icon/Gound.svg' },
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


        var textSpan = document.createElement('span');
        textSpan.textContent = link.text;

        a.appendChild(iconImg);
        a.appendChild(textSpan);


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



    var url = 'https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/live/brightest.txt';

    fetch(url)
        .then(response => response.text())
        .then(data => {
            var satelliteData = parseSatelliteData(data);
            addMarkers(satelliteData);
        })
        .catch(error => console.error('Error fetching data:', error));

    function parseSatelliteData(text) {

        var lines = text.split('\n');
        var satelliteArray = [];

        for (var i = 0; i < lines.length; i += 1) {
            var commonName = lines[i];
            var line1 = lines[i + 1];
            var line2 = lines[i + 2];

            var satelliteInfo = {
                name: commonName,
                line1: line1,
                line2: line2
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

        return { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 };
    }







});





