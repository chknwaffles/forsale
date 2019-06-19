class RemoveDefaultFromImages < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:items, :images, nil)
  end
end
