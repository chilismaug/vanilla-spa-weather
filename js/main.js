document.onreadystatechange = function () {
	

	// Fetch method
	function fetchData() {
		// Get cityname from input box
		var cityname = document.querySelector('#cityname').value;
		
		// Ajax call
        const API_KEY = '40d0c5223044f01a0f0142846dc203d3'
        const API_URL = ('http://api.openweathermap.org/data/2.5/weather?&mode=json&units=metric')
        //   in python we ask it       data = requests.get(API_URL.format(city, API_KEY)).json()
      //  q={} city
      //  &appid={} api key

		var request = new XMLHttpRequest();
		request.open('GET',  API_URL +'&q=' +cityname+ '&appid='+ API_KEY ) ;
		request.onreadystatechange = function () {
			if (request.readyState == 4 ) {
				if (request.status === 200) {
					var data = JSON.parse(request.responseText);
                    var templatedCard =`
                    <div class="row"> 
                        <div class="col-9">                    
                            <div class="data-badge">City ${ data.name }</div> 
                            <div class="data-badge">Country ${ data["sys"]["country"]}</div>
                            <div class="data-badge">Tm Zone ${ data.timezone }</div>
                            <div class="data-badge">Long / Lat ${ data["coord"]["lon"]} / ${ data["coord"]["lat"]}</div>
                            <p><hr>
                            <div class="data-badge">Temp ${ data["main"]["temp"] } °C</div> 
                            <div class="data-badge">Hum ${ data["main"]["humidity"] } %</div> 
                            <p>
                            <img class="img-fluid" src="http://openweathermap.org/img/wn/${ data['weather'][0]['icon']}@4x.png" /> 

                            <div class="data-badge"> ${ data["weather"][0]["main"] }</div>   
                            <div class="data-badge">Clouds ${ data["clouds"]["all"]}</div>
                            <div class="data-badge">Vis ${ data.visibility }</div>
                                                  
                            <div>            
                             <button class="btn btn-blue" id="searchAgain">Search Again</button>
                            </div>
                        </div>
                    </div>`;
					if (data.message !== 'Not Found') {
						searchForm.style.display = "none"
						result.innerHTML = templatedCard;
					}
					
					var searchAgain = document.querySelector('#searchAgain');
			
					searchAgain.addEventListener('click', function () {
						searchForm.style.display = "block"

						result.innerHTML = ''
						document.querySelector('#cityname').value = ''
					});
				}  else {
					alert(`No city "${cityname}" found!`)
				}
			}
		}
		request.send();
	}
	
	/* wait for the contents to load */
	if (document.readyState === 'complete') {
		var result = document.querySelector('#result');
		var searchForm = document.querySelector('#search-form');
		
		searchForm.addEventListener('submit', function (e) {
			e.preventDefault()
			fetchData()
		});
	}
}