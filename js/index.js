// Author: Gabe Farrell
// Sources: jquery validate documentation https://jqueryvalidation.org/validate/

// prepare form input variables
var data = []
const form = document.getElementById('form')
const mdl = document.getElementById('md-l')
const mdu = document.getElementById('md-u')
const mrl = document.getElementById('mr-l')
const mru = document.getElementById('mr-u')
const errdisplay = document.getElementById('err')

// make sure the page doesnt refresh on submit
form.addEventListener('submit', (e) => {
    e.preventDefault()
})

$.validator.addMethod("greaterThan",
    function (value, element, param) {
          var $otherElement = $(param);
          return parseInt(value) > parseInt($otherElement.val());
    }
);

$("#form").validate({
    // all lower values must be min -50 max 49, and all upper values must be greater than the lower but max 50
    rules: {
        multiplicand_lower: {
            required: true,
            min: -50,
            max: 49,
        },
        multiplicand_upper: {
            required: true,
            max: 50,
            greaterThan: '#md-l'
        },
        multiplier_lower: {
            required: true,
            min: -50,
            max: 49,
        },
        multiplier_upper: {
            required: true,
            max: 50,
            greaterThan: '#mr-l'
        },
    },
    messages: {
        multiplicand_upper: {
            greaterThan: 'Multiplicand upper value must be greater than lower value'
        },
        multiplier_upper: {
            greaterThan: 'Multiplier upper value must be greater than lower value'
        }
    },
    submitHandler: (form) => {
        submitForm()
    },
    errorElement: "div"
})
/* ---------------- TABS -------------- */

var tabCount = 0
var currtab = 0

// initialize tabs
$('#tabs').tabs()

// make the tab buttons do things
$('#save').click(()=> {
    addTab()
})
$('#delete').click(() => {
    removeTab()
})
$('#delrange').click(() => {
    removeTabRange()
})

// just appends to the tab list and adds the tab body div then refreshes the tabs
function addTab() {
    tabCount += 1
    $('#tabs > ul').append(`<li id="tab-head-${tabCount}"><a href="#tab-${tabCount}" class="tabcontent">Table ${tabCount}</a></li>`);
    $('#tab-0').clone().attr('id', `tab-${tabCount}`).appendTo('#tabs');
    $('#tabs').tabs('refresh');
}

// removes current tab
function removeTab() {
    // cant delete the generator
    if (tabCount < 1) {
        return
    }
    let currtab = $('.ui-tabs-active');
    let tabid = currtab.prop('id')
    let tabnum = tabid.slice(9)
    // STOP TRYING TO DELETE THE GENERATOR
    if (tabnum == 0) {
        return
    }
    removeTabNum(tabnum)
    tabCount -= 1
}

function removeTabRange() {
    let t1 = $('#tabrange').val().split(',')[0]
    let t2 = $('#tabrange').val().split(',')[1]

    for (let i = parseInt(t1); i <= parseInt(t2); i++) {
        removeTabNum(i)
    }
}

// this func removes the actual elements of tab number 'n'
function removeTabNum(n) {
    $('#tab-head-' + n).remove()
    $('#tab-' + n).remove()
    $('#tabs').tabs('refresh');
    tabCount -= 1
}

/* ------ SLIDER ------- */

// prepare values 
var mdlVal = 0
var mduVal = 0
var mrlVal = 0
var mruVal = 0
mdl.value = 0
mdu.value = 0
mrl.value = 0
mru.value = 0

// change slider based on input
$('#md-l').change(() => {
    mdlVal = $('#md-l').val()
    $("#md-l-slider").slider('value', mdlVal)
})
$('#md-u').change(() => {
    mduVal = $('#md-u').val()
    $("#md-u-slider").slider('value', mduVal)
})
$('#mr-l').change(() => {
    mrlVal = $('#mr-l').val()
    $("#mr-l-slider").slider('value', mrlVal)
})
$('#mr-u').change(() => {
    mruVal = $('#mr-u').val()
    $("#mr-u-slider").slider('value', mruVal)
})

// change input based on slider
// slide method fires every time the slider is moved
// change method fires when the input val changes in input box
$("#md-l-slider").slider({
    value: 0,
    min: -50,
    max: 50,
    slide: () => {
        mdlVal = $("#md-l-slider").slider('value')
        mdl.value = mdlVal
        $('form').submit()
    },
    change: () => {
        mdlVal = $("#md-l-slider").slider('value')
        mdl.value = mdlVal
        $('form').submit()
    }
});
$("#md-u-slider").slider({
    value: 0,
    min: -50,
    max: 50,
    slide: () => {
        mduVal = $("#md-u-slider").slider('value')
        mdu.value = mduVal
        $('form').submit()
    },
    change: () => {
        mduVal = $("#md-u-slider").slider('value')
        mdu.value = mduVal
        $('form').submit()
    }
});
$("#mr-l-slider").slider({
    value: 0,
    min: -50,
    max: 50,
    slide: () => {
        mrlVal = $("#mr-l-slider").slider('value')
        mrl.value = mrlVal
        $('form').submit()
    },
    change: () => {
        mrlVal = $("#mr-l-slider").slider('value')
        mrl.value = mrlVal
        $('form').submit()
    }
});
$("#mr-u-slider").slider({
    value: 0,
    min: -50,
    max: 50,
    slide: () => {
        mruVal = $("#mr-u-slider").slider('value')
        mru.value = mruVal
        $('form').submit()
    },
    change: () => {
        mruVal = $("#mr-u-slider").slider('value')
        mru.value = mruVal
        $('form').submit()
    }
});

/* ------------------- FUNCTIONS ------------------- */

// main form submission handler
function submitForm() {
    
    // prepare table element
    var table = document.createElement('table')
    table.setAttribute('id', 'table')
    table.setAttribute('class', 'table')
    document.getElementById('table-container').innerHTML = ''
    document.getElementById('table-container').appendChild(table)

    // create first row (label row)
    let row = document.createElement('tr')
    for (j = parseInt(mrl.value) - 1; j <= parseInt(mru.value); j++) {
        let h = document.createElement('th')
        if (j == parseInt(mrl.value) - 1) {
            // top left corner element is empty
            h.innerHTML = ' '
            row.appendChild(h)
            continue
        }
        h.innerHTML = j
        row.appendChild(h)
    }

    // add label row to table
    table.appendChild(row)

    // create the rest of the rows in the table
    for (i = parseInt(mdl.value); i <= parseInt(mdu.value); i++) {
        let row = document.createElement('tr')
        let h = document.createElement('th')
        h.innerHTML = i
        row.appendChild(h)
        for (j = parseInt(mrl.value); j <= parseInt(mru.value); j++) {
            let point = document.createElement('td')
            point.innerHTML = i * j
            row.appendChild(point)
        }
        table.appendChild(row)
    }
}

// basic input validation
function validateform() {
    for (i of form.elements) {
        if (i.type === "number" && (parseInt(i.value) > 50 || parseInt(i.value) < -50 || i.value == undefined || i.value == "")) {
            i.style = "border: 2px solid var(--color-error);"
            errdisplay.innerText = "All values must be between -50 and 50"
            return false
        } else {
            i.style = ""
        }
    }
    errdisplay.innerText = ""
    return true
}

// conditional input validation, ensure the values entered are valid when compared to each other
function validatevalues() {
    if (parseInt(mdl.value) >= parseInt(mdu.value)) {
        mdl.style = "border: 2px solid var(--color-error);"
        errdisplay.innerText = "Lower bounds must be less than upper bounds"
        return false
    }
    if (parseInt(mrl.value) >= parseInt(mru.value)) {
        mrl.style = "border: 2px solid var(--color-error);"
        errdisplay.innerText = "Lower bounds must be less than upper bounds"
        console.log()
        return false
    }
    mdl.style = ''
    mrl.style = ''
    errdisplay.innerText = ''
    return true
}