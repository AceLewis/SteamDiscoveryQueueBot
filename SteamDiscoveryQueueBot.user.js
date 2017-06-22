// ==UserScript==
// @name        SteamDiscoveryQueueBot
// @namespace   https://AceLewis.com
// @description Automatically harvest daily free steam trading cards
// @include     http*://store.steampowered.com/*
// @grant       GM_addStyle
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

//this.$ = this.jQuery = jQuery.noConflict(true);

// Create button
var zNode = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">Get cards</button>';
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild(zNode);

// Allow button to be clicked
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction(zEvent) {
    window.location.replace('http://store.steampowered.com/explore')
    OpenQueue();
}

console.log(window.location.href)

if (window.location.href.indexOf('agecheck') > -1){
    console.log('Age check')
    ByPassAgeCheck();
}
else if (window.location.href.indexOf('/app/') > -1){
    console.log('Click next')
    ClickNext();
}
else if (window.location.href.indexOf('/explore') > -1){
    console.log('OK');
    OpenQueue();
}

function OpenQueue(){
    // Click the button to go to start the queue
    //jQuery('#refresh_queue_btn').click();
    document.querySelector('#refresh_queue_btn').click()
    //jQuery('.discovery_queue_start_link').click();
    document.querySelector('.discovery_queue_start_link').click()
}

function ByPassAgeCheck(){
    // A cleaned up version of http://userscripts-mirror.org/scripts/review/97849

    // Get form
    var AgeForm = document.getElementById('agegate_box').getElementsByTagName('form')[0];

    // Get selection list
    var SelectionList = AgeForm.getElementsByTagName('select');

    // Loop through selection list
    for (var Index = 0; SelectionList.length !== Index; ++Index) {
        // Get selection
        var Selection = SelectionList[Index];

        // Check name
        if ('ageYear' === Selection.name)
        {
            // Set year
            Selection.value = '1970';
        }
    }

    // Submit form
    AgeForm.submit();
}


function ClickNext(){
    console.log('Will click button')
    //jQuery('.next_in_queue_content').click();
    document.querySelector('.next_in_queue_content').click()

}

// CSS for button
GM_addStyle ( multilineStr (function (){/*!
    #myContainer {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              15px;
        background:             #171a21;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.8;
        z-index:                222;
        padding:                2px 5px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}
