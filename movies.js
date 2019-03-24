function initialize () {
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
        document.getElementById("output").innerHTML=""
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          for(i=0;i<json.results.length;i++)
          {
            document.getElementById("output").innerHTML+="<a href='#' onclick=info("+json.results[i].id+")>" + json.results[i].title+"&nbsp&nbsp"+ json.results[i].release_date+"</a><br/><br/>"
          }
       }
   };
   xhr.send(null);
}

function info(id)
{
  var out=""
  var xhr = new XMLHttpRequest();
  var query = encodeURI(document.getElementById("form-input").value);
  xhr.open("GET", "proxy.php?method=/3/movie/" + id);
  xhr.setRequestHeader("Accept","application/json");
  xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
         var json = JSON.parse(this.responseText);
         var str = JSON.stringify(json,undefined,2);
         var image_path= "http://image.tmdb.org/t/p/w185/"+json.poster_path
         out+="<img src ="+image_path+">"
         out+="<h3>Title</h3>"+"<p>"+json.original_title+"</p>"
         out+="<h3>Genres</h3>"
         var gen=""
         for(i=0;i<json.genres.length;i++)
          {
            if (i==(json.genres.length-1))
            {
              gen+=json.genres[i].name
            }
            else
            {
              gen+=json.genres[i].name+", "
            }
          }
          out+="<p>"+gen+"</p>"
          out+="<h3>Summary</h3>"
          out+="<p>"+json.overview+"</p>"
         //document.getElementById("output").innerHTML="<pre>"+str+"</pre>"
          document.getElementById("infor").innerHTML=out
          cast(id)
      }
  };
  xhr.send(null);

  var ou=""
  var xh = new XMLHttpRequest();
  var quer = encodeURI(document.getElementById("form-input").value);
  xh.open("GET", "proxy.php?method=/3/movie/" + id+"/credits");
  xh.setRequestHeader("Accept","application/json");
  xh.onreadystatechange = function () {
  if (this.readyState == 4) {
     var json = JSON.parse(this.responseText);
     var str = JSON.stringify(json,undefined,2);
     ou+="<h3>Top Five Cast</h3>"
     cast=""
     for(i=0;i<5;i++)
      {
        if (i==4)
        {
          cast+=json.cast[i].name
        }
        else
        {
          cast+=json.cast[i].name+", "
        }
      }
     ou+="<p>"+cast+"</p>"
     document.getElementById("infor").innerHTML+=ou
      }
  };
  xh.send(null); 
}