class Shop < ActiveRecord::Base

  validates :chain, :name, :address, :city, :zip, :phone, :country_code, presence: true

end
