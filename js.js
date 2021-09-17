const rows = 10;
const columns = 4;

const buildSits = () => {

    //get table
    let table = document.getElementsByClassName("flat__bus")[0];

    //get sit
    let sit = document.getElementsByTagName("template")[0].content;

    //get row
    let rowFlat = document.getElementsByTagName("template")[1].content;

    for (let index_row = 0; index_row < rows; index_row++) {
        //clone a row    
        
        rowFlat.querySelector('tr').id= 'row_'+index_row
        let cloneRow = document.importNode(rowFlat, true);
        //append row in a table
        table.appendChild(cloneRow)
        //get new row created
        var _row =  document.getElementById('row_'+index_row)
        for (let index_column = 0; index_column < columns; index_column++) {
            // clone a sit
            sit.querySelector('td').querySelector('label').textContent = (index_row + 1)*(index_column+1)
            sit.querySelector('td').id= 'row_'+index_row + '_sit_'+ index_column
            let cloneSit = document.importNode(sit, true); 

            //append a sit in row
            _row.appendChild(cloneSit);
        }
    }
};

buildSits();
