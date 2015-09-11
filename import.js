conn = new Mongo();
db = conn.getDB("nevus");
for (var collIndex in data) {
  var coll = db.getCollection(collIndex);
  var collGroup = data[collIndex];
  print(coll);
  for (var docIndex in collGroup) {
	var docGroup = collGroup[docIndex];
	docGroup.order = docIndex;
    coll.insert(docGroup);
  }
}
