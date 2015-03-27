class ShopsController < ApplicationController
  def index
    @shops = Shop.paginate(:page => params[:page]).order('city ASC')
  end

  def show
  end

  def new
  end

  def create
  end

  def update
  end

  def edit
  end

  def destroy
  end
end
