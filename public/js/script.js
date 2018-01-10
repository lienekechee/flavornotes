$(document).ready(function() {

    //populate category list

    const request = new XMLHttpRequest();

    request.open('GET', 'https://api.foodpairing.com/taxonomies/ingredients/categories');

    request.setRequestHeader('X-Application-ID', '4d3622c7')
    request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
    request.setRequestHeader('X-API-Version', '1')
    request.setRequestHeader('Accept', 'application/json')

    request.onreadystatechange = function(){
        if (this.readyState === 4) {
            const categoryData = JSON.parse(this.responseText)

            //dynamically populating dropdown menu with ingrediet categories.  
            //materialize's select form must be initialized within the for loop to work
            const populateCategory = (function() {
                $("#categories").append('<option value="" disabled selected>Categories</option>')
                for (i = 0; i < categoryData.length; i++) {
                    if (categoryData[i].parent_id == null) {
                        // console.log(categoryData[i])

                        //DROPDOWN MENU initialization must occur after population of values in materialize
                        $("#categorylist").append(`<option value= '${categoryData[i].id }'>${categoryData[i].name}</option>`)
                        $("#categorylist").trigger('contentChanged');
                        $('#categories').on('contentChanged', () => {

                        });
                    }
                }
            })()

        };
    };
    request.send();


//search for an ingredient and assign color to each ingredient

    $("#search").click(()=>{


        var query1 = $('#q').val()
        console.log(query1)
        const request = new XMLHttpRequest();
        var uri = `https://api.foodpairing.com/ingredients?q=${query1}`

        request.open('GET', uri);

        request.setRequestHeader('X-Application-ID', '4d3622c7');
        request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac');
        request.setRequestHeader('X-API-Version', '1');
        request.setRequestHeader('Accept', 'application/json');

        request.onreadystatechange = function(){
            if (this.readyState === 4) {
                // console.log('Status:', this.status);
                // console.log('Headers:', this.getAllResponseHeaders());
                var ingredientsData = JSON.parse(this.responseText)
                // console.log('Body:', this.responseText)

                $('.results').html('');

                for (i = 0; i < ingredientsData.length; i++) {

                        (function(k){
                            $.ajax({
                                method: "POST",
                                url: '/vision',
                                data: { imgUrl: ingredientsData[k]._links.image.size_240 },
                                dataType: 'json',
                                success: function(response) {
                                    console.log(response)

                                    let color1 = `rgb(${response[0].color.red},${response[0].color.green},${response[0].color.blue})`
                                    let color2 = `rgb(${response[1].color.red},${response[1].color.green},${response[1].color.blue})`

                                    $('.results').append(`<div onclick= "selectIngredient(this)" 
                                    id= '${ingredientsData[k].id}' 
                                    data-ingredientname = '${ingredientsData[k].name}' 
                                    data-ingredientcategory = '${ingredientsData[k]._links.categories[0].id}' 
                                    class = 'item ${ingredientsData[k]._links.categories[0].id}'
                                    style ='background-color: ${color1}; color: ${color2}'
                                    data-ingredientstyle = 'background-color: ${color1}; color: ${color2}';
                                    >${ingredientsData[k].name}</div>`)
                                }
                            })
                        })(i)



                }
            }
                           

            
            
        };
        request.send();

    }) //#q.keypress close

    //list ingredients by category
    function listIngredientsByCategory(category) {

        console.log(category.value)

        const selectedCategory = category.value


        var request = new XMLHttpRequest();

        request.open('GET', `https://api.foodpairing.com/ingredients?category[id]=${selectedCategory}`);

        request.setRequestHeader('X-Application-ID', '4d3622c7')
        request.setRequestHeader('X-Application-Key', 'a7d005ed7abf111972bcd797aebf78ac')
        request.setRequestHeader('X-API-Version', '1')
        request.setRequestHeader('Accept', 'application/json')

        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                //- console.log('Body:', this.responseText);
                var ingredientsByCat = JSON.parse(this.responseText)
                console.log(ingredientsByCat)

                for (i = 0; i < ingredientsByCat.length; i++) {
                    ('#resultsarea').append(`<span id= \'${ingredientsByCat[i]._links.ingredient.id}\' + class= \'${ingredientsByCat[i]._links.ingredient._links.categories[0].id}\' + > ${ingredientsByCat[i]._links.ingredient.name}</span>`)

                }
            }
        };
        request.send();
    }

    //select ingredient (save to pairings div) and display paired ingredients (assign opacity)


}); //doc.ready close