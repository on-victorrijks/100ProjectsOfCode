
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

function getDayWidth(){
    return document.getElementById('3').scrollWidth;
}

var dayWidth = getDayWidth();





function recoverWeeksBtn() {
    var allButtons = document.querySelectorAll("button.x-btn-text");

    let weeksBtns = [];

    allButtons.forEach(ButtonTVRF => {
        btnText = ButtonTVRF.innerText;
        if(btnText[0] == "S" && btnText !== "Samedi"){
            weeksBtns.push(ButtonTVRF);
        }
    });

    return weeksBtns 
}

function recoverProgram() {

    var allActivities = document.querySelectorAll(".grilleData div");

    let verifiedActivities = [];

    allActivities.forEach(ActivityTVRF => {
        ActivityTVRF_id = ActivityTVRF.id;
        if(ActivityTVRF_id[0] == "d"){

            var subActivityData = ActivityTVRF.querySelector('div');
            var subActivityData_label = subActivityData.getAttribute('aria-label').split('null');
            var subActivityData_label = subActivityData_label.filter(function(entry) { return entry.trim() != ''; });

            var subActivityData_time = subActivityData_label.pop().split(" ").filter(function(entry) { return entry.trim() != ''; });
            var subActivityData_fullLabel = subActivityData_label.toString();
            var subActivityData_day = Math.round((ActivityTVRF.parentElement.style.left.slice(0, -2))/dayWidth)+1;
            
            var verifiedActivity = [
                subActivityData_fullLabel,
                subActivityData_time,
                subActivityData_day
            ];
            
            verifiedActivities.push(verifiedActivity);
        }
    });

    return verifiedActivities;
}

function saveDataToFile(received_data){
    var _received_data = JSON.stringify(received_data);
    
    var vLink = document.createElement('a'),
    vBlob = new Blob([_received_data], {type: "octet/stream"}),
    vName = 'easyUCL_data.json',
    vUrl = window.URL.createObjectURL(vBlob);
    vLink.setAttribute('href', vUrl);
    vLink.setAttribute('download', vName );
    vLink.click();
} 

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeData(){

    var allData = [];

    weeksInstances = recoverWeeksBtn();
    weekID = 0;
    for (let weekID = 0; weekID < weeksInstances.length; weekID++) {
        weeksInstances[weekID].click();
        weekTxt = weeksInstances[weekID].innerText;
        console.log("Moving to next week");
        await sleep(500);
        allData.push([weekTxt,recoverProgram()]);
        console.log("New week added");
    }

    saveDataToFile(JSON.stringify(allData));
    return allData;
}

scrapeData();

