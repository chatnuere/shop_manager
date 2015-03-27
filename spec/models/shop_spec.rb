require "rails_helper"

RSpec.describe Shop, :type => :model do

  it "a shop can be saved" do
    shop = Shop.create(chain: "shopmium", name: "Shopmium de test", latitude: 47.9283864, longitude: 1.0447856, address: "120 rue du General de Gaulle", city: "Poissy", zip: 78300, phone: 120068308, country_code: "fr")
    shop.save!

    found = Shop.last
    expect(found.name).to eq("Shopmium de test")
    expect(found.phone).to eq(120068308)
  end


  it "requires a chain , name, address, city, zip, phone, country_code" do
    shop         = Shop.new
    expect(shop.valid?).to eq(false)

    shop.chain   = "shopmium"
    expect(shop.valid?).to eq(false)

    shop.name    = "test name"
    expect(shop.valid?).to eq(false)

    shop.address = "1 avenue du chemin de presles"
    expect(shop.valid?).to eq(false)

    shop.city    = "Saint maurice"
    expect(shop.valid?).to eq(false)

    shop.zip     = 94410
    expect(shop.valid?).to eq(false)

    shop.phone   = 120068308
    expect(shop.valid?).to eq(false)

    shop.country_code   = "fr"
    expect(shop.valid?).to eq(true)
  end

end
