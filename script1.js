
/**
 * Created by shyam_000 on 7/28/2016.
 */
// read the html
// parse the html
// store the parsed html into an object array
// destpage grab the body element
// follow the parsed dom object and create square div tags
// div tags have classes associated to it with css to give color and hover color functionality
// div tags onclick should have the secondary lists populate and add color accordingly to the div.
// this is gonna be fucking hard.


/*
    7 hours
*/

var fileName = "sourceDOM.html";
var data = "",DOMobjArray = [],keys = [],LEVEL1_GENERATED = false,LEVEL2_GENERATED = false,
    Name = 0,Position = 1,Office = 2, Start_date = 4,Salary = 5,
    Age=3;

//8//
function fn8_addFourthLevelDivs(row,objRow,i) {
    var fieldSet3 = document.createElement("div");
    fieldSet3.setAttribute("id","fs3_"+i);
    fieldSet3.setAttribute("class","bglvlFour hoverlvlFour pad0 display_none")

    var htm = "DOJ :" + objRow[i][keys[Start_date]];
    fieldSet3.innerHTML = htm;
    
    fieldSet3.onclick = function (e) {
        alert("E.N.D");
    }
    
    row.appendChild(fieldSet3);
}

//7// too tired now to type comments 7 hours straight coding javascript. target. sleep at 7.
function fn7_addThirdLevelDivs(row,objRow,i) {

    //console.log(row + " " + objRow +  " " + i);
    var fieldSet2 = document.createElement("div");
    fieldSet2.setAttribute("id","fs2_"+i);
    fieldSet2.setAttribute("class","bglvlThree hoverlvlThree pad0 display_none")

    var htm = "earns $" + objRow[i][keys[Salary]] + " a year and is only : " + objRow[i][keys[Age]] + " years old.";
    fieldSet2.innerHTML = htm;

    (function () { fn8_addFourthLevelDivs(row,objRow,i)})();

    fieldSet2.onclick = function (e) {
        var id = e.target.getAttribute("id");
        var k = id.split("_")[1];
        var elem = document.getElementById("fs3_"+k);
        if (elem.style.display == '')
        {
            elem.style.display = "inline-block"
        }
        else if(elem.style.display != "none")
        {
            elem.style.display = "none";
        }
        else
        {
            elem.style.display = "inline-block"
        }
    }

    row.insertBefore(fieldSet2,row.childNodes[0]);
}
//6//  understood how this works thanks to : http://javascriptissexy.com/understand-javascript-closures-with-ease/
function fn6_addSecondLevelDivs(row,objRow,i)
{
    //console.log(row + " " + objRow +  " " + i);
    var fieldSet1 = document.createElement("div");
    fieldSet1.setAttribute("id","fs1_"+i);
    fieldSet1.setAttribute("class","bglvlTwo hoverlvlTwo pad0 display_none")

    var htm = "works as a " + objRow[i][keys[Position]] + " at the Office : " + objRow[i][keys[Office]] + " ";
    fieldSet1.innerHTML = htm;

    (function(){fn7_addThirdLevelDivs(row,objRow,i)})();

    fieldSet1.onclick = function (e) {
        var id = e.target.getAttribute("id");
        var k = id.split("_")[1];
        var elem = document.getElementById("fs2_"+k);
        if (elem.style.display == '')
        {
            elem.style.display = "inline-block"
        }
        else if(elem.style.display != "none")
        {
            elem.style.display = "none";
        }
        else
        {
            elem.style.display = "inline-block"
        }
    }
    row.insertBefore(fieldSet1,row.childNodes[0]);
}

//5// follow the parsed dom object and create square div tags
function fn5_createSquareDivTagsForEachRow(rootElem,d) {
    LEVEL1_GENERATED = true;
    var parentElement = rootElem.parentNode;
    var div2 = document.createElement("div");
    div2.setAttribute("id","div2id");
    div2.setAttribute("class","margin0 display_inlineBlock");
    parentElement.appendChild(div2);

    for(var i = 0; i < d.length; i++)
    {
        if(d[i][keys[Name]] != undefined) {
            var row = document.createElement("div"), elem1 = document.createElement("div");
            elem1.setAttribute("id", String(i));
            elem1.setAttribute("class", "bglvlOne hoverlvlOne pad0 display_inline")
            elem1.innerHTML = d[i][keys[Name]];

            (function () {
                fn6_addSecondLevelDivs(row,d,i);
            })();

            elem1.onclick = function(e) {
                var k = e.target.getAttribute("id");
                var elem = document.getElementById("fs1_"+k);
                if (elem.style.display == '')
                {
                    elem.style.display = "inline-block"
                }
                else if(elem.style.display != "none")
                    {
                        elem.style.display = "none";
                    }
                    else
                    {
                        elem.style.display = "inline-block"
                    }
            };
            row.insertBefore(elem1,row.childNodes[0]);
            row.setAttribute("class", "pad0 display_block")
            div2.appendChild(row);
        }
    }
}

//4// destpage grab body element
//http://www.w3schools.com/jsref/dom_obj_body.asp
//http://stackoverflow.com/questions/4851699/setting-the-id-attribute-of-an-input-element-dynamically-in-ie-alternative-for
function fn4_grabDestPageBodyElement(d) {
    var x = document.getElementsByTagName("body")[0];
    var rootElem = document.createElement("div")
        rootElem.setAttribute("id","root");
        rootElem.setAttribute("class","");
    var div0 = document.createElement("div");
        div0.setAttribute("class","square default hover_basic");
    div0.onclick = function () {
        //console.log("clicked");
        if(!LEVEL1_GENERATED) {
            fn5_createSquareDivTagsForEachRow(rootElem, d);
            console.log(" STEP 5 : COMPLETED ");
        }else
        {
            var elem = document.getElementById("div2id");
            if(elem.style.display != "none") {
                elem.style.display = "none";
            }
            else
            {
                elem.style.display = "inline-block";
            }
        }
    }
    rootElem.appendChild(div0);
    x.appendChild(rootElem);
    console.log(" STEP 4 : COMPLETED ");
}

//3// store the parsed html into an object array
//http://stackoverflow.com/questions/14929819/why-is-there-no-foreach-method-on-object-in-ecmascript-5
function fn3_NowThatHTMLisStoredInAnObjectArrayDisplayIt(d) {
    console.log(" STEP 3 : COMPLETED ");
    // console.log(d.length);
    // for(var i = 0; i < d.length; i++)
    // {
    //     var obj = d[i];
    //     Object.keys(obj).forEach(function (key) {
    //        console.log("key : " + key + " :: value : " + obj[key]);
    //     });
    // }
    fn4_grabDestPageBodyElement(d);
}

//2// parse the html
function fn2_parseHTMLtoObject(d) {
    /*
        Note on structure of data:
            skip : html head body
            table -> thead -> tr -> <th> innerHTML gives the titles. (to be used when needed) titles form the keys.
            continue
            skip : tfoot
            tbody -> tr -> <td> innerHTML go into the objects as values to the respective keys.
     */
    //http://stackoverflow.com/questions/10585029/parse-a-html-string-with-js
    var root = document.createElement("html");
    root.innerHTML = d;
    var head = root.getElementsByTagName("thead");
    var titleElements = head[0].getElementsByTagName("th");
    for(var i = 0; i < titleElements.length;i++)
    {
        keys.push(titleElements[i].innerHTML);
    }
    //http://stackoverflow.com/questions/14272051/appending-a-key-value-pair-to-a-json-object
    //http://stackoverflow.com/questions/9398535/add-dynamic-key-value-pairs-to-javascript-array-or-hash-table
    var body = root.getElementsByTagName("tbody");
    var rows = root.getElementsByTagName("tr");
    for(var i = 0 ;i< rows.length;i++)
    {
        var field  = rows[i].getElementsByTagName("td");
        var tmpDOMobj = {};
        for(var j = 0; j < field.length; j++)
        {
          //  console.log("key : " + keys[j] + " :: value : " + field[j].innerHTML)
            tmpDOMobj[keys[j]] = field[j].innerHTML;
        }
       // console.log(tmpDOMobj);
        DOMobjArray.push(tmpDOMobj);
    }
   // console.log(DOMobjArray);
    console.log(" STEP 2 : COMPLETED ")
    fn3_NowThatHTMLisStoredInAnObjectArrayDisplayIt(DOMobjArray);
}

//1// read the html
// ajax call to html and success closure will return html as string.
function fn1_toRunAfterHTMLisParsed(d) {
    console.log(" STEP 1 : COMPLETED ");
   // console.log(d);
    fn2_parseHTMLtoObject(d);
}
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if(xhttp.readyState == 4 && xhttp.status == 200){
       // console.log(xhttp.responseText);
        data = xhttp.responseText;
        fn1_toRunAfterHTMLisParsed(data);
    }
};
xhttp.open("GET",fileName,true);
// ----------------------
xhttp.send();
// ----------------------
