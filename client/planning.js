document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAllp')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));

});


function loadHTMLTable(data) {
    const listeprof = document.querySelector('#listeprof');

    let tableHtml = "";

    data.forEach(function ({ id, nom, prenom, date_added }) {   // Retourne les données s'il y en a //


        tableHtml += `<option value="${id}">${nom + ' ' + prenom}</option>`;

    });

    listeprof.innerHTML = tableHtml;

}

// calendarJs(id, options, startDateTime)
var calendarInstance = new calendarJs("myCalendar", {
    dayNames: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    dayHeaderNames: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    fromText: 'Du',
    toText: 'Au',
    monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'], // Mois
    location: false,

})
var events = [
    {
        from: Date(),
        to: Date(),
        title: "Previous Day",
        description: "This is a another description of the event that has been added, so it can be shown in the pop-up dialog.",
        isAllDayEvent: true,
        color: "#000000",
        colorText: "#000000",
        colorBorder: "#00FF00"
    },
    // more events here
];
calendarInstance.addEvents(events);

const getevents = document.querySelector('#getevents');  // BTN ajouter Cours
getevents.onclick = function () {
    calendarInstance.getEvents().forEach(element => {
        console.log(element)
        const dateInput = element.created;
        const debutInput = element.from;
        const finInput = element.to;
        const id_prof = document.querySelector('#listeprof').value;
        const groupe = element.group;

        if (groupe != null && dateInput != null && debutInput != null && finInput != null && id_prof != null) {
            fetch('http://localhost:5000/insertC', { // Envoie les données au backend // 
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ date: dateInput, heuredebut: debutInput, heurefin: finInput, id_prof: id_prof, groupe: groupe })

            })
                .then(response => response.json());
        }



    })
}

const addBtn = document.querySelector('.ok');
addBtn.onclick = function () {
    eventDialogEvent_OK();
}
fetch('http://localhost:5000/getAllc')
    .then(response => response.json())
    .then(data => {
        if (data) {
            data['data'].forEach(function ({ id, date, groupe, heuredebut, heurefin, prof }) {
                date = new Date(date)
                heuredebut = new Date(heuredebut)
                heurefin = new Date(heurefin)
                calendarInstance.addEvent({
                    created: date,
                    from: heuredebut,
                    to: heurefin,
                    title: groupe,
                    description: 'Prof : ' + prof,
                    isAllDayEvent: false,
                    color: "#000000",
                    colorText: "#FFFF00",
                    colorBorder: "#00FF00"
                })
            })
        }
    });
console.log(events)


console.log(calendarInstance.getEvents())





function eventDialogEvent_OK() {
    var fromTime = _element_EventEditorDialog_TimeFrom.value.split(":"),
        toTime = _element_EventEditorDialog_TimeTo.value.split(":"),
        title = trimString(_element_EventEditorDialog_Title.value);

    if (fromTime.length < 2) {
        showEventDialogErrorMessage(_options.fromTimeErrorMessage, _element_EventEditorDialog_TimeFrom);
    } else if (toTime.length < 2) {
        showEventDialogErrorMessage(_options.toTimeErrorMessage, _element_EventEditorDialog_TimeTo);
    } else if (title === "") {
        showEventDialogErrorMessage(_options.titleErrorMessage, _element_EventEditorDialog_Title);
    }
    else {

        var fromDate = getSelectedDate(_element_EventEditorDialog_DateFrom),
            toDate = getSelectedDate(_element_EventEditorDialog_DateTo),
            description = trimString(_element_EventEditorDialog_Description.value),
            location = trimString(_element_EventEditorDialog_Location.value),
            group = trimString(_element_EventEditorDialog_Group.value),
            repeatEnds = getSelectedDate(_element_EventEditorRepeatOptionsDialog_RepeatEnds, null),
            url = trimString(_element_EventEditorDialog_Url.value),
            repeatEveryCustomValue = parseInt(_element_EventEditorDialog_RepeatEvery_Custom_Value.value);

        setTimeOnDate(fromDate, _element_EventEditorDialog_TimeFrom.value);
        setTimeOnDate(toDate, _element_EventEditorDialog_TimeTo.value);

        if (isNaN(repeatEveryCustomValue)) {
            repeatEveryCustomValue = 0;
            _element_EventEditorDialog_RepeatEvery_Never.checked = true;
            _element_EventEditorDialog_RepeatEvery_Custom_Type_Daily.checked = true;
        }

        if (toDate < fromDate) {
            showEventDialogErrorMessage(_options.toSmallerThanFromErrorMessage, _element_EventEditorDialog_DateTo);
        } else {

            eventDialogEvent_Cancel();

            var isExistingEvent = isDefined(_element_EventEditorDialog_EventDetails.id),
                newEvent = {
                    from: fromDate,
                    to: toDate,
                    title: title,
                    description: description,
                    location: location,
                    group: group,
                    isAllDay: _element_EventEditorDialog_IsAllDay.checked,
                    showAlerts: _element_EventEditorDialog_ShowAlerts.checked,
                    color: _element_EventEditorDialog_EventDetails.color,
                    colorText: _element_EventEditorDialog_EventDetails.colorText,
                    colorBorder: _element_EventEditorDialog_EventDetails.colorBorder,
                    repeatEveryExcludeDays: _element_EventEditorDialog_EventDetails.repeatEveryExcludeDays,
                    repeatEnds: repeatEnds,
                    url: url,
                    repeatEveryCustomValue: repeatEveryCustomValue
                };

            if (_element_EventEditorDialog_RepeatEvery_Never.checked) {
                newEvent.repeatEvery = _repeatType.never;
            } else if (_element_EventEditorDialog_RepeatEvery_EveryDay.checked) {
                newEvent.repeatEvery = _repeatType.everyDay;
            } else if (_element_EventEditorDialog_RepeatEvery_EveryWeek.checked) {
                newEvent.repeatEvery = _repeatType.everyWeek;
            } else if (_element_EventEditorDialog_RepeatEvery_Every2Weeks.checked) {
                newEvent.repeatEvery = _repeatType.every2Weeks;
            } else if (_element_EventEditorDialog_RepeatEvery_EveryMonth.checked) {
                newEvent.repeatEvery = _repeatType.everyMonth;
            } else if (_element_EventEditorDialog_RepeatEvery_EveryYear.checked) {
                newEvent.repeatEvery = _repeatType.everyYear;
            } else if (_element_EventEditorDialog_RepeatEvery_Custom.checked) {
                newEvent.repeatEvery = _repeatType.custom;
            }

            if (_element_EventEditorDialog_RepeatEvery_Custom_Type_Daily.checked) {
                newEvent.repeatEveryCustomType = _repeatCustomType.daily;
            } else if (_element_EventEditorDialog_RepeatEvery_Custom_Type_Weekly.checked) {
                newEvent.repeatEveryCustomType = _repeatCustomType.weekly;
            } else if (_element_EventEditorDialog_RepeatEvery_Custom_Type_Monthly.checked) {
                newEvent.repeatEveryCustomType = _repeatCustomType.monthly;
            } else if (_element_EventEditorDialog_RepeatEvery_Custom_Type_Yearly.checked) {
                newEvent.repeatEveryCustomType = _repeatCustomType.yearly;
            }

            if (!isExistingEvent) {
                newEvent.organizerName = _options.organizerName;
                newEvent.organizerEmailAddress = _options.organizerEmailAddress;
            } else {
                newEvent.id = _element_EventEditorDialog_EventDetails.id;
            }

            if (isExistingEvent) {
                _this.updateEvent(_element_EventEditorDialog_EventDetails.id, newEvent, false);
            } else {
                _this.addEvent(newEvent, false);
            }

            buildDayEvents();
            refreshOpenedViews();
        }
    }
}