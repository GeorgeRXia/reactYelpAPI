class CreateBusinessesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :businesses do |t|
      t.string :yelp_id
      t.string :name
      t.integer :user_id
    end
  end
end
