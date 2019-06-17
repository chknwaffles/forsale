class TagSerializer < ActiveModel::Serializer
  has_many :items
  attributes :id, :name
end
