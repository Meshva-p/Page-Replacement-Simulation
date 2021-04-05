let res, pro;
let noofframes;
let flagFound = 0,
  flag = 0,
  flag2 = 0;
let count = 0,
  hit = 0,
  miss = 0;
let pagefault=0;
let pages = [];
let frames = [];
let frameAge = [];
let resource = [];
let isLRU;
let grapharray;

function BuildFormFields($amount) // For Resource allocation
{
  res = $amount;
  if (res < 0)
    alert("Invalid Inputs");
  let
    $container = document.getElementById('FormFields'),
    $item, $field, $i;
  $container.innerHTML = '';
  for ($i = 0; $i < $amount; $i++) {
    $item = document.createElement('div');
    $item.style.margin = '10px';
    $item.style.cssFloat = "left";
    $item.style.width = "100px";
    $field = document.createElement('label');
    $field.innerHTML = 'Page ' + ($i + 1);
    $item.appendChild($field);
    $field = document.createElement('input');
    $field.name = 'Design[' + $i + ']';
    $field.type = 'text';
    $field.setAttribute("class", "form-control");
    $item.appendChild($field);
    $container.appendChild($item);
  }
}

function LRU() {
  isLRU = 1;
  MAIN();
  LRU1();
  RESULTS();
}

function OPR() {
  isLRU = 3;
  MAIN();
  OPR1();
  RESULTS();
}

function FIFO() {
  isLRU = 0;
  MAIN();
  FIFO1();
  RESULTS();
}

function RESULTS() {
  let tab_alloc = document.getElementById("tab_need");
  let row = tab_alloc.insertRow(j + 3);
  let cell = row.insertCell(0);
  cell.innerHTML = "Number of Page_Faults: " + miss;
  cell = row.insertCell(0);
  cell.innerHTML = "Number of Page_Hits: " + hit;
  cell = row.insertCell(0);
  cell.innerHTML = "Hit ratio: " + hit + "/" + res;

}

function MAIN() {
  noofframes = document.getElementById('noofFrames').value;
  let res_form = document.resource;
  count = 0, hit = 0, miss = 0;
  for (let i = 1; i <= res; i++) {
    resource[i - 1] = Number(res_form[i].value);
    pages[i - 1] = Number(res_form[i].value); //added
  }
  for (let i = 0; i < noofframes; i++) {
    frames[i] = -1;
    frameAge[i] = -1;
  }
  let form = document.Need;
  let ned = [];
  let i, j;

  let tab_need = document.getElementById("tab_need");
  let row = tab_need.insertRow(0);
  let cell = row.insertCell(0);
  if (isLRU == 0) cell.innerHTML = "<b>FIRST IN FIRST OUT</b>";
  if (isLRU == 1) cell.innerHTML = "<b>LEAST RECENTLY USED</b>";
  if (isLRU == 3) cell.innerHTML = "<b>OPTIMAL PAGE REPLACEMENT</b>";
  let pro_head = tab_need.insertRow(1);
  cell = pro_head.insertCell(0);
  cell.innerHTML = "<b>Pages</b>";
  for (i = 1; i <= noofframes; i++) {
    cell = pro_head.insertCell(i);
    cell.innerHTML = "<b>FRAME " + (i) + "</b>";
  }
  cell = pro_head.insertCell(i);
  cell.innerHTML = "<b>Page Fault</b>";
}

function MAIN2() {
  noofframes = document.getElementById('noofFrames').value;
  let res_form = document.resource;

  count = 0, hit = 0, miss = 0;
  for (let i = 1; i <= res; i++) {
    resource[i - 1] = Number(res_form[i].value);
    pages[i - 1] = Number(res_form[i].value); //added
  }
  //added
  for (let i = 0; i < noofframes; i++) {
    frames[i] = -1;
    frameAge[i] = -1;
  }
}

function LRU1() {
  for (j = 0; j < res; j++) //no of pages
  {
    flagFound = 0, flag = 0, flag2 = 0;
    for (i = 0; i < noofframes; i++) {
      if (frames[i] == pages[j]) {
        flagFound = 1;
        flag = 1;
        count++;
        frameAge[i] = count; //age frame
        hit++;
        pagefault = 1; //	 printf("hit ");
        break;
      }
    }

    if (flagFound == 0) //if frame not found and empty frame avalible
    {
      for (i = 0; i < noofframes; i++) {
        if (frames[i] == -1) {
          frames[i] = pages[j];
          flag = 1;
          count++;
          frameAge[i] = count;
          pagefault = 0; //  printf("miss ");
          miss++;
          break;
        }
      }
    } //FLAG FOUND ends

    if (flag == 0) //if frame not found
    {
      min = frameAge[0];
      let m = 0;
      // for lru
      if (isLRU == 1) {
        for (i = 0; i < noofframes; i++) {
          if (frameAge[i] < min) {
            min = frameAge[i];
            m = i;
          }
        }
      }

      frames[m] = pages[j];
      count++;
      frameAge[m] = count;
      miss++;
      pagefault = 0; //	printf("miss ");
    }
    //printing results

    let row = tab_need.insertRow(j + 2);
    let cell = row.insertCell(0);
    cell.innerHTML = "<b>P" + (j + 1) + "(" + resource[j] + ")" + "</b>";
    for (k = 0; k < noofframes; k++) {
      let cell1 = row.insertCell(k + 1);
      cell1.innerHTML = frames[k];
    }
    cell = row.insertCell(k + 1);
    if (pagefault == 0)
      cell.innerHTML = "YES";
    else
      cell.innerHTML = "NO";
  }
  row = tab_need.insertRow(j + 2);
  cell = row.insertCell(0);
  if (isLRU == 1)
    cell.innerHTML = "LRU RESULTS:";
  if (isLRU == 2)
    cell.innerHTML = "MRU RESULTS:";
}

function LRU2(updatednoofframes) {
  count = 0, hit = 0, miss = 0;
  let flagFound1 = flagFound;
  let frames1 = frames;
  let pages1 = pages;
  let pagefault1 = pagefault;
  let frameAge1 = frameAge;
  let flag1 = flag;
  let flag21 = flag2;
  for (j = 0; j < res; j++) //no of pages
  {
    flagFound1 = 0, flag1 = 0, flag21 = 0;
    for (i = 0; i < updatednoofframes; i++) {
      if (frames1[i] == pages1[j]) {
        flagFound1 = 1;
        flag1 = 1;
        count++;
        frameAge1[i] = count; //age frame
        hit++;
        pagefault1 = 1; //	 printf("hit ");
        break;
      }
    }
    if (flagFound1 == 0) //if frame not found and empty frame avalible
    {
      for (i = 0; i < updatednoofframes; i++) {
        if (frames1[i] == -1) {
          frames1[i] = pages1[j];
          flag1 = 1;
          count++;
          frameAge1[i] = count;
          pagefault1 = 0; //  printf("miss ");
          miss++;
          break;
        }
      }
    } //FLAG FOUND ends

    if (flag1 == 0) //if frame not found
    {
      min1 = frameAge1[0];
      let m = 0;
      // for lru
      if (isLRU == 1) {
        for (i = 0; i < updatednoofframes; i++) {
          if (frameAge1[i] < min1) {
            min1 = frameAge1[i];
            m = i;
          }
        }
      }
      frames1[m] = pages1[j];
      count++;
      frameAge1[m] = count;
      miss++;
      pagefault1 = 0; //	printf("miss ");
    }
  }
  return miss;
}
//////////////////////////////////////////////////////////////////////////FIFO
function FIFO1() {
  let page_f = 0;
  for (j = 0; j < res; j++) //no of pages
  {
    flagFound = 0;
    for (i = 0; i < noofframes; i++) {
      if (frames[i] == pages[j]) {
        flagFound = 1;
        hit++;
        pagefault = 1; //	 printf("hit ");
        page_f--;
      }
    }
    page_f++;
    if ((flagFound == 0) && (page_f <= noofframes)) //if frame not found and empty frame avalible
    {
      frames[j] = pages[j];
      pagefault = 0;
      miss++;
    } //FLAG FOUND ends
    else if (flagFound == 0) //if frame not found
    {
      frames[(page_f - 1) % noofframes] = pages[j];
      miss++;
      pagefault = 0; //	printf("miss ");
    }
    //printing results

    let row = tab_need.insertRow(j + 2);
    let cell = row.insertCell(0);
    cell.innerHTML = "<b>P" + (j + 1) + "(" + resource[j] + ")" + "</b>";
    for (k = 0; k < noofframes; k++) {
      let cell1 = row.insertCell(k + 1);
      cell1.innerHTML = frames[k];
    }
    cell = row.insertCell(k + 1);
    if (pagefault == 0)
      cell.innerHTML = "YES";
    else
      cell.innerHTML = "NO";
  }
  row = tab_need.insertRow(j + 2);
  cell = row.insertCell(0);
  cell.innerHTML = "RESULT:";

}

/////////////////////////////////////////////////////////////////////////////////////OPR
function OPR1() {
  for (j = 0; j < res; j++) //no of pages
  {
    flagFound = 0, flag = 0, flag2 = 0;
    let temp = [];
    let k, max, pos, flag3 = 0;

    for (i = 0; i < noofframes; i++) {
      if (frames[i] == pages[j]) {
        flagFound = 1;
        flag = 1;
        count++;
        frameAge[i] = count; //age frame
        hit++;
        pagefault = 1; //	 printf("hit ");
        break;
      }
    }

    if (flagFound == 0) //if frame not found and empty frame avalible
    {
      for (i = 0; i < noofframes; i++) {
        if (frames[i] == -1) {
          frames[i] = pages[j];
          flag = 1;
          count++;
          frameAge[i] = count;
          pagefault = 0; //  printf("miss ");
          miss++;
          break;
        }
      }
    } //FLAG FOUND ends

    if (flag == 0) //if frame not found
    {
      flag3 = 0;

      for (i = 0; i < noofframes; i++) {
        temp[i] = -1;

        for (k = j + 1; k < res; k++) //checking in future
        {
          if (frames[i] == pages[k]) {
            temp[i] = k;
            break;
          }
        }
      }

      for (i = 0; i < noofframes; i++) //if element not present
      {
        if (temp[i] == -1) {
          pos = i;
          flag3 = 1;
          break;
        }
      }
      if (flag3 == 0) //if all elements prrresent
      {
        max = temp[0];
        pos = 0;

        for (i = 1; i < noofframes; i++) {
          if (temp[i] > max) {
            max = temp[i];
            pos = i;
          }
        }
      }
      frames[pos] = pages[j];
      count++;
      frameAge[pos] = count;
      miss++;
      pagefault = 0; //	printf("miss ");
    }
    //printing results

    let row = tab_need.insertRow(j + 2);
    let cell = row.insertCell(0);
    cell.innerHTML = "<b>P" + (j + 1) + "(" + resource[j] + ")" + "</b>";
    for (k = 0; k < noofframes; k++) {
      let cell1 = row.insertCell(k + 1);
      cell1.innerHTML = frames[k];
    }
    cell = row.insertCell(k + 1);
    if (pagefault == 0)
      cell.innerHTML = "YES";
    else
      cell.innerHTML = "NO";
  }
  row = tab_need.insertRow(j + 2);
  cell = row.insertCell(0);
  cell.innerHTML = "RESULTS: ";

}

/////////////////////////////////////////////////////////////////////////////////////


function Graph() {
  MAIN2();
  grapharray = [];
  grapharray.push(["No. of frames", "First In First Out", "Least Recently Used", "Optimal Page Replacement"]);
  let array1 = [],
    array2 = [],
    array3 = [];
  isLRU = 0;
  for (let i = 1; i <= noofframes; i++) {
    array1.push(FIFO2(i));
  }
  isLRU = 1;
  for (let i = 1; i <= noofframes; i++) {
    array2.push(LRU2(i));
  }
  isLRU = 3;
  for (let i = 1; i <= noofframes; i++) {
    array3.push(OPR2(i));
  }
  // console.log(array1);
  // console.log(array2);
  // console.log(array3);
  for (let i = 1; i <= noofframes; i++) {
    grapharray.push([i, array1[i - 1], array2[i - 1], array3[i - 1]]);
  }
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);
}


function FIFO2(updatednoofframes) {
  count = 0, hit = 0, miss = 0;
  let page_f = 0;
	let flagFound1=flagFound;
	let frames1=frames;
	let pages1=pages;
	let pagefault1=pagefault;

	// console.log(frames1);
	frames1.length = updatednoofframes;
	for(i=0;i<updatednoofframes;++i)
		frames1[i] = -1;
	// console.log(frames1);
	// console.log(pages1);
	// console.log(updatednoofframes);
	// console.log(page_f);
	// console.log(hit);
	// console.log(miss);
	for (j = 0; j < res; j++) //no of pages
  {
    flagFound1 = 0;
    for (i = 0; i < updatednoofframes; i++) {
      if (frames1[i] == pages1[j]) {
        flagFound1 = 1;
        hit++;
        pagefault1 = 1; //	 printf("hit ");
        page_f--;
      }
    }
    page_f++;
    if ((flagFound1 == 0) && (page_f <= updatednoofframes)) //if frame not found and empty frame avalible
    {
      frames1[j] = pages1[j];
      pagefault1 = 0;
      miss++;
    } //FLAG FOUND ends
    else if (flagFound1 == 0) //if frame not found
    {
      frames1[(page_f - 1) % updatednoofframes] = pages1[j];
      miss++;
      pagefault1 = 0;
    }
  }
  return miss;
}


function LRU2(updatednoofframes) {
  count = 0, hit = 0, miss = 0;
  let flagFound1 = flagFound;
  let frames1 = frames;
  let pages1 = pages;
  let pagefault1 = pagefault;
  let frameAge1 = frameAge;
  let flag1 = flag;
  let flag21 = flag2;
  frames1.length = updatednoofframes;
  for(i=0;i<updatednoofframes;++i)
    frames1[i] = -1;
  for (j = 0; j < res; j++) //no of pages
  {
    flagFound1 = 0, flag1 = 0, flag21 = 0;
    for (i = 0; i < updatednoofframes; i++) {
      if (frames1[i] == pages1[j]) {
        flagFound1 = 1;
        flag1 = 1;
        count++;
        frameAge1[i] = count; //age frame
        hit++;
        pagefault1 = 1; //	 printf("hit ");
        break;
      }
    }
    if (flagFound1 == 0) //if frame not found and empty frame avalible
    {
      for (i = 0; i < updatednoofframes; i++) {
        if (frames1[i] == -1) {
          frames1[i] = pages1[j];
          flag1 = 1;
          count++;
          frameAge1[i] = count;
          pagefault1 = 0; //  printf("miss ");
          miss++;
          break;
        }
      }
    } //FLAG FOUND ends

    if (flag1 == 0) //if frame not found
    {
      min1 = frameAge1[0];
      let m = 0;
      // for lru
      if (isLRU == 1) {
        for (i = 0; i < updatednoofframes; i++) {
          if (frameAge1[i] < min1) {
            min1 = frameAge1[i];
            m = i;
          }
        }
      }
      frames1[m] = pages1[j];
      count++;
      frameAge1[m] = count;
      miss++;
      pagefault1 = 0; //	printf("miss ");
    }
  }
  return miss;
}


function OPR2(updatednoofframes) {
  count = 0, hit = 0, miss = 0;

  let flag1 = flag;
  let flag21 = flag2;
  let flagFound1 = flagFound;
  let frames1 = frames;
  let pages1 = pages;
  let pagefault1 = pagefault;
  let frameAge1 = frameAge;

  frames1.length = updatednoofframes;
	for(i=0;i<updatednoofframes;++i)
		frames1[i] = -1;

  for (j = 0; j < res; j++) //no of pages
  {
    flagFound1 = 0, flag1 = 0, flag21 = 0;
    let temp = [];
    let k, max, pos, flag3 = 0;

    for (i = 0; i < updatednoofframes; i++) {
      if (frames1[i] == pages1[j]) {
        flagFound1 = 1;
        flag1 = 1;
        count++;
        frameAge1[i] = count; //age frame
        hit++;
        pagefault1 = 1; //	 printf("hit ");
        break;
      }
    }

    if (flagFound1 == 0) //if frame not found and empty frame avalible
    {
      for (i = 0; i < updatednoofframes; i++) {
        if (frames1[i] == -1) {
          frames1[i] = pages1[j];
          flag1 = 1;
          count++;
          frameAge1[i] = count;
          pagefault1 = 0; //  printf("miss ");
          miss++;
          break;
        }
      }
    } //FLAG FOUND ends

    if (flag1 == 0) //if frame not found
    {
      flag3 = 0;

      for (i = 0; i < updatednoofframes; i++) {
        temp[i] = -1;

        for (k = j + 1; k < res; k++) //checking in future
        {
          if (frames1[i] == pages1[k]) {
            temp[i] = k;
            break;
          }
        }
      }

      for (i = 0; i < updatednoofframes; i++) //if element not present
      {
        if (temp[i] == -1) {
          pos = i;
          flag3 = 1;
          break;
        }
      }
      if (flag3 == 0) //if all elements prrresent
      {
        max = temp[0];
        pos = 0;

        for (i = 1; i < updatednoofframes; i++) {
          if (temp[i] > max) {
            max = temp[i];
            pos = i;
          }
        }
      }
      frames1[pos] = pages1[j];
      count++;
      frameAge1[pos] = count;
      miss++;
      pagefault1 = 0;
    }
  }
  return miss;
}


function drawChart() {
  let data = google.visualization.arrayToDataTable(grapharray);
  let options = {
    title: "Graphical Representation",
    hAxis: {
      title: "No. of frames",
      titletextStyle: {
        color: '#333'
      }
    },
    vAxis: {
      title: "No. of faults",
      minValue: 0
    }
  };
  let chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
