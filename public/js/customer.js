/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
        el: '#page',
        data: {
                orderId: null,
                map: null,
                fromMarker: null,
                destMarker: null,
                taxiMarkers: {}
        },
        created: function () {
                socket.on('initialize', function (data) {
                        // add taxi markers in the map for all taxis
                        for (var taxiId in data.taxis) {
                                this.taxiMarkers[taxiId] = this.putTaxiMarker(data.taxis[taxiId]);
                        }
                }.bind(this));
                socket.on('orderId', function (orderId) {
                        this.orderId = orderId;
                }.bind(this));
                socket.on('taxiAdded', function (taxi) {
                        this.taxiMarkers[taxi.taxiId] = this.putTaxiMarker(taxi);
                }.bind(this));

                socket.on('taxiMoved', function (taxi) {
                        this.taxiMarkers[taxi.taxiId].setLatLng(taxi.latLong);
                }.bind(this));

                socket.on('taxiQuit', function (taxiId) {
                        this.map.removeLayer(this.taxiMarkers[taxiId]);
                        Vue.delete(this.taxiMarkers, taxiId);
                }.bind(this));

                // These icons are not reactive
                this.taxiIcon = L.icon({
                        iconUrl: "img/taxi.png",
                        iconSize: [36, 36],
                        iconAnchor: [18, 36],
                        popupAnchor: [0, -36]
                });

                this.fromIcon = L.icon({
                        iconUrl: "img/customer.png",
                        iconSize: [36, 50],
                        iconAnchor: [19, 50]
                });
        },
        mounted: function () {
                // set up the map
                this.map = L.map('my-map').setView([59.8415, 17.648], 13);

                // create the tile layer with correct attribution
                var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
                var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
                L.tileLayer(osmUrl, {
                        attribution: osmAttrib,
                        maxZoom: 18
                }).addTo(this.map);
                this.map.on('click', this.handleClick);

                var searchDestControl = L.esri.Geocoding.geosearch({ allowMultipleResults: false, zoomToResult: false, placeholder: "Destination" }).addTo(this.map);
                var searchFromControl = L.esri.Geocoding.geosearch({ allowMultipleResults: false, zoomToResult: false, placeholder: "From" });
                // listen for the results event and add the result to the map
                searchDestControl.on("results", function (data) {
                        this.destMarker = L.marker(data.latlng, { draggable: true }).addTo(this.map);
                        this.destMarker.on("drag", this.moveMarker);
                        searchFromControl.addTo(this.map);
                }.bind(this));

                // listen for the results event and add the result to the map
                searchFromControl.on("results", function (data) {
                        this.fromMarker = L.marker(data.latlng, { icon: this.fromIcon, draggable: true }).addTo(this.map);
                        this.fromMarker.on("drag", this.moveMarker);
                        this.connectMarkers = L.polyline([this.fromMarker.getLatLng(), this.destMarker.getLatLng()], { color: 'blue' }).addTo(this.map);
                }.bind(this));
        },
        methods: {
                putTaxiMarker: function (taxi) {
                        var marker = L.marker(taxi.latLong, { icon: this.taxiIcon }).addTo(this.map);
                        marker.bindPopup("Taxi " + taxi.taxiId);
                        marker.taxiId = taxi.taxiId;
                        return marker;
                },
                orderTaxi: function () {
                        socket.emit("orderTaxi", {
                                fromLatLong: [this.fromMarker.getLatLng().lat, this.fromMarker.getLatLng().lng],
                                destLatLong: [this.destMarker.getLatLng().lat, this.destMarker.getLatLng().lng],
                                orderItems: { passengers: 1, bags: 1, animals: "doge" }
                        });
                },
                handleClick: function (event) {
                        // first click sets destination
                        if (this.destMarker === null) {
                                this.destMarker = L.marker([event.latlng.lat, event.latlng.lng], { draggable: true }).addTo(this.map);
                                this.destMarker.on("drag", this.moveMarker);
                        }
                        // second click sets pickup location
                        else if (this.fromMarker === null) {
                                this.fromMarker = L.marker(event.latlng, { icon: this.fromIcon, draggable: true }).addTo(this.map);
                                this.fromMarker.on("drag", this.moveMarker);
                                this.connectMarkers = L.polyline([this.fromMarker.getLatLng(), this.destMarker.getLatLng()], { color: 'blue' }).addTo(this.map);
                        }
                },
                moveMarker: function (event) {
                        this.connectMarkers.setLatLngs([this.fromMarker.getLatLng(), this.destMarker.getLatLng()], { color: 'blue' });
                        /*socket.emit("moveMarker", { orderId: event.target.orderId,
                                                  latLong: [event.target.getLatLng().lat, event.target.getLatLng().lng]
                                                  });
                                                  */
                }
        }
});
var modal = document.getElementById("login-modal");

window.addEventListener("click", clickOutside);

function openLoginModal() {
        modal.style.display = "block";
}
var mapModal = document.getElementById("map-modal");
function openMapModal() {
        mapModal.style.display = "block";
        vm.map.invalidateSize();

}
function closeMapModal() {
        mapModal.style.display = "none";
}
var carModal = document.getElementById("getAcar-modal");

function openGetACarModal() {
        carModal.style.display = "block";
}
function closeGetACarModal() {
        carModal.style.display = "none";
}

var travelModal = document.getElementById("travel-modal");
function openTravelModal() {
        travelModal.style.display = "block";
}
function closeTravelModal() {
        travelModal.style.display = "none";
}

function closeLoginModal() {
        modal.style.display = "none";
}

function clickOutside(even) {
        if (even.target == modal) {
                modal.style.display = "none";
        }
}

var modal2 = document.getElementById("create-account-modal");

function openAccountModal() {
        modal2.style.display = "block";
}

function closeAccountModal() {
        modal2.style.display = "none";
}

function clickOutside2(even) {
        if (even.target == modal2) {
                modal2.style.display = "none";
        }
}


var modal3 = document.getElementById("simpleModal3");

function openModal3() {
        modal3.style.display = "block";
}

function closeModal3() {
        modal3.style.display = "none";
}

function clickOutside3(even) {
        if (even.target == modal) {
                modal3.style.display = "none";
        }
}


//------

var contactmodal = document.getElementById("contact-modal");

function opencontactmodal() {
        contactmodal.style.display = "block";
}

function closecontactmodal() {
        contactmodal.style.display = "none";
}

//------

var disabledModal = document.getElementById("disabled-modal");

function openDisabledModal() {
        disabledModal.style.display = "block";
}

function closeDisabledModal() {
        disabledModal.style.display = "none";
}



window.userArray = new Array();

function pushArray() {
        var thing = document.getElementById('username').value;
        userArray.push(thing);
}
function loadUserName() {
        var node = document.createElement("h2");
        var usernm = userArray[0];
        var thing = document.createTextNode(usernm);
        var welcome = document.createTextNode("Welcome ");
        node.appendChild(welcome);
        node.appendChild(thing);
        document.getElementById("welcomeID").appendChild(node);
}
function getUserName(array) {
        var node = document.createElement("h2");
        var welcome = document.createTextNode("Welcome ");
        var usernm = array[0];
        var thing = document.createTextNode(usernm);
        console.log(usernm);
        console.log(thing);
        console.log(welcome);
        node.appendChild(welcome);
        node.appendChild(thing);
        console.log(node);
        document.getElementById("welcomeID").appendChild(node);
}
function fillUserArray() {
        userArray.push(document.getElementById('username').value);
        getUserName(userArray);
}


function twofunctions() {
        openLoginModal();
        getUserName();
}
