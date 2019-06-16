class User < ApplicationRecord
    has_many :ratings
    has_many :items
    has_many :comments, through: :items
end
