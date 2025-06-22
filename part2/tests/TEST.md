# Tests Unitaires de l'API HBnB

Pour garantir le bon fonctionnement de l’API HBnB, nous avons mis en place des tests unitaires complets en combinant deux approches complémentaires :

- **Tests fonctionnels automatisés avec Postman**  
  Nous avons utilisé Postman pour tester nos API en lui fournissant différentes données d’entrée.
  Ces tests automatisés permettent de vérifier les réponses des endpoints, les codes HTTP retournés, ainsi que la gestion des erreurs dans divers cas d’usage.
  Ils permettent de valider le comportement global de l’API en conditions réelles.

- **Tests unitaires en Python avec unittest**  
  Ces tests ciblent la logique interne du backend, en vérifiant le fonctionnement des fonctions, la validation des données et la gestion des exceptions.
  Ils garantissent la robustesse du code et facilitent la détection rapide des régressions.

Cette double approche assure à la fois la conformité fonctionnelle pour les utilisateurs et la qualité du code pour les développeurs.

📄 [Documentation test (PDF)](../../TEST_Units_Places_and_Reviews.pdf)
