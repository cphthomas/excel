const visJS = () => {
    $("body").tooltip({ selector: "[data-toggle=tooltip]" });

    waitForElement("#vis11, #vis12, #vis13", 8000)
        .then(function () {
            console.log("#vis11 is loaded.. do stuff");
            visScript1();
        })
        .catch(() => {
            console.log("#vis11 did not load in 8 seconds");
        });

    waitForElement("#vis31, #vis32, #vis33,#vis34,#vis35", 8000)
        .then(function () {
            console.log("#vis31 is loaded.. do stuff");
            visScript3();
        })
        .catch(() => {
            console.log("#vis31 did not load in 8 seconds");
        });
    waitForElement("#vis41", 8000)
        .then(function () {
            console.log("#vis41 is loaded.. do stuff");
            visScript4();
        })
        .catch(() => {
            console.log("#vis41 did not load in 8 seconds");
        });

    waitForElement(
        "#vis101, #vis102, #vis103, #vis104, #vis105, #vis106, #vis107, #vis108",
        8000
    )
        .then(function () {
            console.log("#vis101 is loaded.. do stuff");
            visScript10();
        })
        .catch(() => {
            console.log("#vis111 did not load in 8 seconds");
        });

    waitForElement(
        "#vis111, #vis112, #vis113, #vis114, #vis115, #vis116, #vis117, #vis118, #vis119",
        8000
    )
        .then(function () {
            console.log("#vis111 is loaded.. do stuff");
            visScript11();
        })
        .catch(() => {
            console.log("#vis111 did not load in 8 seconds");
        });

    waitForElement(
        "#vis121, #vis122, #vis123, #vis124, #vis125, #vis126, #vis127, #vis128, #vis129",
        "#vis1210, #vis1211, #vis1212, #vis1213, #vis1214, #vis1215, #vis1216, #vis1217, #vis1218, #vis1219, #vis1220, #vis1221, #vis1222, #vis1223, #vis1224, #vis1225",
        8000
    )
        .then(function () {
            console.log("#vis121 is loaded.. do stuff");
            visScript12();
        })
        .catch(() => {
            console.log("#vis121 did not load in 8 seconds");
        });

    waitForElement("#visualization, #visualization2", 8000)
        .then(function () {
            console.log("#visualization is loaded.. do stuff");
            visTimelineScript();
        })
        .catch(() => {
            console.log("#visualization did not load in 8 seconds");
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

var nodes1 = {
    autoResize: true,
    height: "100%",
    width: "100%",
    shape: "box",

    font: {
        color: "white",
        size: 10,
    },
    scaling: {
        label: {
            min: 8,
            max: 50,
        },
    },
    borderWidth: 1,
    shadow: false,
    margin: {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    },
    color: {
        border: "black",
        background: "black",
        highlight: {
            fontColor: "black",

            border: "orange",
            background: "orange",
        },
    },
};
var layout1 = {
    improvedLayout: true,
    hierarchical: {
        enabled: true,
        direction: "UD",
        levelSeparation: 200,
        nodeSpacing: 100,
        treeSpacing: 10,
        blockShifting: true,
        sortMethod: "hubsize",
        parentCentralization: true,
        blockShifting: true,
        edgeMinimization: true,
    },
    physics: {
        enabled: true,
        barnesHut: {
            theta: 0.5,
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09,
            avoidOverlap: 1,
        },
        forceAtlas2Based: {
            theta: 0.5,
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springConstant: 0.08,
            springLength: 100,
            damping: 0.4,
            avoidOverlap: 1,
        },
        repulsion: {
            centralGravity: 0.2,
            springLength: 200,
            springConstant: 0.05,
            nodeDistance: 100,
            damping: 0.09,
        },
        hierarchicalRepulsion: {
            centralGravity: 0.0,
            springLength: 100,
            springConstant: 0.01,
            nodeDistance: 120,
            damping: 0.09,
            avoidOverlap: 1,
        },
        maxVelocity: 50,
        minVelocity: 0.1,
        solver: "barnesHut",
        stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true,
        },
        timestep: 0.5,
        adaptiveTimestep: true,
        wind: { x: 0, y: 0 },
    },
};

var layout2 = {
    improvedLayout: true,
    hierarchical: {
        enabled: true,
        direction: "LR",
        levelSeparation: 420,
        nodeSpacing: 10,
        treeSpacing: 10,
        blockShifting: true,
        sortMethod: "hubsize",
        parentCentralization: true,
        blockShifting: true,
        edgeMinimization: true,
    },
};

var layout3 = {
    improvedLayout: true,
    hierarchical: {
        enabled: false,
    },
};

var edges1 = {
    length: 40,
    smooth: false,
    chosen: true,
    arrows: {
        to: {
            enabled: false,
            type: "arrow",
        },
    },
    color: {
        color: "black",
        highlight: "orange",
        hover: "#848484",
        inherit: "from",
        opacity: 1.0,
    },
};

var edges2 = {
    length: 40,
    smooth: false,
    chosen: true,
    arrows: {
        to: {
            enabled: true,
            type: "arrow",
        },
    },
    color: {
        color: "black",
        highlight: "orange",
        hover: "#848484",
        inherit: "from",
        opacity: 1.0,
    },
};

var edges3 = {
    smooth: true,
    chosen: true,
    color: {
        color: "black",
        highlight: "orange",
        hover: "#848484",
        inherit: "from",
        opacity: 1.0,
    },
};

var optionsUD = {
    nodes: nodes1,
    autoResize: true,
    layout: layout1,
    edges: edges1,
};

var optionsLRARROW = {
    nodes: nodes1,
    autoResize: true,
    layout: layout2,
    edges: edges2,
};

var optionsLR = {
    nodes: nodes1,
    autoResize: true,
    layout: layout2,
    edges: edges3,
};

var optionsLRnohier = {
    nodes: nodes1,
    autoResize: true,
    layout: layout3,
    edges: edges3,
};

var optionsLRARROWCURVE = {
    nodes: nodes1,
    autoResize: true,
    layout: layout2,
    edges: edges3,
};

function visScript1() {
    // vis11
    var nodes11 = new vis.DataSet([
        {
            id: 1,
            value: 10,
            level: "1",
            label: "Lovgivende\nmagt\nFolketinget",
        },
        { id: 2, value: 10, level: "2", label: "Dømmende\nmagt\nDomstolene" },
        { id: 3, value: 10, level: "2", label: "Udøvende\nmagt\nRegeringen" },
    ]);
    var edges11 = new vis.DataSet([
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 1 },
    ]);
    var container11 = document.getElementById("vis11");
    var data11 = {
        nodes: nodes11,
        edges: edges11,
    };
    var vis11 = new vis.Network(container11, data11, optionsUD);

    //##################### vis12
    var nodes12 = new vis.DataSet([
        { id: 1, font: { size: 20 }, level: "1", label: "Højesteret" },
        { id: 2, font: { size: 18 }, level: "2", label: "Vestre\nLandsret" },
        { id: 3, font: { size: 18 }, level: "2", label: "Østre\nLandsret" },
        { id: 4, font: { size: 18 }, level: "3", label: "Byretterne" },
        {
            id: 5,
            font: { size: 12 },
            level: "4",
            label: "Sø og\nhandelsretten",
        },
        {
            id: 6,
            font: { size: 12 },
            level: "4",
            label: "Grønlands-\ndomstolen",
        },
        { id: 7, font: { size: 12 }, level: "4", label: "Retten på\nFærøerne" },
        {
            id: 8,
            font: { size: 12 },
            level: "1",
            label:
                " Procesbevillingsnævnet \n Den særlige klageret \n Dommerudnævnelsesrådet \n Bibeskæftigelsesnævnet",
        },
    ]);
    var edges12 = new vis.DataSet([
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 4 },
        { from: 2, to: 4 },
        { from: 3, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 5 },
        { from: 2, to: 6 },
        { from: 3, to: 7 },
    ]);
    var container12 = document.getElementById("vis12");
    var data12 = {
        nodes: nodes12,
        edges: edges12,
    };
    var vis12 = new vis.Network(container12, data12, optionsUD);

    //##################### vis13
    var nodes13 = new vis.DataSet([
        {
            id: 1,
            font: { size: 25 },
            level: "1",
            label: "Byrettens afdelinger",
        },
        { id: 2, font: { size: 14 }, level: "2", label: "Civilretten" },
        { id: 3, font: { size: 14 }, level: "2", label: "Fogedretten" },
        { id: 4, font: { size: 14 }, level: "2", label: "Skifteretten" },
        { id: 5, font: { size: 14 }, level: "2", label: "Boligretten" },
        { id: 6, font: { size: 14 }, level: "2", label: "Kriminalretten" },
    ]);
    var edges13 = new vis.DataSet([
        { from: 1, to: 2 },
        { from: 1, to: 6 },
        { from: 1, to: 3 },
        { from: 1, to: 4 },
        { from: 1, to: 5 },
    ]);
    var container13 = document.getElementById("vis13");
    var data13 = {
        nodes: nodes13,
        edges: edges13,
    };
    var vis13 = new vis.Network(container13, data13, optionsUD);
}

function visScript3() {
    //##################### vis31
    var nodes31 = new vis.DataSet([
        { id: 1, value: 10, level: "1", label: "Aftaleloven" },
        {
            id: 2,
            value: 10,
            level: "2",
            label: "Indgåelse af forsikringsaftaler",
        },
        { id: 3, value: 10, level: "2", label: "Indgåelse af kreditaftaler" },
        { id: 4, value: 10, level: "2", label: "Forbrugeraftaler" },
        { id: 5, value: 10, level: "2", label: "Aftaler om pant" },
        { id: 6, value: 10, level: "2", label: "Aftaler om køb" },
        { id: 7, value: 10, level: "2", label: "Aftaler om kautionsformer" },
    ]);
    var edges31 = new vis.DataSet([
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 1, to: 4 },
        { from: 1, to: 5 },
        { from: 1, to: 6 },
        { from: 1, to: 7 },
    ]);

    var container31 = document.getElementById("vis31");
    var data31 = {
        nodes: nodes31,
        edges: edges31,
    };
    var vis31 = new vis.Network(container31, data31, optionsLRARROW);

    //##################### vis32
    var nodes32 = new vis.DataSet([
        {
            id: 1,
            value: 10,
            level: "1",
            label: "Sælger",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            value: 10,
            level: "2",
            label: "Køber",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges32 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "Varer\nYdelser",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 1,
            label: "Penge\nModydelse",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container32 = document.getElementById("vis32");
    var data32 = {
        nodes: nodes32,
        edges: edges32,
    };
    var vis32 = new vis.Network(container32, data32, optionsLRARROWCURVE);

    //##################### vis33
    var nodes33 = new vis.DataSet([
        {
            id: 1,
            value: 10,
            level: "1",
            label: "Testator",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            value: 10,
            level: "2",
            label: "Arving",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges33 = new vis.DataSet([{ from: 1, to: 2, label: "ARV" }]);
    var container33 = document.getElementById("vis33");
    var data33 = {
        nodes: nodes33,
        edges: edges33,
    };
    var vis33 = new vis.Network(container33, data33, optionsLRARROW);

    //##################### vis34
    var nodes34 = new vis.DataSet([
        {
            id: 1,
            value: 10,
            level: "1",
            label: "Sælger\nTilbudsgiver",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            value: 10,
            level: "2",
            label: "Køber\nTilbudsmodtager",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges34 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "1 Sælger sender\ntilbud til køber",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 1,
            label: "2 Køber sender\naccept/ordre",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container34 = document.getElementById("vis34");
    var data34 = {
        nodes: nodes34,
        edges: edges34,
    };
    var vis34 = new vis.Network(container34, data34, optionsLRARROWCURVE);

    //##################### vis35
    var nodes35 = new vis.DataSet([
        {
            id: 1,
            value: 10,
            level: "2",
            label: "Sælger\nTilbudsmodtager",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            value: 10,
            level: "1",
            label: "Køber\nTilbudsgiver",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges35 = new vis.DataSet([
        {
            from: 2,
            to: 1,
            label: "1 Køber sender\nkøbstilbud/ordre",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 2,
            label: "2 Sælger sender\nAccept/ordrebekræftelse",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container35 = document.getElementById("vis35");
    var data35 = {
        nodes: nodes35,
        edges: edges35,
    };
    var vis35 = new vis.Network(container35, data35, optionsLRARROWCURVE);
}

function visScript4() {
    // ####################### vis41
    var nodes41 = new vis.DataSet([
        {
            id: 1,
            font: { size: 40 },
            level: "1",
            label: "Fuldmagtsgiver\nHovedmand",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 40 },
            level: "1",
            label: "Fuldmægtig\nMellemmand",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 40 },
            level: "2",
            label: "Trediemand\nAftalepart",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges41 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            to: 2,
            label: "Fuldmagt",
            smooth: { type: "curvedCW", roundness: -0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 3,
            label: "Aftale indgås",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        { from: 3, to: 1 },
    ]);
    var container41 = document.getElementById("vis41");
    var data41 = {
        nodes: nodes41,
        edges: edges41,
    };
    var vis41 = new vis.Network(container41, data41, optionsLR);
}

function visScript10() {
    // ####################### vis101
    var nodes101 = new vis.DataSet([
        {
            id: 1,
            font: { size: 40 },
            level: "2",
            label: "Bank",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 40 },
            level: "1",
            label: "Kunde",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges101 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            to: 2,
            label: "Renter/Gebyrer\n/Afdrag",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 1,
            label: "Lån",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
    ]);
    var container101 = document.getElementById("vis101");
    var data101 = {
        nodes: nodes101,
        edges: edges101,
    };
    var vis101 = new vis.Network(container101, data101, optionsLR);
    // ####################### vis102
    var nodes102 = new vis.DataSet([
        {
            id: 1,
            font: { size: 40 },
            level: "1",
            label: "Køber",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 40 },
            level: "2",
            label: "Sælger",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges102 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            to: 2,
            label: "Vare/Lån",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 1,
            label: "Omkostninger\nAfdrag",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        { from: 3, to: 1 },
    ]);
    var container102 = document.getElementById("vis102");
    var data102 = {
        nodes: nodes102,
        edges: edges102,
    };
    var vis102 = new vis.Network(container102, data102, optionsLR);

    // ####################### vis103
    var nodes103 = new vis.DataSet([
        {
            id: 1,
            font: { size: 30 },
            level: "1",
            label: "Køber\nLåntager",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 30 },
            level: "2",
            label: "Autoforhandler\nSælger\nKreditformidler",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 30 },
            level: "3",
            label: "Finansieringsselskab\nKreditgiver",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges103 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            to: 2,
            label: "Vare",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            font: { size: 20 },
            to: 3,
            label: "Afdrag\nRenter",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            font: { size: 20 },
            to: 2,
            label: "Købesum",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            font: { size: 20 },
            to: 1,
            label: "Kreditaftale",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container103 = document.getElementById("vis103");
    var data103 = {
        nodes: nodes103,
        edges: edges103,
    };
    var vis103 = new vis.Network(container103, data103, optionsLR);

    // ####################### vis104
    var nodes104 = new vis.DataSet([
        {
            id: 1,
            font: { size: 30 },
            level: "1",
            label: "Sælger\nKreditformidler",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 30 },
            level: "2",
            label: "Køber\nLåntager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 30 },
            level: "3",
            label: "Finansieringsselskab\nKreditgiver\nTrediemand",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges104 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            to: 2,
            label: "2. Vare",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 1,
            label: "3. Købesum",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 3,
            label: "3. Lån",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            font: { size: 20 },
            to: 2,
            label: "4. Omkostninger",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            font: { size: 20 },
            to: 3,
            label: "1. Aftale",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: {
                to: { enabled: true, type: "arrow" },
                from: { enabled: true, type: "arrow" },
            },
        },
    ]);
    var container104 = document.getElementById("vis104");
    var data104 = {
        nodes: nodes104,
        edges: edges104,
    };
    var vis104 = new vis.Network(container104, data104, optionsLR);
    // ####################### vis105
    var nodes105 = new vis.DataSet([
        {
            id: 1,
            font: { size: 30 },
            level: "1",
            label: "Autoforhandler\nKreditformidler",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 30 },
            level: "2",
            label: "Køber\nLåntager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 30 },
            level: "3",
            label: "Finansieringsselskab\nKreditgiver\nTrediemand",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges105 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            to: 2,
            label: "Vare",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 1,
            label: "Låneaftale",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 3,
            label: "Afdrag\nRenter",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            font: { size: 20 },
            to: 3,
            label: "Overdragelse af låneaftale",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            font: { size: 20 },
            to: 3,
            label: "Betaling for overdragelse",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
    ]);
    var container105 = document.getElementById("vis105");
    var data105 = {
        nodes: nodes105,
        edges: edges105,
    };
    var vis105 = new vis.Network(container105, data105, optionsLR);
    // ####################### vis106
    var nodes106 = new vis.DataSet([
        {
            id: 1,
            font: { size: 30 },
            level: "1",
            label: "Sælger",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 30 },
            level: "2",
            label: "Køber\nLåntager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 30 },
            level: "3",
            label: "Bank",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges106 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            to: 2,
            label: "Vare",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 1,
            label: "Købesum",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 3,
            label: "Afdrag\nRenter\nGebyrer",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            font: { size: 20 },
            to: 2,
            label: "Banklån",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container106 = document.getElementById("vis106");
    var data106 = {
        nodes: nodes106,
        edges: edges106,
    };
    var vis106 = new vis.Network(container106, data106, optionsLR);
    // ####################### vis107
    var nodes107 = new vis.DataSet([
        {
            id: 1,
            font: { size: 30 },
            level: "1",
            label: "Sælger",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 30 },
            level: "2",
            label: "Køber",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 30 },
            level: "3",
            label: "Finansierings-\nselskab",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges107 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            to: 2,
            label: "Kreditkøb",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 1,
            label: "Købers\nIndsigelser",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 3,
            label: "Afdrag\nRenter\nGebyrer",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            font: { size: 20 },
            to: 3,
            label: "Salg af købekontrakt",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container107 = document.getElementById("vis107");
    var data107 = {
        nodes: nodes107,
        edges: edges107,
    };
    var vis107 = new vis.Network(container107, data107, optionsLR);
    // ####################### vis108
    var nodes108 = new vis.DataSet([
        {
            id: 1,
            font: { size: 30 },
            level: "1",
            label: "A. Amalie",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 30 },
            level: "2",
            label: "B. Bent",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 30 },
            level: "3",
            label: "C. Cecilie",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges108 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            to: 2,
            label: "Ejendomsforbehold\ntil sælger",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            font: { size: 20 },
            to: 3,
            label: "",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            font: { size: 20 },
            to: 1,
            label: "",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container108 = document.getElementById("vis108");
    var data108 = {
        nodes: nodes108,
        edges: edges108,
    };
    var vis108 = new vis.Network(container108, data108, optionsLR);
}

function visScript11() {
    // ####################### vis111
    var nodes111 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Långiver\nKreditor",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "1",
            label: "Debitor\nLåntager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "2",
            label: "Kautionist",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges111 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            length: 400,
            label: "Lån\nKredit",
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 1,
            label: "Kautionsaftale",
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container111 = document.getElementById("vis111");
    var data111 = {
        nodes: nodes111,
        edges: edges111,
    };
    var vis111 = new vis.Network(container111, data111, optionsUD);

    // ####################### vis112
    var nodes112 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Kautionist\nEneanpartshaver",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Debitor\nApS",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "3",
            label: "Bank",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges112 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            length: 130,
            label: "100% Anparter",
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0.4 },
        },
        {
            from: 2,
            to: 3,
            label: "Lån",
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0.4 },
        },
        {
            from: 3,
            to: 1,
            label: "Kautionsaftale",
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0.4 },
        },
    ]);
    var container112 = document.getElementById("vis112");
    var data112 = {
        nodes: nodes112,
        edges: edges112,
    };
    var vis112 = new vis.Network(container112, data112, optionsLR);

    // ####################### vis113
    var nodes113 = new vis.DataSet([
        {
            id: 1,
            font: { size: 50 },
            level: "1",
            label: "Debitor",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 50 },
            level: "2",
            label: "Kreditor",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 50 },
            level: "3",
            label: "Kautionist 1",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 50 },
            level: "3",
            label: "Kautionist 2",
            color: { border: "green", background: "green" },
        },
        {
            id: 5,
            font: { size: 50 },
            level: "3",
            label: "Kautionist 3",
            color: { border: "green", background: "green" },
        },
        {
            id: 6,
            font: { size: 50 },
            level: "3",
            label: "Kautionist 4",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges113 = new vis.DataSet([
        {
            from: 1,
            length: 150,
            to: 2,
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            length: 130,
            to: 3,
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
        {
            from: 2,
            length: 130,
            to: 4,
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
        {
            from: 2,
            to: 5,
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
        {
            from: 2,
            to: 6,
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
    ]);
    var container113 = document.getElementById("vis113");
    var data113 = {
        nodes: nodes113,
        edges: edges113,
    };
    var vis113 = new vis.Network(container113, data113, optionsLR);

    // ####################### vis114
    var nodes114 = new vis.DataSet([
        {
            id: 1,
            font: { size: 30 },
            level: "1",
            label: "Debitor",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 30 },
            level: "2",
            label: "Kreditor",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 30 },
            level: "3",
            label: "Kautionist 1 50%",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 30 },
            level: "3",
            label: "Kautionist 2 25%",
            color: { border: "green", background: "green" },
        },
        {
            id: 5,
            font: { size: 30 },
            level: "3",
            label: "Kautionist 3 25%",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges114 = new vis.DataSet([
        {
            from: 1,
            font: { size: 20 },
            label: "            Lån 1 mio",
            to: 2,
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            length: 100,
            font: { size: 20 },
            label: "Hæftelse 500.000",
            to: 3,
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
        {
            from: 2,
            to: 4,
            font: { size: 20 },
            label: "Hæftelse 250.000",
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
        {
            from: 2,
            to: 5,
            font: { size: 20 },
            label: "Hæftelse 250.000",
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
    ]);
    var container114 = document.getElementById("vis114");
    var data114 = {
        nodes: nodes114,
        edges: edges114,
    };
    var vis114 = new vis.Network(container114, data114, optionsLR);

    // ####################### vis115
    var nodes115 = new vis.DataSet([
        {
            id: 1,
            font: { size: 50 },
            level: "1",
            label: "Debitor",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 50 },
            level: "2",
            label: "Kreditor",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 50 },
            level: "3",
            label: "Kautionist 1",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 50 },
            level: "3",
            label: "Kautionist 2",
            color: { border: "green", background: "green" },
        },
        {
            id: 5,
            font: { size: 50 },
            level: "3",
            label: "Kautionist 3",
            color: { border: "green", background: "green" },
        },
        {
            id: 6,
            font: { size: 50 },
            level: "3",
            label: "Kautionist 4",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges115 = new vis.DataSet([
        {
            from: 1,
            length: 150,
            to: 2,
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            length: 130,
            to: 3,
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
        {
            from: 2,
            length: 130,
            to: 4,
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
        {
            from: 2,
            to: 5,
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
        {
            from: 2,
            to: 6,
            arrows: { from: { enabled: true, type: "arrow" } },
            smooth: { type: "curvedCW", roundness: 0 },
        },
    ]);
    var container115 = document.getElementById("vis115");
    var data115 = {
        nodes: nodes115,
        edges: edges115,
    };
    var vis115 = new vis.Network(container115, data115, optionsLR);

    // ####################### vis116

    var nodes116 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Efterkautionist\nÆgtefælle",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "1",
            label: "Kreditor",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "2",
            label: "Debitor\nBank",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "2",
            label: "Hovedkautionist\nEneanpartshaver",
            color: { border: "Black", background: "Black" },
        },
    ]);
    var edges116 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            length: 250,
            label: "Hæftelse 2",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label: "Lån",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 4,
            to: 2,
            label: "Hæftelse 1",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container116 = document.getElementById("vis116");
    var data116 = {
        nodes: nodes116,
        edges: edges116,
    };
    var vis116 = new vis.Network(container116, data116, optionsLR);

    // ####################### vis117
    var nodes117 = new vis.DataSet([
        {
            id: 1,
            font: { size: 30 },
            level: "1",
            label: "1. Kreditor har krav på låntageren",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 30 },
            level: "2",
            label: "2. Låntager misligholder lånet",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 30 },
            level: "3",
            label: "3. Kreditor kræver kautionen indfriet",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 30 },
            level: "4",
            label: "4. Kautionisten betaler kreditor",
            color: { border: "green", background: "green" },
        },
        {
            id: 5,
            font: { size: 30 },
            level: "5",
            label: "5. Kautionisten har et regreskrav på låntageren",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges117 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            font: { size: 30 },
            label: "+",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            font: { size: 30 },
            label: "+",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            font: { size: 30 },
            label: "+",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 4,
            to: 5,
            font: { size: 30 },
            label: "=",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container117 = document.getElementById("vis117");
    var data117 = {
        nodes: nodes117,
        edges: edges117,
    };
    var vis117 = new vis.Network(container117, data117, optionsUD);

    // ####################### vis118
    var nodes118 = new vis.DataSet([
        {
            id: 1,
            font: { size: 30 },
            level: "1",
            label: "Kautionisten",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 30 },
            level: "2",
            label: "Bank",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 30 },
            level: "3",
            label: "Pantsætter",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 30 },
            level: "3",
            label: "Låntager\nSelskab",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges118 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            font: { size: 20 },
            label: "Kaution",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            font: { size: 20 },
            label: "Lån",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 4,
            font: { size: 20 },
            label: "Pant",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
    ]);
    var container118 = document.getElementById("vis118");
    var data118 = {
        nodes: nodes118,
        edges: edges118,
    };
    var vis118 = new vis.Network(container118, data118, optionsUD);

    // ####################### vis119
    var nodes119 = new vis.DataSet([
        {
            id: 1,
            font: { size: 40 },
            level: "1",
            label: "Garant\nBank",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 40 },
            level: "2",
            label: "Garantirekvirent\nKøber",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 40 },
            level: "2",
            label: "Beneficiant\nSælger",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges119 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "Lån til købesum",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            length: 105,
            label: "Købsaftale",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            label: "Garanti for købesum",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container119 = document.getElementById("vis119");
    var data119 = {
        nodes: nodes119,
        edges: edges119,
    };
    var vis119 = new vis.Network(container119, data119, optionsLR);
}

function visScript12() {
    // ####################### vis121
    var nodes121 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Skyldner\nKunde",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Kreditor\nBank",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges121 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "Lån",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 1,
            label: "Afdrag\nRenter",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
    ]);
    var container121 = document.getElementById("vis121");
    var data121 = {
        nodes: nodes121,
        edges: edges121,
    };
    var vis121 = new vis.Network(container121, data121, optionsLRARROWCURVE);

    // ####################### vis122
    var nodes122 = new vis.DataSet([
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Udbyder\nKøbers Bank",
            color: { border: "red", background: "red" },
        },
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Betaler",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "3",
            label: "Udbyder\nSælgers Bank",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "4",
            label: "Betalingsmodtager\nSælger Cafe",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges122 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            smooth: { type: "curvedCW", roundness: 0.4 },
            label: "Nets",
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container122 = document.getElementById("vis122");
    var data122 = {
        nodes: nodes122,
        edges: edges122,
    };
    var vis122 = new vis.Network(container122, data122, optionsLR);

    // ####################### vis123
    var nodes123 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label:
                "Gældsbrev\nEr det underskrevet?\nEnsidig ubetinget skyldnererklæring",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 15 },
            level: "2",
            label: "Pantebrev?\nGælden er sikret\nved pant i et aktiv",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 15 },
            level: "2",
            label: "Simpel\nfordring",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 9 },
            level: "3",
            label:
                "Omsætningsgældsbrev\nEn af de 4 kategorier\nfra GBL §11 stk. 2",
            color: { border: "purple", background: "purple" },
        },
        {
            id: 5,
            font: { size: 9 },
            level: "3",
            label:
                "Simpelt gældsbrev\nIkke en af de 4 kategorier\nfra GBL §11 stk. 2",
            color: { border: "purple", background: "purple" },
        },
        {
            id: 6,
            font: { size: 9 },
            level: "3",
            label: "Simpelt pantebrev\nPant i andet end\nfast ejendom",
            color: { border: "purple", background: "purple" },
        },
        {
            id: 7,
            font: { size: 9 },
            level: "3",
            label: "Negotiabelt pantebrev\nPant i andet end\nfast ejendom",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges123 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "Ja",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            label: "Nej",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        { from: 2, to: 4, label: "Nej" },
        { from: 2, to: 5, label: "Nej" },
        { from: 2, to: 6, label: "Ja" },
        { from: 2, to: 7, label: "Ja" },
    ]);
    var container123 = document.getElementById("vis123");
    var data123 = {
        nodes: nodes123,
        edges: edges123,
    };
    var vis123 = new vis.Network(container123, data123, optionsUD);

    // ####################### vis124
    var nodes124 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "A",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "B",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "2",
            label: "C",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges124 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container124 = document.getElementById("vis124");
    var data124 = {
        nodes: nodes124,
        edges: edges124,
    };
    var vis124 = new vis.Network(container124, data124, optionsUD);

    // ####################### vis125
    var nodes125 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Kreditor\nOverdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "3",
            label: "Erhverver",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "4",
            label: "Erhverver",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges125 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "Kreditor har en fordring på debitor",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label: "Kreditor overdrager til ervherver 1",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            label: "Erhverver 1 overdrager til erhverver 2",
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container125 = document.getElementById("vis125");
    var data125 = {
        nodes: nodes125,
        edges: edges125,
    };
    var vis125 = new vis.Network(container125, data125, optionsUD);

    // ####################### vis126
    var nodes126 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Kreditor\nSælger",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges126 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "Debitor har en indsigelse\noverfor kreditor",
            smooth: { type: "curvedCW", roundness: 0.3 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container126 = document.getElementById("vis126");
    var data126 = {
        nodes: nodes126,
        edges: edges126,
    };
    var vis126 = new vis.Network(container126, data126, optionsLR);

    // ####################### vis127
    var nodes127 = new vis.DataSet([
        {
            id: 1,
            font: { size: 15 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 15 },
            level: "2",
            label: "Kreditor\nOverdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 15 },
            level: "2",
            label: "Erhverver",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges127 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            font: { size: 10 },
            label: "1 Kreditor har\nen fordring på debitor",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            font: { size: 10 },
            label: "3 Debitor skal nu\nbetale erhververen",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            font: { size: 10 },
            label: "2 Kreditor overdrager\nen fordring til erhververen",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container127 = document.getElementById("vis127");
    var data127 = {
        nodes: nodes127,
        edges: edges127,
    };
    var vis127 = new vis.Network(container127, data127, optionsUD);

    // ####################### vis128
    var nodes128 = new vis.DataSet([
        {
            id: 1,
            font: { size: 15 },
            level: "1",
            label: "Bilkøber\nDebitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 15 },
            level: "2",
            label: "Bilsælger\nKreditor\nOverdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 15 },
            level: "2",
            label: "Finansierings-\nselskab",
            color: { border: "blue", background: "blue" },
        },
    ]);
    var edges128 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            font: { size: 10 },
            label: "1 Bilsalg\npå købekontrakt",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            font: { size: 10 },
            label: "3 Debitor skal\nnu betale til\nfinansieringsselskabet",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            font: { size: 10 },
            label:
                "2 Bilsælger\nsælger\nkøbekontrakt\ntil finansieringsselskab",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container128 = document.getElementById("vis128");
    var data128 = {
        nodes: nodes128,
        edges: edges128,
    };
    var vis128 = new vis.Network(container128, data128, optionsUD);

    // ####################### vis129
    var nodes129 = new vis.DataSet([
        {
            id: 1,
            font: { size: 12 },
            level: "1",
            label: "Rederi\nDebitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 12 },
            level: "2",
            label: "Skibsværft\nKreditor\nOverdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 12 },
            level: "2",
            label: "Bank",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges129 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            font: { size: 10 },
            label: "1 Skibsværft sælger\nskib og udsteder\nfaktura",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            font: { size: 10 },
            label: "2 Skibsværft\noverdrager\nfakturaen på\nskibet til banken",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 1,
            font: { size: 10 },
            label: "3 Rederiet \nskal nu betale\ntil banken",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container129 = document.getElementById("vis129");
    var data129 = {
        nodes: nodes129,
        edges: edges129,
    };
    var vis129 = new vis.Network(container129, data129, optionsUD);

    // ####################### vis1210
    var nodes1210 = new vis.DataSet([
        {
            id: 1,
            font: { size: 10 },
            level: "1",
            label: "Virksomhed\nsælger varer",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 10 },
            level: "1",
            label: "Factoringselskab\nerhverver fordring\nog modtager betaling",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 10 },
            level: "2",
            label: "Debitor\nkøber varer\naf virksomhed",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 10 },
            level: "2",
            label: "Debitor\nkøber varer\naf virksomhed",
            color: { border: "green", background: "green" },
        },
        {
            id: 5,
            font: { size: 10 },
            level: "2",
            label: "Debitor\nkøber varer\naf virksomhed",
            color: { border: "green", background: "green" },
        },
        {
            id: 6,
            font: { size: 10 },
            level: "2",
            label: "Debitor\nkøber varer\naf virksomhed",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges1210 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            x: 1,
            y: 5,
            font: { size: 10 },
            label:
                "2 Overdragelse\naf fordring\nfrigiver likviditet\ntil virksomheden",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { from: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            font: { size: 10 },
            label: "1 Varesalg",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 4,
            font: { size: 10 },
            label: "1 Varesalg",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 5,
            font: { size: 10 },
            label: "1 Varesalg",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 6,
            font: { size: 10 },
            label: "1 Varesalg",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 2,
            font: { size: 10 },
            label: "\n\n3 Betaling",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 4,
            to: 2,
            font: { size: 10 },
            label: "\n\n3 Betaling",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 5,
            to: 2,
            font: { size: 10 },
            label: "\n\n3 Betaling",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 6,
            to: 2,
            font: { size: 10 },
            label: "\n\n3 Betaling",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1210 = document.getElementById("vis1210");
    var data1210 = {
        nodes: nodes1210,
        edges: edges1210,
    };
    var vis1210 = new vis.Network(container1210, data1210, optionsLR);

    // ####################### vis1211
    var nodes1211 = new vis.DataSet([
        {
            id: 2,
            font: { size: 20 },
            level: "1",
            label: "Kreditor\nOverdrageren",
            color: { border: "red", background: "red" },
        },
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Debitor\nSkyldneren",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "2",
            label: "Erhverver\nNy kreditor",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges1211 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "Kreditor har\nfortsat krav",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label:
                "Stærk ugyldighedsgrund\nOverdrager har fortsat\net betalingskrav\nmod skyldneren",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1211 = document.getElementById("vis1211");
    var data1211 = {
        nodes: nodes1211,
        edges: edges1211,
    };
    var vis1211 = new vis.Network(container1211, data1211, optionsLR);

    // ####################### vis1212
    var nodes1212 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Kreditor\nOverdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "2",
            label: "Erhverver 1",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "2",
            label: "Erhverver 2",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1212 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "GBL §1",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            label: "GBL §27",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 4,
            label: "GBL §27",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label: "Fordring\noverdrages",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            label: "Fordring\noverdrages",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1212 = document.getElementById("vis1212");
    var data1212 = {
        nodes: nodes1212,
        edges: edges1212,
    };
    var vis1212 = new vis.Network(container1212, data1212, optionsLR);

    // ####################### vis1213
    var nodes1213 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Kreditor\nOverdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "3",
            label: "Erhverver\nNy kreditor",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "4",
            label: "Erhverver\nSeneste kreditor",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1213 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label: "GBL §27",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            label: "GBL §27",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1213 = document.getElementById("vis1213");
    var data1213 = {
        nodes: nodes1213,
        edges: edges1213,
    };
    var vis1213 = new vis.Network(container1213, data1213, optionsLR);

    // ####################### vis1214
    var nodes1214 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Ali",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Bo",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "3",
            label: "Carl",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "3",
            label: "Eva",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1214 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 4,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1214 = document.getElementById("vis1214");
    var data1214 = {
        nodes: nodes1214,
        edges: edges1214,
    };
    var vis1214 = new vis.Network(container1214, data1214, optionsUD);

    // ####################### vis1215
    var nodes1215 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Debitor skyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Kreditor\nOverdrager\nDobbeltoverdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "3",
            label: "Erhverver\nKreditor",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "3",
            label: "Erhverver\nKreditor",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1215 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label: "GBL §31",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 4,
            label: "GBL §31",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1215 = document.getElementById("vis1215");
    var data1215 = {
        nodes: nodes1215,
        edges: edges1215,
    };
    var vis1215 = new vis.Network(container1215, data1215, optionsUD);

    // ####################### vis1216
    var nodes1216 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Anne",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Bonnie",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "2",
            label: "Carla",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges1216 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "Sælger elcykel\n til Bonnie",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            label: "Sælger bagefter\ncykel til Carla",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1216 = document.getElementById("vis1216");
    var data1216 = {
        nodes: nodes1216,
        edges: edges1216,
    };
    var vis1216 = new vis.Network(container1216, data1216, optionsUD);

    // ####################### vis1217
    var nodes1217 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Anne\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Bonnie\nBilsælger",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "2",
            label: "Finansierings-\nselskab\nErhverver 1",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "2",
            label: "Seneste kreditor\nErhverver 2",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges1217 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "GBL §1",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            label: "GBL §15-17",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 4,
            label: "GBL §15-17",
            smooth: { type: "curvedCW", roundness: -0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label: "Overdrager",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            label: "Overdrager",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1217 = document.getElementById("vis1217");
    var data1217 = {
        nodes: nodes1217,
        edges: edges1217,
    };
    var vis1217 = new vis.Network(container1217, data1217, optionsLR);

    // ####################### vis1218
    var nodes1218 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Kreditor\nOverdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "2",
            label: "Kreditor\nErhverver 1",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "2",
            label: "Seneste kreditor\nErhverver 2",
            color: { border: "green", background: "green" },
        },
    ]);
    var edges1218 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            label: "GBL §1",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 3,
            label: "GBL §15-17",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 1,
            to: 4,
            label: "GBL §15-17",
            smooth: { type: "curvedCW", roundness: -0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label: "Overdrager",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            label: "Overdrager",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1218 = document.getElementById("vis1218");
    var data1218 = {
        nodes: nodes1218,
        edges: edges1218,
    };
    var vis1218 = new vis.Network(container1218, data1218, optionsLR);

    // ####################### vis1219
    var nodes1219 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Kreditor\nOverdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "3",
            label: "1. Erhverver\nKreditor",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "4",
            label: "2. Erhverver\nSeneste kreditor",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1219 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label: "GBL §14",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            label: "GBL §14",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1219 = document.getElementById("vis1219");
    var data1219 = {
        nodes: nodes1219,
        edges: edges1219,
    };
    var vis1219 = new vis.Network(container1219, data1219, optionsLR);

    // ####################### vis1220
    var nodes1220 = new vis.DataSet([
        {
            id: 1,
            font: { size: 40 },
            level: "1",
            label: "Fuldmagtsgiver\nHovedmand",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 40 },
            level: "2",
            label: "Fuldmægtig\nMellemmand",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 40 },
            level: "3",
            label: "Trediemand\nAftalepart",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 40 },
            level: "3",
            label: "Seneste kreditor\nErhverver 2",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1220 = new vis.DataSet([
        {
            from: 2,
            to: 3,
            font: { size: 30 },
            label: "GBL §22",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 4,
            font: { size: 30 },
            label: "GBL §22",
            smooth: { type: "curvedCW", roundness: 0.2 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        { from: 1, to: 2 },
    ]);
    var container1220 = document.getElementById("vis1220");
    var data1220 = {
        nodes: nodes1220,
        edges: edges1220,
    };
    var vis1220 = new vis.Network(container1220, data1220, optionsLR);

    // ####################### vis1221
    var nodes1221 = new vis.DataSet([
        {
            id: 1,
            font: { size: 40 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 40 },
            level: "2",
            label: "Overdrager\nved salg",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 40 },
            level: "3",
            label: "1. Kreditor",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 40 },
            level: "3",
            label: "2. Kreditor",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1221 = new vis.DataSet([
        {
            from: 2,
            to: 3,
            font: { size: 30 },
            label: "HR: I hænde/\ngod tro GBL §14",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 4,
            font: { size: 30 },
            label: "Senere Kreditor",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        { from: 1, to: 2 },
    ]);
    var container1221 = document.getElementById("vis1221");
    var data1221 = {
        nodes: nodes1221,
        edges: edges1221,
    };
    var vis1221 = new vis.Network(container1221, data1221, optionsLR);

    // ####################### vis1222
    var nodes1222 = new vis.DataSet([
        {
            id: 1,
            font: { size: 40 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 40 },
            level: "2",
            label: "Overdrager\nPantsætter",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 40 },
            level: "3",
            label: "Panthaver",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 40 },
            level: "3",
            label: "Kreditor",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1222 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            font: { size: 20 },
            smooth: { type: "curvedCW", roundness: 0 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            font: { size: 20 },
            label: "GBL §22",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 4,
            font: { size: 20 },
            label:
                "Panthavers beskyttelse mod\npantsætters kreditorer er\nreguleret i GBL §22",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1222 = document.getElementById("vis1222");
    var data1222 = {
        nodes: nodes1222,
        edges: edges1222,
    };
    var vis1222 = new vis.Network(container1222, data1222, optionsLR);

    // ####################### vis1223
    var nodes1223 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Skyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Overdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "3",
            label: "Erhverver 1",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "4",
            label: "Erhverver 2",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1223 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label:
                "Overdragers indsigelse\noverfor senere erhverver 2\nreguleres af GBL §27",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            label:
                "Overdragers indsigelse\noverfor senere erhverver 2\nreguleres af GBL §27",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1223 = document.getElementById("vis1223");
    var data1223 = {
        nodes: nodes1223,
        edges: edges1223,
    };
    var vis1223 = new vis.Network(container1223, data1223, optionsLR);

    // ####################### vis1224
    var nodes1224 = new vis.DataSet([
        {
            id: 1,
            font: { size: 40 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 40 },
            level: "2",
            label: "Overdrager\nPantsætter",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 40 },
            level: "3",
            label: "1. Rettighedshaver",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 40 },
            level: "3",
            label: "2. Rettighedshaver",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1224 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            smooth: { type: "curvedCW", roundness: 0 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            font: { size: 20 },
            label:
                "Panthaver skal tinglyse\nsin ret for at sikre sig mod\ndobbeltoverdragelse jf. TL §1",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 4,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1224 = document.getElementById("vis1224");
    var data1224 = {
        nodes: nodes1224,
        edges: edges1224,
    };
    var vis1224 = new vis.Network(container1224, data1224, optionsLR);

    // ####################### vis1225
    var nodes1225 = new vis.DataSet([
        {
            id: 1,
            font: { size: 20 },
            level: "1",
            label: "Debitor\nSkyldner",
            color: { border: "red", background: "red" },
        },
        {
            id: 2,
            font: { size: 20 },
            level: "2",
            label: "Overdrager",
            color: { border: "blue", background: "blue" },
        },
        {
            id: 3,
            font: { size: 20 },
            level: "3",
            label: "Erhverver 1\nNy kreditor",
            color: { border: "green", background: "green" },
        },
        {
            id: 4,
            font: { size: 20 },
            level: "4",
            label: "Erhverver 2\nSeneste kreditor",
            color: { border: "purple", background: "purple" },
        },
    ]);
    var edges1225 = new vis.DataSet([
        {
            from: 1,
            to: 2,
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 2,
            to: 3,
            label: "TL §27b",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
        {
            from: 3,
            to: 4,
            label: "TL §27b",
            smooth: { type: "curvedCW", roundness: 0.4 },
            arrows: { to: { enabled: true, type: "arrow" } },
        },
    ]);
    var container1225 = document.getElementById("vis1225");
    var data1225 = {
        nodes: nodes1225,
        edges: edges1225,
    };
    var vis1225 = new vis.Network(container1225, data1225, optionsLR);
}

function visTimelineScript() {
    var container = document.getElementById("visualization");
    var container2 = document.getElementById("visualization2");
    var items = new vis.DataSet([
        { id: 1, content: "item 1", start: "2014-04-20" },
        { id: 2, content: "item 2", start: "2014-04-14" },
        { id: 3, content: "item 3", start: "2014-04-18" },
        { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
        { id: 5, content: "item 5", start: "2014-04-25" },
        { id: 6, content: "item 6", start: "2014-04-27", type: "point" },
    ]);
    var items2 = new vis.DataSet([
        { id: 1, content: "item 1", start: "2014-04-20" },
        { id: 2, content: "item 2", start: "2014-04-14" },
        { id: 3, content: "item 3", start: "2014-04-18" },
        { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
        { id: 5, content: "item 5", start: "2014-04-25" },
        { id: 6, content: "item 6", start: "2014-04-27", type: "point" },
    ]);
    var options = {};
    var timeline = new vis.Timeline(container, items, options);
    var timeline2 = new vis.Timeline(container2, items2, options);
}

export default visJS;
