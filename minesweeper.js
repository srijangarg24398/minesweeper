function makeArray(rows,columns,el){
  var cell=new Array(rows);
  for (var i=0;i<rows;i++){
    cell[i]=new Array(columns);
    for (var j=0;j<columns;j++){
      cell[i][j]=""
      var yo=$(el)[i*columns+j]
      yo.innerText=""
      // console.log($(yo).get(0))
      $(yo).get(0).style.background="url(images/numbers/0.png) no-repeat"
      $(yo).get(0).style.backgroundSize="100% 100%"
      // $(yo).on('click')
      $(yo).on('click')
      // ($('<img src="images/boxes/uncovered.png">'))
      // $(el)[i*rows+j].text("")
    }
  }
  return cell
}
function typeWrite(id){
  $(id).addClass('cursor')
  $(id).css({
    "font-size":"400%",
    "font-family":"Courier New"
  })
  var text = $(id).text();
  let timer=0
  for (var i = 0; i < text.length; i++) {
    timer+=100
    var typing = setTimeout(function(y){
      $(id).append(text.charAt(y));
       },timer,i);
  };
  setTimeout(function(){
    $(id).removeClass('cursor');
    $(id).hide(1000);
    $(id).remove();
    designPage();
  },timer);
}
function designPage(){
  $('body').css({"display":"flex","flex-direction":"column","align-items":"center"})
  $('header').append(document.createElement('div')).css({"display":"flex"})
  $('header > div').text("MINESWEEPER").css({"text-align":"center","color":"#ff9675","width":"60%"}).hide(0).show(1000)
  $('main').append(document.createElement('div')).css({"display":"flex","justify-content":"space-around","width":"60%"})
  // $('main').append(document.createElement('hr'))
  $('main > div').css({
    "width":"100%",
    "display":"flex",
    "justify-content":"space-between",
    // "border":"2px solid black",
    "flex-direction":"column",
    "margin-top":"30px"
  })/*.text("Select the grid size")*//*.append(document.createElement('form').append('<select>',{'name':'grid'}))*/
  designBlank(15,15,40);
}
function getBlanks(el){
  var blanks=[]
  var yo=$(el)
  var length_total=yo.length
  for (var i=0;i<length_total;i++){
    if (yo[i].innerText==""){
      blanks.push(i)
    }
  }
  // console.log("Blanks length : ",blanks.length)
  return blanks
}
function fillMines(rows,columns,el,mines_no){
  // console.log("mines_no : ",mines_no)
  if (mines_no<1){
    return
  }
  var blanks=getBlanks(el)
  let new_position=Math.floor(Math.random()*blanks.length)
  var yo=$(el)
  yo[blanks[new_position]].innerText="*"
  yo[blanks[new_position]].style.background="url(images/boxes/mine.png) no-repeat"
  yo[blanks[new_position]].style.backgroundSize="100% 100%"

  // yo[blanks[new_position]].innerHTML="&#9673;"
  // yo[blanks[new_position]].innerText="◉"
  fillMines(rows,columns,el,mines_no-1)
}
function showAllMines(rows,columns,el,cell){
  var yo=$(el)
  for (let i=0;i<rows;i++){
    for (let j=0;j<columns;j++){
      if (cell[i][j]=="*"){
        // console.log(yo.get(i*columns+j))
        yo.get(i*columns+j).style.background="url(images/boxes/mine.png) no-repeat"
        yo.get(i*columns+j).style.backgroundSize="100% 100%"
        // yo.get(i*columns+j).css({"background":"url(images/boxes/mine.png) no-repeat","backgroundSize":"100% 100%"})
      }
    }
  }
  $('button#reactions').css({"background":"url(images/reactions/lost.png) no-repeat","backgroundSize":"100% 100%"})
  $(el).off('click')
  // $(el).click(function(){return false})
}
function fillNumbers(rows,columns,el){
  var yo=$(el)
  for (var i=0;i<yo.length;i++){
    if (yo[i].innerText==""){
      var count_temp=0
      // if (i==0){  //first cell
      //   count_temp=valright()+valbottomright()+valbottom()
      // }
      // else if (i==columns-1){ //first row last cell
      //   count_temp=valbottom()+valbottomleft()+valleft()
      // }
      // else if (i==(rows-1)*columns){  //last row first column
      //   count_temp=valtop()+valtopright()+valright()
      // }
      // else if (i==(rows*columns)-1){  //last row last column
      //   count_temp=valleft()+valtopleft()+valtop()
      // }
      // else if (i<columns-1 && i>0){ //first row
      //   count_temp=valright()+valbottomright()+valbottom()+valbottomleft()+valleft()
      // }
      // else if (i > (rows-1)*columns && i<(rows*columns)-1){ //last row
      //   count_temp=valleft()+valtopleft()+valtop()+valtopright()+valright()
      // }
      // else if (i%columns==0 && i!=0){ //first column
      //   count_temp=valtop()+valtopright()+valright()+valbottomright()+valbottom()
      // }
      // else if (i%columns==columns-1 && i!=(rows*columns)-1){  //last column
      //   count_temp=valtop()+valbottom()+valbottomleft()+valleft()+valtopleft()
      // }
      // else{
      //   count_temp=valtopleft()+valtop()+valtopright()+valright()+valbottomright()+valbottom()+valbottomleft()+valleft()
      // }
      if (i-columns>=0){  //has top
        if (yo[i-columns].innerText=="*"){
          // console.log(yo[i-columns].innerHTML)
          count_temp++
        }
      }
      if (i-columns>=0 && i%columns >0){  //has top left
        if (yo[i-columns-1].innerText=="*"){
          count_temp++
        }
      }
      if (i-columns>=0 &&  i%columns <(columns-1)){  //has top right
        if (yo[i-columns+1].innerText=="*"){
          count_temp++
        }

      }
      if (i+columns<(rows*columns)){  //has bottom
        if (yo[i+columns].innerText=="*"){
          count_temp++
        }
      }
      if (i+columns<(rows*columns) && i%columns >0){  //has bottom left
        if (yo[i+columns-1].innerText=="*"){
          count_temp++
        }
      }
      if (i+columns<(rows*columns) && i%columns <(columns-1)){  //has bottom right
        if (yo[i+columns+1].innerText=="*"){
          count_temp++
        }
      }
      if (i%columns >0){  //has left
        if (yo[i-1].innerText=="*"){
          count_temp++
        }
      }
      if (i%columns <(columns-1)){ //has right
        if (yo[i+1].innerText=="*"){
          count_temp++
        }

      }
      if (count_temp>0){
        yo[i].innerText=count_temp
        yo[i].style.background="url(images/numbers/"+count_temp+".png) no-repeat"
        yo[i].style.backgroundSize="100% 100%"
      }
    }
  }
}
function fillArray(cell,rows,columns,el){
  var yo=$(el)
  for (let i=0;i<rows;i++){
    for (let j=0;j<columns;j++){
      cell[i][j]=yo[i*columns+j].innerText
    }
  }
  return cell
}
function coverAll(rows,columns,el)
{
  for (var i=0;i<rows;i++){
    // cell[i]=new Array(columns);
    for (var j=0;j<columns;j++){
      // cell[i][j]=""
      var yo=$(el)[i*columns+j]
      $(yo).get(0).style.background="url(images/boxes/uncovered.png) no-repeat"
      $(yo).get(0).style.backgroundSize="100% 100%"
    }
  }
}
function showAdjacentBlanks(rows,columns,el,cell,i,j,dir1,dir2){
  if (cell[i][j]==""){
    yo=$(el)
    yo.get(i*columns+j).style.background="url(images/numbers/0.png) no-repeat"
    yo.get(i*columns+j).style.backgroundSize="100% 100%"
    if (dir1!=2 && j>0 && cell[i][j-1]==""){  //left
      showAdjacentBlanks(rows,columns,el,cell,i,j-1,1,dir2)
    }
    if (dir1!=1 && j<columns-1 && cell[i][j+1]==""){ //right
      showAdjacentBlanks(rows,columns,el,cell,i,j+1,2,dir2)
    }
    if (dir2!=4 && i>0 && cell[i-1][j]==""){ //top
      showAdjacentBlanks(rows,columns,el,cell,i-1,j,dir1,3)
    }
    if (dir2!=3 && i<rows-1 && cell[i+1][j]==""){ //bottom
      showAdjacentBlanks(rows,columns,el,cell,i+1,j,dir1,4)
    }
  }
  
}
function designBlank(rows,columns,mines_no){
  $('main > div').append(document.createElement('div')).css({"display":"flex","justify-content":"center"})
  $('main > div > div')[0].id="game-container"
  $('div#game-container').css({
    "display":"flex",
    "width":columns*29+"px",
    "justify-content":"space-between",
    "flex-direction":"column",
    "margin-top":"30px",
    // "width":(columns*26*1.15)+1,
    // "backgroundColor":"black",
    // "padding":"1px",
    "border":"15px solid #9c9c9c"
  })
  $('div#game-container').append(document.createElement('header'))
  $('div#game-container > header').css({
    "height":"50px",
    "backgroundColor":"#c8c8c8",
    "display":"flex",
    "justify-content":"center",
    "align-items":"center",
    "flex-direction":"row",
  }).append($('<button id="reactions">'))
  $('button#reactions').css({
    "height":"45px",
    "width":"45px",
    "background":"url(images/reactions/released.png) no-repeat",
    "backgroundSize":"100% 100%",
  })

  for (var i=0;i<rows;i++){
    $('div#game-container').append(document.createElement('div'))
  }
  $('div#game-container div').addClass("grid-rows")
  $('.grid-rows').css({
    "display":"flex",
    "flex-direction":"row",
  })
  for (var i=0;i<columns; i++) {
    $('div.grid-rows').append(document.createElement('div'))
  }
  $('.grid-rows:first').css({
    // "margin-top":"20px"
  })
  $('div.grid-rows div').addClass("grid-cell")
  $('.grid-cell').css({
    "height":"25px",
    "width":"25px",
    "display":"flex",
    "justify-content":"center",
    "align-items":"center",
    // "border":"0.5px solid black",
    "border":"2px solid #aeaeae",
    "backgroundColor":"#878686",
    // "margin":"1px",
  })
  yo='div.grid-cell'
  var cell=makeArray(rows,columns,yo)
  fillMines(rows,columns,yo,mines_no)
  fillNumbers(rows,columns,yo)
  // console.log(cell)
  cell=fillArray(cell,rows,columns,yo)
  $('.grid-cell').css({"color":"transparent","font-size":"0"})
  $('.grid-cell').addClass('covered')
  $('.covered').css({"background":"url(images/boxes/uncovered.png) no-repeat","backgroundSize":"100% 100%"})
  // $('.covered').style.backgroundSize="100% 100%"
  // coverAll(rows,columns,'div.covered')
  $('div.grid-cell').mousedown(function(){
    $('button#reactions').css({"background":"url(images/reactions/pressed.png) no-repeat","backgroundSize":"100% 100%"})
  })
  $('div.grid-cell').click(function(event){
    hi=$(this)
    $('button#reactions').css({"background":"url(images/reactions/released.png) no-repeat","backgroundSize":"100% 100%"})
    var irow=$('div.grid-rows')
    hit_row=$(this).parent().index('.grid-rows')
    hit_column=$(this).index()
    console.log($(this).parent().index())
    count_temp=$(this).text()
    var img_text=""
    if (count_temp==""){
      showAdjacentBlanks(rows,columns,yo,cell,hit_row,hit_column)
      img_text="numbers/0"
    }
    else if (count_temp > 0){
      img_text="numbers/"+count_temp
      // $(this).css({})
    }else if (count_temp=="*"){
      showAllMines(rows,columns,yo,cell)
      img_text="boxes/redmine"
    }
     $(this).css({"background":"url(images/"+img_text+".png) no-repeat","backgroundSize":"100% 100%"})
     // $(this).off('click')
     $(this).click(function(argument) {
        argument.preventDefault()
     })
     // $(this).on('click')
  })
  $('button#reactions').mousedown(function(event){
    // event.preventDefault()
    $(this).css({"background":"url(images/reactions/start.png) no-repeat","backgroundSize":"100% 100%"})
  })
  $('button#reactions').mouseup(function(event){
    // event.preventDefault()
    $(this).css({"background":"url(images/reactions/released.png) no-repeat","backgroundSize":"100% 100%"})
    makeArray(rows,columns,yo)
    fillMines(rows,columns,yo,mines_no)
    fillNumbers(rows,columns,yo)
    // console.log(cell)
    cell=fillArray(cell,rows,columns,yo)
    $('.grid-cell').addClass('covered')
    $('.covered').css({"background":"url(images/boxes/uncovered.png) no-repeat","backgroundSize":"100% 100%"})
    // $('div.grid-cell').each(function(){
    //   $(this).on('click')
    // })

  })
}
$(document).ready(function(){
  // typeWrite('#test');
  designPage();
});