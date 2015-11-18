conn = new Mongo();
db = conn.getDB("nevus");
var data = {};
var collections = db.getCollectionNames();
for (var collIndex in collections) {
  if (collections[collIndex] === "system.indexes") {
    continue;
  }
  data[collections[collIndex]] = [];
  var coll = db.getCollection(collections[collIndex]).find().forEach(function(document) {
    delete document._id;
    data[collections[collIndex]].push(document);
  });
}
print('var ata = ');
printjson(data);
print(';');