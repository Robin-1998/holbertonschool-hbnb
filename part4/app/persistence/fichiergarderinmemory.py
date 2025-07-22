"""
class InMemoryRepository(Repository):
    def __init__(self):
        self._storage = {}
        # dictionnaire pour stocker des objets avec comme clé leur id

    def add(self, obj):
        self._storage[obj.id] = obj
        # On a joute l'objet à storage en utilisant obj.id comme clé

    def get(self, obj_id):
        return self._storage.get(obj_id)
        # retourner l'objet à partir de son identifiant

    def get_all(self):
        return list(self._storage.values())
        # retourner tous les objets stockés en format de liste

    def update(self, obj_id, data):
        obj = self.get(obj_id)
        if obj:
            obj.update(data)
    # on récupère les objets existants. On appelé la méthode update(data)
    # donc les objets doivent aussi avoir une méthode update
    # la classe user devra donc contenir cette méthode pour que
    # l'utilisateur puisse mettre à jour ses informations

    def delete(self, obj_id):
        if obj_id in self._storage:
            del self._storage[obj_id]
            # supprime l'objet avec l'identifiant donné

    def get_by_attribute(self, attr_name, attr_value):
        return next((obj for obj in self._storage.values() if getattr(obj, attr_name) == attr_value), None)
        # on veux récupérer un utilisateur dont l’email est par ex "alice@gmail.com" sans connaître son identifiant.
        # la méthode va regarder tous les objets stockés et retournerle premier utilisateur dont
        # l'attribut email correspond à "alice@gmail.com"
"""
