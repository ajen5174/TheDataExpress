
let url = ('http://localhost:3000/api');
fetch(url)
    .then(response => response.json())
    .then(data => {
        //use this script file to display the graph
        //data holds the tallied information from the API.

        console.log(data);
    });
