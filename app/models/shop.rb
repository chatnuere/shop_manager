class Shop < ActiveRecord::Base

  validates :chain, :name, :address, :city, :zip, :phone, :country_code, presence: true

  geocoded_by :addressMethod
  after_validation :geocode, :if => :address_changed?

  def addressMethod
    [address, city, zip].compact.join(', ')
  end

end
