function getAddresses(){
        var destArray = new Array();
         destArray["fromAddress"] = document.getElementById('fromAddress').value;
         destArray["toAddress"] = document.getElementById('toAddress').value;
         destArray["leaveDate"] = document.getElementById('leaveDate').value;
         destArray["leaveTime"]  = document.getElementById('leaveTime').value;
         document.write("You are traveling from: "+destArray["fromAddress"] + "</br>");
         document.write("to:" + destArray["toAddress"] + "</br>");
         document.write("You want to be picked up: "+destArray["leaveDate"]+ "</br>");
         document.write("At: "+destArray["leaveTime"]);
}

function printFunc(){
        var div = document.getElementById("display");
        var destArray = displayTravel();
        var textArray = displayText();
        for(i = 0; i<destArray.length; i++){
                var textNode = document.createTextNode(textArray[i]);
                var destNode = document.createTextNode(destArray[i]);
                var br = document.createElement("br");
                div.appendChild(textNode);
                div.appendChild(destNode);
                div.appendChild(br);
        }
}
function displayText(){
        var text = new Array();
        text[0] = "You are traveling from: ";
        text[1] = "to: "
        text[2] = "You want to be picked up: ";
        text[3] = "At: "
        return text;
}

function displayTravel(){
        var destArray = new Array();
         destArray[0] = document.getElementById('fromAddress').value;
         destArray[1] = document.getElementById('toAddress').value;
         destArray[2] = document.getElementById('leaveDate').value;
         destArray[3]  = document.getElementById('leaveTime').value;
         return destArray;
         /*
        var div = document.getElementById("display");
        var headerOne = document.createTextNode("You are traveling from: "+destArray["fromAddress"] );
        div.appendChild(headerOne);
        var headerOne2 = document.createTextNode("to:" + destArray["toAddress"] );
        div.appendChild(headerOne2);
        var headerOne3 = document.createTextNode("You want to be picked up: "+destArray["leaveDate"] );
        div.appendChild(headerOne3);
        var headerOne4 = document.createTextNode("At: "+destArray["leaveTime"]);
        div.appendChild(headerOne4);
        */
}


var vm = new Vue ({
        el: '#display',
        data: {
                arr: []
        },

        methods: {
                popDisplay: function (event) {
                        var destArray = displayTravel();
                        this.arr = destArray;

                }
        }
});
