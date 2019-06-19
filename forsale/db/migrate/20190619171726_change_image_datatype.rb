class ChangeImageDatatype < ActiveRecord::Migration[5.2]
  def change
    change_column :items, :images, :string
  end
end
