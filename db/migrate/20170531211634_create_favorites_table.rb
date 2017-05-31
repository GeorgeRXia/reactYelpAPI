class CreateFavoritesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :favorites do |i|
      i.integer :user_id
      i.integer :business_id
    end
  end
end
