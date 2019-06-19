class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.text :description
      t.string :location
      t.integer :price
      t.string :images, array: true, default: []
      t.integer :user_id
      t.timestamps
    end
  end
end
