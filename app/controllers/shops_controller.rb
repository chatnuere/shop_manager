class ShopsController < ApplicationController
  def index
    if params[:search].present? && params[:number].present?
      case params[:searchType]
        when 'range'
          @shops = Shop.near(params[:search], params[:number], :units => :km, :order => 'distance')
        else
          @shops = Shop.near(params[:search], 20037.5, :units => :km, :order => 'distance').limit(params[:number].to_i)
      end
      @show_distance = true
    else
      @shops = Shop.paginate(:page => params[:page]).order('city ASC')
    end

    gon.shops = []
    for shop in @shops do
      gon.shops  <<  {id: shop.id, chain: shop.chain, phone: shop.phone, address: shop.address ,lat: shop.latitude, lng: shop.longitude, name: shop.name, infowindow: create_info_bubble(shop) ,  picture: {url: "https://cldup.com/4CrHdVk17l-2000x2000.png", width:  34, height: 34, anchor: [17,17]}}
    end


  end

  def show
    @shop = Shop.find(params[:id])
    gon.shop  =  {lat: @shop.latitude, lng: @shop.longitude}


  end

  def new
    @shop = Shop.new(shop_params)
  end

  def create
    @shop = Shop.new(chain: params[:shop][:chain], name: params[:shop][:name], latitude: params[:shop][:latitude], longitude: params[:shop][:longitude], address: params[:shop][:address], city: params[:shop][:city], zip: params[:shop][:zip], phone: params[:shop][:phone], country_code: params[:shop][:country_code])
    if @shop.save
      flash[:success] = "Shop registered"
      redirect_to @shop
    else
      redirect_to root_url
    end
  end

  def update
    @shop = Shop.find(params[:id])
    if @shop.update_attributes(chain: params[:shop][:chain], name: params[:shop][:name], latitude: params[:shop][:latitude], longitude: params[:shop][:longitude], address: params[:shop][:address], city: params[:shop][:city], zip: params[:shop][:zip], phone: params[:shop][:phone], country_code: params[:shop][:country_code])
      flash[:success] = "Update ok"
      redirect_to @shop
    else
      render 'edit'
    end
  end

  def edit
    @shop = Shop.find(params[:id])
    gon.shop  =  {lat: @shop.latitude, lng: @shop.longitude}
  end

  def destroy
    @shop = Shop.find(params[:id])
    if @shop.present?
      @shop.destroy
      flash[:success] = "RITL deleted"
    end
    redirect_to root_url
  end

  private
  def shop_params
    params.permit(:chain, :name, :latitude, :longitude, :address, :city, :zip, :phone, :country_code)
  end

  def create_info_bubble(shop)
    buble = '<i class="icon-chain"></i><div><p>'+shop.chain.to_s + '</p><p>'+shop.name.to_s + '</p><a class="toShop" href="/shops/'+ shop.id.to_s+'">voir la fiche</a></div>'
  end
end
