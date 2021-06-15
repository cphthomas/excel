const handsonJS = () => {
    waitForElement("#hot", 8000)
        .then(function () {
            console.log("hot element is loaded.. do stuff");
            handsonTableScript();
        })
        .catch(() => {
            console.log("hot element did not load in 8 seconds");
        });
};

function waitForElement(querySelector, timeout = 0) {
    const startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            if (document.querySelector(querySelector)) {
                clearInterval(timer);
                resolve();
            } else if (timeout && now - startTime >= timeout) {
                clearInterval(timer);
                reject();
            }
        }, 100);
    });
}

function handsonTableScript() {
    var dataObject = [
        {
            id: 1,
            currencyCode: "EUR",
            currency: "Euro",
            level: 0.9033,
            units: "EUR / USD",
            asOf: "08/19/2019",
            onedChng: 0.0026,
        },
        {
            id: 2,
            currencyCode: "JPY",
            currency: "Japanese Yen",
            level: 124.387,
            units: "JPY / USD",
            asOf: "08/19/2019",
            onedChng: 0.0001,
        },
        {
            id: 3,
            currencyCode: "GBP",
            currency: "Pound Sterling",
            level: 0.6396,
            units: "GBP / USD",
            asOf: "08/19/2019",
            onedChng: 0.0,
        },
        {
            id: 4,
            currencyCode: "CHF",
            currency: "Swiss Franc",
            level: 0.9775,
            units: "CHF / USD",
            asOf: "08/19/2019",
            onedChng: 0.0008,
        },
        {
            id: 5,
            currencyCode: "CAD",
            currency: "Canadian Dollar",
            level: 1.3097,
            units: "CAD / USD",
            asOf: "08/19/2019",
            onedChng: -0.0005,
        },
        {
            id: 23,
            currencyCode: "",
            currency: "",
            level: 0,
            units: "",
            asOf: "",
            onedChng: "",
        },
    ];
    var currencyCodes = [
        "EUR",
        "JPY",
        "GBP",
        "CHF",
        "CAD",
        "AUD",
        "NZD",
        "SEK",
        "NOK",
        "BRL",
        "CNY",
        "RUB",
        "INR",
        "TRY",
        "THB",
        "IDR",
        "MYR",
        "MXN",
        "ARS",
        "DKK",
        "ILS",
        "PHP",
    ];

    var hotElement = document.querySelector("#hot");
    var hotElementContainer = hotElement.parentNode;
    var hotSettings = {
        data: dataObject,
        columns: [
            {
                data: "id",
                type: "numeric",
                width: 40,
            },
            {
                data: "currencyCode",
                type: "text",
            },
            {
                data: "currency",
                type: "text",
            },
            {
                data: "level",
                type: "numeric",
                numericFormat: {
                    pattern: "0.0000",
                },
            },
            {
                data: "units",
                type: "text",
            },
            {
                data: "asOf",
                type: "date",
                dateFormat: "MM/DD/YYYY",
            },
            {
                data: "onedChng",
                type: "numeric",
                numericFormat: {
                    pattern: "0.00%",
                },
            },
        ],
        stretchH: "all",
        width: 805,
        autoWrapRow: true,
        height: 180,
        maxRows: 6,
        rowHeaders: true,
        colHeaders: [
            "ID",
            "Code",
            "Currency",
            "Level",
            "Units",
            "Date",
            "Change",
        ],
        columnSummary: [
            {
                destinationRow: 5,
                destinationColumn: 3,
                type: "sum",
                forceNumeric: true,
            },
        ],
        language: "da-dk",
    };
    var hot = new Handsontable(hotElement, hotSettings);

    // var container1 = document.getElementById("hot");
    // var hot1 = new Handsontable(container1, {
    //     data: Handsontable.helper.createSpreadsheetData(7, 7),
    //     colHeaders: true,
    //     rowHeaders: true,
    //     hiddenRows: { rows: [1, 3, 5], indicators: true },
    //     hiddenColumns: { columns: [1, 3, 5], indicators: true },
    // });
    var button1 = document.getElementById("export-file");
    var exportPlugin1 = hot.getPlugin("exportFile");

    button1.addEventListener("click", function () {
        exportPlugin1.downloadFile("csv", {
            bom: false,
            columnDelimiter: ",",
            columnHeaders: false,
            exportHiddenColumns: true,
            exportHiddenRows: true,
            fileExtension: "csv",
            filename: "Handsontable-XLSX-file_[YYYY]-[MM]-[DD]",
            mimeType: "text/csv",
            rowDelimiter: "\r\n",
            rowHeaders: true,
        });
    });
}

export default handsonJS;
