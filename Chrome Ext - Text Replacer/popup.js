
$(document).ready(function() {
  var rowCounter = 1
  var replaceList = {};
  if(Object.keys(replaceList) != 0) {
    replace();
  }
  function newRow(origText, newText) {
    origText = origText.split(';')
    for(var i = 0; i < origText.length; i++) {
      if(replaceList[origText[i]] == undefined) {
        $("#t-body").append('<tr id=' + rowCounter + '><td>' + rowCounter + '</td><td>' + origText[i] + '</td><td>' + newText + '</td></tr>')

        $("#editSelecter").append('<option id = "' + rowCounter + '" value="' + rowCounter + '">'+ rowCounter + ' - "' + origText[i] + '" with "' + newText + '"</option>')

        replaceList[origText[i]] = newText;

        rowCounter++;
      } else {
        alert("You're already replacing that text. idiot.")
      }
    }
    console.log(replaceList)
  }

  function deleteRow(id){
    $("#" + id).remove();
    var tr = document.getElementById(id),
        td = tr.getElementsByTagName('td'),
        key = td[1].innerHTML;

    delete replaceList[key];
    $("#" + id).remove();
  }

  $("#addReplace").on("click", function() {
    var textToReplace = $("#textToReplace").val(),
        textReplaceWith = $("#textReplaceWith").val();

    newRow(textToReplace, textReplaceWith);
  });

  $("#updateBtn").on("click", function() {
    replace();
  });

  $("#deleteBtn").on("click", function() {
    var index = document.getElementById("editSelecter").selectedIndex;
    var opts = document.getElementById("editSelecter").options;

    deleteRow(opts[index].value);
    replace();
  });
  function replace() {
    var elements = document.getElementsByTagName('*'),
        keys = Object.keys(replaceList);
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];
        if (node.nodeType === 3) {
          var text = node.nodeValue;
          for (k = 0; k < keys.length; k++) {
            var re = new RegExp(keys[k], 'gi');
            var replacedText = text.replace(re, replaceList[keys[k]]);
          }
          if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
          }
        }
      }
    }
  }
})


