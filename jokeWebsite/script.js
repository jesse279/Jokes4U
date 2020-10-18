document.getElementById("JokeSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("jokeResults").innerHTML = "<p>Hold on one moment while I try and think of one</p>";

  const programming_checkbox = document.getElementById("cat-programming");
  const miscellaneous_checkbox = document.getElementById("cat-Miscellaneous");
  const dark_checkbox = document.getElementById("cat-Dark");
  const pun_checkbox = document.getElementById("cat-Pun");

  const programming = programming_checkbox.checked
  const miscellaneous = miscellaneous_checkbox.checked
  const dark = dark_checkbox.checked
  const pun = pun_checkbox.checked



  var url = "https://sv443.net/jokeapi/v2/joke/";




  if (programming && miscellaneous && dark && pun) {
      console.log("all");
      url += "Any"

  }
  else if (!programming && !miscellaneous && !dark && !pun) {
    console.log("none");
    var joke = "<h2>Select the type of Joke you would loke to hear</h2>";
    joke += "<h3>Or I'll kill you</h3><h4>haha, jk</h4><h5>...or am I?</h5>";
    joke += "<h6>Please just select a joke</h6>";
    document.getElementById("jokeResults").innerHTML = joke;
    return null;
  }
  else {
    console.log("some");
    count = 0
    if (programming) {
      url += "Programming";
      count += 1;
    }
    if (miscellaneous) {
      if (count > 0) {
        url += ","
      }
      url += "Miscellaneous";
      count += 1;
    }
    if (dark) {
      if (count > 0) {
        url += ","
      }
      url += "Dark";
      count += 1;
    }
    if (pun) {
      if (count > 0) {
        url += ","
      }
      url += "Pun";
      count += 1;
    }
  }

  url += "?blacklistFlags=nsfw"


  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      console.log(json);
      let results = "";
      if (json.category === "Programming") {
        results += '<h2>Okay, here is a Programming Joke</h2>';
      }
      else if (json.category === "Dark") {
        results += '<h2>The darker the better, right?</h2>';
      }
      else if (json.category === "Pun") {
        results += '<h2>Monday Pun-day!</h2>';
      }
      else {
        results += "<h2>Here's a random one</h2>";
      }

      if (json.type === "twopart") {
        results += "<div class = joke>"
        results += "<p>" + json.setup + "</p>"
        results += "<p></p>"
        results += "<p>" + json.delivery + "</p></div>"
      }
      else {
        results += "<div class = joke>"
        results += "<p>" + json.joke + "</p></div>"

      }



      console.log(results);
      document.getElementById("jokeResults").innerHTML = results;
    });
});
