const rows = 7;
const columns = 4;
let data = [
    {
        asiento: 0,
        tipoAsiento: "PJ",
        filax: 0,
        columnay: 1,
        asiProblema: 0,
        precio: 45,
        Puntos: 440,
    },
];
const othersA = [8, 12];
const othersB = [3, 7, 15, 23];
const othersC = [11, 19, 27, 31];
const bussies = [1, 4, 5, 6, 7, 8, 12, 14, 15];
const buildData = () => {
    var chair = 0;
    data = [];
    for (let index_row = 0; index_row < rows; index_row++) {
        for (let index_col = 0; index_col < columns; index_col++) {
            var ind = index_row * columns + (index_col + 1);

            var isHereA = othersA.filter((value) => value === ind).length > 0;
            var isHereB = othersB.filter((value) => value === ind).length > 0;
            var isHereC = othersC.filter((value) => value === ind).length > 0;
            if (!isHereA && !isHereB && !isHereC) {
                chair++;
                data.push({
                    asiento: chair,
                    tipoAsiento: "PJ",
                    filax: index_row,
                    columnay: index_col,
                    asiProblema: 0,
                    precio: 45,
                    Puntos: 440,
                });
            }
            if (isHereA && !isHereB && !isHereC) {
                data.push({
                    asiento: 0,
                    tipoAsiento: "ES",
                    filax: index_row,
                    columnay: index_col,
                    asiProblema: 0,
                    precio: 0,
                    Puntos: 0,
                });
            }
            if (!isHereA && isHereB && !isHereC) {
                data.push({
                    asiento: 0,
                    tipoAsiento: "TV",
                    filax: index_row,
                    columnay: index_col,
                    asiProblema: 0,
                    precio: 0,
                    Puntos: 0,
                });
            }
            if (!isHereA && !isHereB && isHereC) {
                data.push({
                    asiento: 0,
                    tipoAsiento: "PA",
                    filax: index_row,
                    columnay: index_col,
                    asiProblema: 0,
                    precio: 0,
                    Puntos: 0,
                });
            }
        }
    }
};
const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
const buildSits = () => {
    buildData();
    //   console.log(data);
    //get table
    let table = document.getElementsByClassName("flat__bus")[0];

    //get sit
    let sit = document.getElementsByTagName("template")[0].content;

    //get lader
    let lader = document.getElementsByTagName("template")[2].content;

    //get tv
    let tv = document.getElementsByTagName("template")[3].content;
    //get tv
    let pass = document.getElementsByTagName("template")[4].content;
    //get row
    let rowFlat = document.getElementsByTagName("template")[1].content;

    var dataGroup = groupBy(data, "filax");
    Object.entries(dataGroup).forEach((value, index_row) => {
        rowFlat.querySelector("tr").id = "row_" + index_row;
        let cloneRow = document.importNode(rowFlat, true);
        //append row in a table
        table.appendChild(cloneRow);
        //get new row created
        var _row = document.getElementById("row_" + index_row);
        value[1].forEach((value, index_column) => {
            if (value.tipoAsiento === "ES") {
                lader.querySelector("td").id =
                    "row_" + index_row + "_lader_" + index_column;
                // clone a lader
                let clonelader = document.importNode(lader, true);
                //append a lader in row
                _row.appendChild(clonelader);
            }
            if (value.tipoAsiento === "PJ") {
                var isBussy =
                    bussies.filter((_value) => _value === value.asiento).length > 0;
                var td = sit.querySelector("td");
                td.querySelector("label").textContent = value.asiento;

                td.id = "row_" + index_row + "_sit_" + index_column;

                td.className = " flat__bus--sit chair-img "
                td.className += isBussy
                    ? " bussy-pj "
                    : " ";
                // clone a sit
                let cloneSit = document.importNode(sit, true);
                //append a sit in row
                _row.appendChild(cloneSit);
            }
            if (value.tipoAsiento === "TV") {
                tv.querySelector("td").id = "row_" + index_row + "_tv_" + index_column;
                // clone a tv
                let clonetv = document.importNode(tv, true);
                //append a tv in row
                _row.appendChild(clonetv);
            }
            if (value.tipoAsiento === "PA") {
                pass.querySelector("td").id =
                    "row_" + index_row + "_pa_" + index_column;
                // clone a pass
                let clonepass = document.importNode(pass, true);
                //append a pass in row
                _row.appendChild(clonepass);
            }
        });
    });

    return;
};
const changeState = (element) => {
    var _class = element.className;
    if (_class.match("bussy-pj")) 
        return
    
    var isHere = _class.match("selected-chair");
    element.className = "flat__bus--sit chair-img";
    element.className += (isHere)?"": " selected-chair";
};
buildSits();

//   for (let index_row = 0; index_row < rows; index_row++) {
//     //clone a row

//     rowFlat.querySelector("tr").id = "row_" + index_row;
//     let cloneRow = document.importNode(rowFlat, true);
//     //append row in a table
//     table.appendChild(cloneRow);
//     //get new row created
//     var _row = document.getElementById("row_" + index_row);
//     for (let index_column = 0; index_column < columns; index_column++) {
//       sit.querySelector("td").querySelector("label").textContent =
//         index_row * 5 + (index_column + 1);
//       sit.querySelector("td").id = "row_" + index_row + "_sit_" + index_column;
//       // clone a sit
//       let cloneSit = document.importNode(sit, true);
//       //append a sit in row
//       _row.appendChild(cloneSit);
//     }
//   }
