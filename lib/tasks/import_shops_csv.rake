require 'csv'
namespace :data do
  desc "Import shops from csv file"
  task :import => [:environment] do

    CSV.foreach(Rails.root + "lib/assets/shopmium.csv", :headers => true, :encoding => 'ISO-8859-1:UTF-8') do |row|
      Shop.create(row.to_hash.slice(*%w[ chain name latitude longitude address city zip phone country_code]))
    end

  end
end