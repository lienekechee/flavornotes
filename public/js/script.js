$(document).ready(function() {
   
    $('select').material_select();

//Populating Categories dropdown menu.
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.foodpairing.com/taxonomies/ingredients/categories');

    request.setRequestHeader('X-Application-ID', '4d3622c7')
    request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
    request.setRequestHeader('X-API-Version', '1')
    request.setRequestHeader('Accept', 'application/json')

    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            // console.log('Body:', this.responseText);
            const categoryData = JSON.parse(this.responseText)
            console.log('Body:', categoryData)

            function populateCategory() {
            	for (i = 0; i < categoryData.length; i++) {
                	if (categoryData[i].parent_id == null) {
                        console.log(categoryData[i])
                        $("#categories").append('<option value="' + categoryData[i].id + '">' + categoryData[i].name + '</option>')
                    }
            	}
            	
        	} 
        	populateCategory()
    	};

	};

	request.send();

	$('#flavor-tool-search').click(function(){
		var query = $('#ingredientQuery').val()
		console.log(query)
		
		var request = new XMLHttpRequest();

    request.open('GET', 'https://api.foodpairing.com/ingredients');

    request.setRequestHeader('X-Application-ID', '4d3622c7')
    request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
    request.setRequestHeader('X-API-Version', '1')
    request.setRequestHeader('Accept', 'application/json')

    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            // const ingredientsData = JSON.parse(this.responseText)
            // console.log('Body:', ingredientsData)
        }
    };
	request.send();
	})

});


    // ///////GET PAIRINGS
    // var request = new XMLHttpRequest();

    // request.open('GET', 'https://api.foodpairing.com/ingredients/id/pairings');
    // //id must be passes on from search or browsing selection

    // request.setRequestHeader('X-Application-ID', '4d3622c7')
    // request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
    // request.setRequestHeader('X-API-Version', '1')
    // request.setRequestHeader('Accept', 'application/json')


    // request.onreadystatechange = function() {
    //     if (this.readyState === 4) {
    //         console.log('Status:', this.status);
    //         console.log('Headers:', this.getAllResponseHeaders());
    //         console.log('Body:', this.responseText);
    //         var pairingsData = JSON.parse(this.responseText)
    //         console.log(pairingsData)
    //     }
    // };

    // request.send();


    // ////////GET MULTIPLE INGREDIENT PAIRINGS
    // var request = new XMLHttpRequest();

    // request.open('GET', 'https://api.foodpairing.com/ingredients/ids/pairings');

    // request.setRequestHeader('X-Application-ID', '4d3622c7')
    // request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
    // request.setRequestHeader('X-API-Version', '1')
    // request.setRequestHeader('Accept', 'application/json')
    // //WHERE IDS == MULTIPLE INGREDIENT IDS
    // request.onreadystatechange = function() {
    //     if (this.readyState === 4) {
    //         console.log('Status:', this.status);
    //         console.log('Headers:', this.getAllResponseHeaders());
    //         console.log('Body:', this.responseText);
    //     }
    // };

    // request.send();



