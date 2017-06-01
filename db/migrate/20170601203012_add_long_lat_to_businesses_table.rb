class AddLongLatToBusinessesTable < ActiveRecord::Migration[5.1]
  def change
    add_column :businesses, :latitude, :decimal
    add_column :businesses, :longitude, :decimal
  end
end
