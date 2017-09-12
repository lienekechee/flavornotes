$(document).ready(function() {

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
            const categoryData = JSON.parse(this.responseText)
            console.log('Body:', categoryData)

        //dynamically populating dropdown menu with ingrediet categories.  
        //materialize's select form must be initialized within the for loop to work
            function populateCategory() {
                $("#categories").append('<option value="" disabled selected>Categories</option>')
                for (i = 0; i < categoryData.length; i++) {
                    if (categoryData[i].parent_id == null) {
                        console.log(categoryData[i])

                        //DROPDOWN MENU initialization must occur after population of values in materialize
                        $("#categories").append('<option value="' + categoryData[i].id + '">' + categoryData[i].name + '</option>')
                        $("#categories").trigger('contentChanged');
                        $('select').on('contentChanged', function() {
                            $(this).material_select();
                            $()
                        });
                    }
                }
            }
            populateCategory()
        };
    };
    request.send();


    $('#search').on('click', function() {

        var query1 = $('#q').val()
        var request = new XMLHttpRequest();
        var uri = `https://api.foodpairing.com/ingredients?q=${query1}`

        request.open('GET', uri);

        request.setRequestHeader('X-Application-ID', '4d3622c7')
        request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
        request.setRequestHeader('X-API-Version', '1')
        request.setRequestHeader('Accept', 'application/json')

        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                const ingredientsData = JSON.parse(this.responseText)
                console.log('Body:', ingredientsData)

        //populate the search results area with names of ingredients.  
        //each search should first clear the area of any previous searches
                function populateDisplay() {
                    
                    $('#resultsarea').html('');

                    for (i = 0; i < ingredientsData.length; i++) {
                        console.log(ingredientsData[i])

                        //appended span elements each contain an 'onclick' function that passes on its ID(which is the ingredient ID).  
                        //this function is contained in the pug file.  the ingredient id is then used to query the FoodPairing API 
                        //for pairings, which are then populated in the resultsArea.
                        $('#resultsarea').append(`<span onclick= "selectIngredient(this)" id= \'${ingredientsData[i].id}\' + data-ingredientname = \'${ingredientsData[i].name}\' data-ingredientcategory = ${ingredientsData[i]._links.categories[0].id} class= \'${ingredientsData[i]._links.categories[0].id} spanstyle\' + > ${ingredientsData[i].name}</span>`)
                    }
                }

                function assignColors() {

                
                    //this function iterates through all category IDs, find all elements with that class,
                    //then changes the background color to that which corresponds to the category

                    var categoryClasses = ['38', '166', '198', '221', '241', '265', '309', '348', '357', '437', '475', '556', '564', '567', '575', '595', '600']
                    var correspondingColors = ['#41C4F0', '#C7A37A', '#F7DA95', '#A1160B', '#f47fcd', '#FBF3D5', '#A4CEEE', '#E6B844', '#FEB92C', '#60B745', '#F58A8C', '#9f4e18', '#857A61', '#D71A85', '#b04a03', 'A4D444', '#1B3E1D']


                    for (var i = 0; i < categoryClasses.length; i++) {

                        var classID = categoryClasses[i];
                        console.log(classID)

                        var elements = document.getElementsByClassName(classID); //targets all items belonging to a category
                        
                        for (x = 0; x < elements.length; x++) {
                            $(elements[x]).css('background-color', correspondingColors[i]);
                            
                        }
                    }


                }
                populateDisplay();
                assignColors();
            }
        };

        request.send();
    });

    
     
});

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