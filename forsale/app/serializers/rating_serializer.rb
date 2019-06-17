class RatingSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :stars
end
