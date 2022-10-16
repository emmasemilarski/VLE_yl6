(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let amPm = h >= 12 ? "PM" : "AM";

            if (h > 12) {
                h = h - 12;
            } else if (h == 0) {
                h = 12;
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + amPm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");
        let raadio1 = document.getElementById("arve");
        let raadio2 = document.getElementById("pank");
        
        if (eesnimi.value === "" || perenimi.value === "") {
            alert("Palun täitke mõlemad nimelahtrid");
            return;
        } else if (!raadio1.checked && !raadio2.checked) {
            alert("Palun valige makseviis");
            return;
        } else if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return; 
        } else {
            let tarneHind;
            if (linn.value == "trt") tarneHind = 0;
            else if (linn.value === "tln") tarneHind = 2.5;
            else if (linn.value === "nrv") tarneHind = 2.5;
            else if (linn.value === "prn") tarneHind = 3;

            e.innerHTML = tarneHind + " &euro;";
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AiRgxzTqyZs0RqLTbLGuMsTuwExaIfKzs05ifCeIdIzb9SRNvvsz2d8X3JTTom23";

let myMap;

function GetMap() {
    
    "use strict";

    let aadress1 = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    let aadress2 = new Microsoft.Maps.Location(
            58.2285385, 
            26.416399
        );
    
    let keskpunkt = new Microsoft.Maps.Location(
            58.3026772, 
            26.6147137
    );

    myMap = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: keskpunkt,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
        disablePanning: true
    });
    
    let pushpin1 = new Microsoft.Maps.Pushpin(aadress1, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT'
        });

    let pushpin2 = new Microsoft.Maps.Pushpin(aadress2, {
            title: 'Elva',
            subTitle: 'Mõnus koht',
            text: 'Elva'
        });

    function pushpin1Clicked(e) {
        var infobox = new Microsoft.Maps.Infobox(keskpunkt, {
            title: 'Tartu Ülikool',
            description: 'Tartu Ülikool (lühend TÜ) on vanim ja suurim Eestis tegutsev ülikool ning ühtlasi Baltimaade ainus ülikool, mis kuulub 1,2% maailma parimate sekka.'
        });
        infobox.setMap(myMap);
    };

    function pushpin2Clicked(e) {
        var infobox = new Microsoft.Maps.Infobox(keskpunkt, {
            title: 'Elva',
            description: 'Elva on linn Tartu maakonnas Elva vallas. Linna kirdeossa jääb Peedu ja idaossa Mahlamäe linnajagu. Lõunas külgneb linn Käärdi alevikuga.'
        });
        infobox.setMap(myMap);
    };


    myMap.entities.push(pushpin1);
    myMap.entities.push(pushpin2);
    Microsoft.Maps.Events.addHandler(pushpin1, 'click', pushpin1Clicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpin2Clicked);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

