class CreateBusinessesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :businesses do |t|
      t.string :yelp_id
      t.string :name
      t.string :image_url
    end
  end
end
