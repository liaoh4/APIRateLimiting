const hitAPIOne = document.getElementById("hit-api-one")
const hitAPITwo = document.getElementById("hit-api-two")
const hitAPIThree = document.getElementById("hit-api-three")
const hitAPIFour = document.getElementById("hit-api-four")
const result = document.getElementById("result")
const disableAllBtn = () =>{
    hitAPIOne.disabled = true
    hitAPITwo.disabled = true
    hitAPIThree.disabled = true
    hitAPIFour.disabled = true
}

const enableAllBtn = () => {
    hitAPIOne.disabled = false
    hitAPITwo.disabled = false
    hitAPIThree.disabled = false
    hitAPIFour.disabled = false
}

const hitAPIOneBtnClickEventHandler = ()=>{
    disableAllBtn();
    fetch(`${window.location.href}api-one`)
        .then((response) =>{
            processAPIResponse(response)
        })
        .catch((err) => console.log(err));
};

const hitAPITwoBtnClickEventHandler = (e) =>{
    disableAllBtn();
    fetch(`${window.location.href}api-two`)
        .then((response) => {
            processAPIResponse(response)
        })
        .catch((err) => console.log(err));
};

const hitAPIThreeBtnClickEventHandler = (e) =>{
    disableAllBtn();
    fetch(`${window.location.href}api-three`)
        .then((response) =>{
            processAPIResponse(response)
        })
        .catch((err) => console.log(err));
};

const hitAPIFourBtnClickEventHandler = (e) =>{
    disableAllBtn();
    fetch(`${window.location.href}api-four`)
        .then((response) => processAPIResponse(response))
        .catch((err) =>
            console.log(err));
};

function processAPIResponse(response){
    if(response.status === 503){
        response.json().then((data) =>{
            result.innerHTML = `<span style='color:red'>Status: ${data.status}, 
                                    API Message: ${data.apiMessage}, 
                                    Call made in a window: ${data.callsMadeInAWindow}, 
                                    Time left: ${data.timeLeft}</span><br>`;
            enableAllBtn();
        });
    }else{
        response.json().then((data) => {
            result.innerHTML = `\nStatus: ${data.status}, 
                                    API Message: ${data.apiMessage}, 
                                    Call made in a window: ${data.callsMadeInAWindow}, 
                                    Time left: ${data.timeLeft}<br>`;
            enableAllBtn();
        });
    }

}









hitAPIOne.addEventListener("click", hitAPIOneBtnClickEventHandler);
hitAPITwo.addEventListener("click", hitAPITwoBtnClickEventHandler);
hitAPIThree.addEventListener("click", hitAPIThreeBtnClickEventHandler);
hitAPIFour.addEventListener("click", hitAPIFourBtnClickEventHandler);
