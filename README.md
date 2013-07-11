# Rails version 4 - Simple Ajax with Javascript

Clone this project to test Ajax in Rails 4. This method should also work for Rails 3, minus the use of strong parameters.

Follow the regular rails project creation process.

**Step#1**

Disable CoffeeScript (for regular javascript users) before creating your controller in Rails Gemfile by commenting it out as follows:

		#Use CoffeeScript for .js.coffee assets and views
		#gem 'coffee-rails', '~> 4.0.0'


**Step#2**

Create your controllers

The app/assets/javascripts will now generate [ControllerName].js files instead of [ControllerName].js.coffee


**Step#3**

Add the following to the [ControllerName].js file:

		var ready = function() {
			// your javascript code here
		};
		$(document).ready(ready);
		$(document).on('page:load', ready); // this will allows link_to helpers to work correctly


**Step#4**

Proceed to create your forms (refer to example in the **app/views/products/new.html.erb** of this project for both regular html and simple_form).

  **Regular HTML form**
		<form id="new_product" action="/products" method="post">
			<input name="authenticity_token" value="<%= form_authenticity_token %>" type="hidden">
			<label for="product[name]">Name</label>
			<input type="text" name="product[name]">
			<label for="product[description]">Description</label>
			<textarea type="text" name="product[description]" ></textarea>
			<label for="product[price]">Price</label>
			<input type="text" name="product[price]">
			<input type="submit" value="generate product">
		</form>

  **Simple Form**
		<%= simple_form_for Product.new, html: {:id => "new_product_simple_form"} do |f| %>
			<%= f.input :name %>
			<%= f.input :description %>
			<%= f.input :price %>
			<%= f.submit :button, :value=>"generate product" %>
		<% end %>


**Step#5**

Add the ajax to listen for form submission (refer to example in the **app/assets/javascripts/products.js** file in this project)

  **Regular HTML form javascript**
		// regular html form example
		$('#new_product').submit(function() {
			console.log("form submit hit"); // for debug
			$.post(
				$(this).attr('action'),
				$(this).serialize(),
				function(data) {
					console.log(data); // output response from backend; for debug
					$('#product_result').html(data.msg) // update product_result html contents
				},
				"json"
			)
			return false;
		});


  **Simple Form javascript**
		// simple_form example
		$('#new_product_simple_form').submit(function() {
			console.log("form submit hit"); // for debug
			$.post(
				$(this).attr('action'),
				$(this).serialize(),
				function(data) {
					console.log(data); // output response from backend; for debug
					$('#product_result').html(data.msg) // update product_result html contents
				},
				"json"
			)
			return false;
		});


Note: Both regular html form and simple form use the same ajax method, two different IDs were used to illustrate the different forms in view.


**Step#6**

Create controller backend to respond to ajax submission and to issue response. For this part refer to **app/controllers/products_controller.rb** in this project.

    product = Product.new(product_params)
    respond_to do |format|
      if product.save
        format.json {
          render :json => {:error => "none", :msg => "<p>Product Successfully Added!</p>"}
        }
      else
        format.json {
          render :json => {:error => "yes", :msg => "<p>Invalid Product!</p>"}
        }
      end
    end
		

Your ajax should now work.
Enjoy!


