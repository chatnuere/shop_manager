class Shop < ActiveRecord::Base

  validates :chain, :name, :address, :city, :zip, :phone, :country_code, presence: { message: " doit être renseigné" }
  validates :phone, length: {minimum: 10, maximum: 30, :message => :length }
  validates :country_code, length: {is: 2, :message => :length }

  #geocoded_by :addressMethod
  #after_validation :geocode, :if => :address_changed?

  def addressMethod
    [address, city, zip].compact.join(', ')
  end

  def previous_shop
    Shop.where(["id < ?", id]).last
  end

  def next_shop
    Shop.where(["id > ?", id]).first
  end

end
