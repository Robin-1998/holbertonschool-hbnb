#!/usr/bin/env python3

from app.models.BaseModel import BaseModel


class Amenity(BaseModel):
    """ amenity class that contains simple data about a comment on equipment and how it will be validated """
    def __init__(self, name):
        super().__init__()
        self.name = self.validate_amenity_name(name)

    def validate_amenity_name(self, name):
        """ Validate the name of the amenity """
        if not isinstance(name, str):
            raise ValueError(
                "Amenity name must be a string")
        if name.strip() == "":
            raise ValueError("Amenity name is required")
        if len(name) > 50:
            raise ValueError(
                "Amenity name must not exceed 50 characters")
        return name

    def update(self, data):
        """ update a amenity """
        # Vérifie la présence de la clé 'name' dans data
        if 'name' in data:
            # Vérifie que la valeur associée à 'name' est une chaîne non vide après suppression des espaces
            if not isinstance(data['name'], str) or not data['name'].strip():
                # Si la validation échoue, lève une exception pour indiquer que le nom est invalide
                raise ValueError("Invalid amenity name")
            # Si la validation est ok, met à jour l'attribut 'name' sans espaces en début/fin grâce à strip
            self.name = data['name'].strip()


    def to_dict(self):
        """Convert the amenity object into a dictionary format"""
        return {'id': self.id, 'name': self.name}
