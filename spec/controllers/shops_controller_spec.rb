require 'rails_helper'

RSpec.describe ShopsController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "returns http success" do
      shop = Shop.create(chain: "shopmium", name: "Shopmium de test", latitude: 47.9283864, longitude: 1.0447856, address: "120 rue du General de Gaulle", city: "Poissy", zip: 78300, phone: 120068308, country_code: "fr")
      shop.save!
      get "show", id: shop.id
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #new" do
    it "returns http success" do
      match 'shops/new' => 'shops#gnew'
      get :new
      expect(response).to have_http_status(:success)
    end

  end


  describe "GET #edit" do
    it "returns http success" do
      shop = Shop.create(chain: "shopmium", name: "Shopmium de test", latitude: 47.9283864, longitude: 1.0447856, address: "120 rue du General de Gaulle", city: "Poissy", zip: 78300, phone: 120068308, country_code: "fr")
      shop.save!
      get "edit", id: shop.id

      expect(response).to have_http_status(:success)
    end
  end


end
