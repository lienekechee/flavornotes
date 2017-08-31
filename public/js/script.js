$(document).ready(function(){
   
    // $('select').material_select();

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
            $('select').material_select();
        	populateCategory() //data sends but is not rendered by materialize
    	};

	};

	request.send();



	$('#search').on('click',function(){
        console.log("hellloooooo")
		var query1 = $('#q').val()
        console.log(query1)
		

    var request = new XMLHttpRequest();

	var uri = `https://api.foodpairing.com/ingredients?q=${query1}` 

    request.open('GET', uri);

    request.setRequestHeader('X-Application-ID', '4d3622c7')
    request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
    request.setRequestHeader('X-API-Version', '1')
    request.setRequestHeader('Accept', 'application/json')

    request.onreadystatechange = function(){
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            // console.log('Body:', this.responseText);
            const ingredientsData = JSON.parse(this.responseText)
            console.log('Body:', ingredientsData)
            
            //function to be called on ingredient-click.  selection prompts the request for pairings.
            // function selectIngredient(ingredient){

            //     //define 'id' as the data attribute set to chosen ingredient
               
            //     var id = ingredient.getAttribute('data-ingredient-id')

            //     var request = new XMLHttpRequest();

            //     request.open('GET', `https://api.foodpairing.com/ingredients/${id}/pairings`);

            //     request.setRequestHeader('X-Application-ID', '4d3622c7')
            //     request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
            //     request.setRequestHeader('X-API-Version', '1')
            //     request.setRequestHeader('Accept', 'application/json')

            //     request.onreadystatechange = function() {
            //         if (this.readyState === 4) {
            //             console.log('Status:', this.status);
            //             console.log('Headers:', this.getAllResponseHeaders());
            //             console.log('Body:', this.responseText);
            //             var pairingsData = JSON.parse(this.responseText)
            //             console.log(pairingsData)

            //             //
            //         }
            //     };

            //     request.send(); 
            // }

            function populateDisplay(){
                // $('#resultsarea').html('</ul>');
                for(i = 0; i < ingredientsData.length; i++) {
                    console.log (ingredientsData[i])
                    $('#resultsarea').append(`<ul><li onclick= "selectIngredient(this)" id= ${ingredientsData[i].id} + data-ingredient-id= + ${ingredientsData[i].id} + > ${ingredientsData[i].name}</li></ul>`)
                    }
                }
                populateDisplay();
                
        }
    };
	request.send();
	})

     ///////GET PAIRINGS
    //when you click on an ingredient two things need to happen: 1) get the id and pass it to 
    //the pairing request.  2) move the ingredient to another div to visually indicate a selection. automagically trigger
    //request for pairings and repopulate results area.

    

});

//clients can at this stage either search or browse through a category to find an ingredient.
//the results should populate the designated div.  each ingredients should be displayed with
//its name, and a color corresponding to the category it belongs to.  The ingredient id doubles
//as the id for the li item.  the ingrediet should also be a link that selects its id and stores 
//it somehwere so that it can be used in the retriving a pairing.  Perhaps clicking on an ingredient should
//also move the badge 
//
//

   


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



