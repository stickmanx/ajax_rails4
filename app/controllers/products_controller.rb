class ProductsController < ApplicationController
  def index
    @products = Product.all
  end
  
  def new
  end

  def create
    # respond_to is a Rails helper method, it references the response that is sent to the view
    
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
  end

  def show
    @product = Product.find(params[:id])
  end
  
  private
    def product_params
      params.require(:product).permit(:name, :description, :price)
    end
end
